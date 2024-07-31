export interface Authentication {
  username: string;
  password: string;
}

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAILURE";
export const CHECK_AUTH_STATUS = "CHECK_AUTH_STATUS";

interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  payload: string;
}

interface LoginFailureAction {
  type: typeof LOGIN_FAIL;
  payload: string;
}

interface CheckAuthStatusAction {
  type: typeof CHECK_AUTH_STATUS;
}

export type AuthActionTypes =
  | LoginSuccessAction
  | LoginFailureAction
  | CheckAuthStatusAction;
