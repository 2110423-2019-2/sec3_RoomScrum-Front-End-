import {loginStateReducer} from './login-state';
import { combineReducers } from "redux";

export const rootReducer = combineReducers({
  loginState: loginStateReducer,
});