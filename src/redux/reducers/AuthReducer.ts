import {
  AuthActionTypes,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
} from "../types/AuthenticationTypes";

interface AuthState {
  token: string | null;
  error: string | null;
}

const initialState: AuthState = {
  token: null,
  error: null,
};

export const authReducer = (
  state = initialState,
  action: AuthActionTypes
): AuthState => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, token: action.payload, error: null };
    case LOGIN_FAIL:
      return { ...state, token: null, error: action.payload };
    default:
      return state;
  }
};
