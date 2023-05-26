import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'universal-cookie';
import { initialState } from './initial-state';
import { UserState } from './type';

export const callTypesAccount = {
  list: 'list',
  action: 'action',
};
const cookies = new Cookies();
export const UserSlice = createSlice({
  name: 'User Object',
  initialState,
  reducers: {
    reloadUser: (state: UserState, action: PayloadAction<UserState>) => {
      return action.payload;
    },
    loginReducer: (state: UserState, action: PayloadAction<UserState>) => {
      cookies.set('user', window.btoa(JSON.stringify(action.payload)));
      return action.payload;
    },
    setDietPlan: (state: UserState, action: PayloadAction<Pick<UserState, 'dietPlan'>>) => {
      const { dietPlan } = action.payload;
      cookies.set('user', window.btoa(JSON.stringify({ ...state, ...action.payload })));
      state.dietPlan = dietPlan;
      return state;
    },
    updateTokens: (state: UserState, action: PayloadAction<Pick<UserState, 'token' | 'refreshToken'>>) => {
      const { token, refreshToken } = action.payload;
      state.token = token;
      state.refreshToken = refreshToken;
      return state;
    },
    logoutReducer: () => {
      cookies.remove('user');
      return initialState;
    },
  },
});
