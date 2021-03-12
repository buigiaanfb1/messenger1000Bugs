import { yellow } from "@material-ui/core/colors";
import { call, put, takeLatest, delay } from "@redux-saga/core/effects";
import { STATUS_CODE } from "../../util/constants/settingSystems";
import {
  FETCH_ACCOUNT_API,
  FETCH_MESSAGES_API,
  FETCH_MESSAGES_API_SAGA,
  IS_SIGN_UP_SUCCESS_SAGA,
  POST_MESSAGES_API,
  POST_MESSAGES_API_SAGA,
  POST_USER_SIGN_UP_API,
  POST_USER_SIGN_UP_API_SAGA,
  USER_LOGIN,
  USER_LOGIN_OPEN_ROUTE,
  FETCH_ACCOUNT_API_SAGA,
  GET_USER_STORAGE,
  GET_USER_STORAGE_SAGA,
} from "./../constants";
import {
  fetchMessengerApi,
  fetchAccountListApi,
  postMessengerApi,
  postUserSignUpApi,
} from "./../services/MessengerServices";

function* fetchMessagesApiAction() {
  try {
    const { data, status } = yield call(fetchMessengerApi);
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: FETCH_MESSAGES_API_SAGA,
        payload: data,
      });
    }
  } catch (err) {
    console.log(err);
  }
}

export function* checkFetchMessagesApiAction() {
  yield takeLatest(FETCH_MESSAGES_API, fetchMessagesApiAction);
}

export function* checkFetchUserInfo() {
  yield takeLatest(USER_LOGIN_OPEN_ROUTE, fetchMessagesApiAction);
}

function* fetchAccountListApiAction() {
  try {
    const { data, status } = yield call(fetchAccountListApi);
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: FETCH_ACCOUNT_API_SAGA,
        payload: data,
      });
    }
  } catch (err) {
    console.log(err);
  }
}

export function* checkFetchAccountListApiAction() {
  yield takeLatest(FETCH_ACCOUNT_API, fetchAccountListApiAction);
}

function* getUserAsyncApi(values) {
  try {
    fetchAccountListApiAction();
    yield put({
      type: GET_USER_STORAGE_SAGA,
      payload: values,
    });
  } catch (err) {
    console.log(err);
  }
}

export function* checkGetUserAsyncApi() {
  yield takeLatest(GET_USER_STORAGE, getUserAsyncApi);
}

function* postMessengerApiAction(payload) {
  const { messenger } = payload;
  try {
    const { data, status } = yield call(postMessengerApi, messenger);
    if (status === STATUS_CODE.CREATED) {
      yield put({
        type: POST_MESSAGES_API_SAGA,
        payload: messenger,
      });
    }
  } catch (err) {
    console.log(err);
  }
}

export function* checkPostMessengerApiAction() {
  yield takeLatest(POST_MESSAGES_API, postMessengerApiAction);
}

function* postUserSignUpAction(userInfo) {
  const { values } = userInfo;
  try {
    const { data, status } = yield call(postUserSignUpApi, values);
    if (status === STATUS_CODE.CREATED) {
      alert("Đăng kí thành công! CHÉMMMMMMMMMMMMM");
      yield put({
        type: IS_SIGN_UP_SUCCESS_SAGA,
      });
    }
  } catch (err) {
    console.log(err);
  }
}

export function* checkPostUSerSignUpAction() {
  yield takeLatest(POST_USER_SIGN_UP_API, postUserSignUpAction);
}
