import {
  FETCH_TRANSACTIONS_FAIL,
  FETCH_TRANSACTIONS_SUCCESS,
  Transaction,
  TransactionActionTypes,
} from "../types/TransactionTypes";

interface TransactionState {
  transactions: Transaction[];
  error: string | null;
}

const initialState: TransactionState = {
  transactions: [],
  error: null,
};

export const transactionReducer = (
  state = initialState,
  action: TransactionActionTypes
): TransactionState => {
  switch (action.type) {
    case FETCH_TRANSACTIONS_SUCCESS:
      return { ...state, transactions: action.payload, error: null };
    case FETCH_TRANSACTIONS_FAIL:
      return { ...state, transactions: [], error: action.payload };
    default:
      return state;
  }
};
