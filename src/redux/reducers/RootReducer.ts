import { combineReducers } from "redux";
import { transactionReducer } from "./TransactionReducer";
import { authReducer } from "./AuthReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  transactions: transactionReducer,
});

export default rootReducer;
