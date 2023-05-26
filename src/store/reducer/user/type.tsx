import { SupportedLanguages, DietPlan } from '../../../enums';

type UserState = {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  age: number;
  height: number;
  weight: number;
  dietPlan: DietPlan;
  preferredLanguage: SupportedLanguages;
  token: string;
  refreshToken: string;
};

export type { UserState };
