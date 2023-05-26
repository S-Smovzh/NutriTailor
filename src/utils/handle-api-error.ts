import { toastr } from 'react-redux-toastr';
import { ApiErrorResponse } from '../types';

const handleApiError = (apiData: ApiErrorResponse) => {
  if (Array.isArray(apiData.message)) {
    apiData.message.forEach((error: string) => {
      toastr.error('Error', error);
    });
  } else {
    return toastr.error('Error', apiData.message);
  }
};

export { handleApiError };
