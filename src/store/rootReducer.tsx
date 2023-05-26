import { combineReducers } from 'redux';
import { reducer as ToastrReducer } from 'react-redux-toastr';
import { UserReducer } from './reducer';

export const rootReducer = combineReducers({
  user: UserReducer,
  // recipe: RecipeReducer,
  toastr: ToastrReducer,
});
