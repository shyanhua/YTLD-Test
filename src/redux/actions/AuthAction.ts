import { ThunkAction } from "redux-thunk";
import { Action } from "redux";
import { authenticateBiometric } from "../../utils/Biometrics";
import { RootState } from "../Store";
import api from "../../services/Api";
import { LOGIN_FAIL, LOGIN_SUCCESS } from "../types/AuthenticationTypes";

export const login =
  (
    username: string,
    password: string
  ): ThunkAction<Promise<void>, RootState, unknown, Action<string>> =>
  async (dispatch) => {
    try {
      const response = await api.post("/auth/login", { username, password });
      const { token } = response.data;

      const isBiometricAuth = await authenticateBiometric();
      if (isBiometricAuth) {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: token,
        });
      } else {
        dispatch({
          type: LOGIN_FAIL,
          payload: "Biometric authentication failed",
        });
      }
    } catch (error: any) {
      dispatch({
        type: LOGIN_FAIL,
        payload: error.message || "Login failed",
      });
    }
  };
