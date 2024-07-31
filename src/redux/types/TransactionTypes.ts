export interface Transaction {
  id: number;
  amount: number;
  date: string;
  description: string;
  type: string;
}

export const FETCH_TRANSACTIONS_SUCCESS = "FETCH_TRANSACTIONS_SUCCESS";
export const FETCH_TRANSACTIONS_FAIL = "FETCH_TRANSACTIONS_FAIL";

interface FetchTransactionsSuccessAction {
  type: typeof FETCH_TRANSACTIONS_SUCCESS;
  payload: Transaction[];
}

interface FetchTransactionsFailAction {
  type: typeof FETCH_TRANSACTIONS_FAIL;
  payload: string;
}

export type TransactionActionTypes =
  | FetchTransactionsSuccessAction
  | FetchTransactionsFailAction;
