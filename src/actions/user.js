import {USER_LOGGED_IN} from './types';

export const loginRedux = (user) => ({
  type: USER_LOGGED_IN,
  payload: user,
});
