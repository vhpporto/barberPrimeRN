import {USER_LOGGED_IN} from './types';

export const login = (user) => ({
  type: USER_LOGGED_IN,
  payload: user,
});
