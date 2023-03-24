import {USER_INFO, USER_LOGOUT} from './Action-types/User-actions';

export function userLogin(values) {
  return {
    type: USER_INFO,
    payload: values,
  };
}

export function userLogout() {
  return {
    type: USER_LOGOUT,
  };
}
