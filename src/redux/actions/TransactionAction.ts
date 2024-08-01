import { ThunkAction } from "redux-thunk";
import { Action } from "redux";
import {
  FETCH_TRANSACTIONS_FAIL,
  FETCH_TRANSACTIONS_SUCCESS,
} from "../types/TransactionTypes";
import { RootState } from "../Store";
import api2 from "../../services/Api2";

export const fetchTransactions =
  (): ThunkAction<Promise<void>, RootState, unknown, Action<string>> =>
  async (dispatch) => {
    try {
      const response = await api2.get("/transaction");
      dispatch({
        type: FETCH_TRANSACTIONS_SUCCESS,
        payload: response.data,
      });
    } catch (error: any) {
      dispatch({
        type: FETCH_TRANSACTIONS_FAIL,
        payload: error.message || "Failed to fetch transactions",
      });
    }
  };
