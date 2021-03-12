import { all, call } from "redux-saga/effects";
import {
  checkFetchMessagesApiAction,
  checkPostMessengerApiAction,
  checkPostUSerSignUpAction,
  checkFetchUserInfo,
  checkFetchAccountListApiAction,
  checkGetUserAsyncApi,
} from "./MessengerSaga";

export function* rootSaga() {
  yield all([
    checkFetchMessagesApiAction(),
    checkPostMessengerApiAction(),
    checkPostUSerSignUpAction(),
    checkFetchUserInfo(),
    checkFetchAccountListApiAction(),
    checkGetUserAsyncApi(),
  ]);
}
