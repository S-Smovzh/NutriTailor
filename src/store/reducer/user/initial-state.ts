import { UserState } from './type';
import { DietPlan, SupportedLanguages } from '../../../enums';

const initialState: UserState = {
  _id: '',
  email: '',
  firstName: '',
  lastName: '',
  age: 0,
  height: 0,
  weight: 0,
  dietPlan: DietPlan.HEALTH_MAINTENANCE,
  preferredLanguage: SupportedLanguages.EN,
  token: '',
  refreshToken: '',
};

export { initialState };
