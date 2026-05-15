import { all } from "redux-saga/effects";
import { combineReducers } from "redux";

import * as app from "./ducks/app.duck";
import * as museo from "./ducks/museo.duck";
import * as auth from "./ducks/auth.duck";

export const rootReducer = combineReducers({
  app: app.reducer,
  museo: museo.reducer,
  auth: auth.reducer,
});

export function* rootSaga() {
  yield all([]);
}
