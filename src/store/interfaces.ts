import { ToastrState } from 'react-redux-toastr';
import { UserState } from './reducer/user/type';

interface AppState {
  user: UserState;
  toastr: ToastrState;
}

export type { AppState };
