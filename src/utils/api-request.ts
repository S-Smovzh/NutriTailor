import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import i18next from 'i18next';
import { SupportedLanguages } from '../enums';
import { store, UserSlice } from '../store';
import { handleError } from './handle-error';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL ?? 'http://localhost:5000';
const SERVER_NOT_RESPONDING_MSG = 'The server took too long to respond.';
const TIMEOUT = 6000;
const EMAIL_TRIGGER_TIMEOUT = 20000;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

apiClient.interceptors.response.use(
  (response) => {
    // Extract the tokens from the response headers
    const accessToken = response.headers['access-token'];
    const refreshToken = response.headers['refresh-token'];

    // If both tokens are present, update the Axios instance headers
    if (accessToken && refreshToken) {
      apiClient.defaults.headers.common['access-token'] = `Bearer ${accessToken}`;
      apiClient.defaults.headers.common['refresh-token'] = `Bearer ${refreshToken}`;
      store.dispatch(UserSlice.actions.updateTokens({ token: accessToken, refreshToken }));
    }

    return response;
  },
  (error: AxiosError) => {
    handleError('AXIOS_INTERCEPTOR', error.message);

    if (error.code === 'ERR_NETWORK') {
      return {
        data: { message: SERVER_NOT_RESPONDING_MSG },
        status: error.status,
      };
    }

    return {
      data: error.response?.data,
      status: error.status,
    };
  }
);

// email triggering requests take more time because of the template compilation
const apiRequest = async (path: string, requestInit?: AxiosRequestConfig, willTriggerEmail?: boolean): Promise<AxiosResponse> => {
  const reduxState = store.getState();
  const { token, refreshToken } = reduxState.user;

  const _requestInit: AxiosRequestConfig = requestInit ?? {};
  const _headers = _requestInit.headers ?? {};
  const _method = _requestInit.method ?? 'GET';
  const url = new URL(path, API_BASE_URL).toString();

  const languageHeader = i18next.language ?? SupportedLanguages.EN;

  if (token && refreshToken) {
    _headers['access-token'] = `Bearer ${token}`;
    _headers['refresh-token'] = `Bearer ${refreshToken}`;
  }

  return await apiClient.request({
    timeout: willTriggerEmail ? EMAIL_TRIGGER_TIMEOUT : TIMEOUT,
    timeoutErrorMessage: SERVER_NOT_RESPONDING_MSG,
    ..._requestInit,
    method: _method,
    url,
    headers: {
      'Content-Type': 'application/json',
      lang: languageHeader,
      ..._headers,
    },
    withCredentials: true,
  });
};

export { apiRequest, API_BASE_URL };
