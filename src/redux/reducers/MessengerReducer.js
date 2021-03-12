import {
  FETCH_ACCOUNT_API_SAGA,
  FETCH_MESSAGES_API_SAGA,
  GET_USER_STORAGE,
  GET_USER_STORAGE_SAGA,
  IS_SIGN_UP_SUCCESS,
  IS_SIGN_UP_SUCCESS_SAGA,
  POST_MESSAGES_API_SAGA,
  USER_LOGIN,
} from "../constants";

const initialState = {
  messengerList: [],
  accountList: [],
  credentials: [],
  isSignUpSuccess: false,
  isLogUpSuccess: false,
  isDisabled: true,
};

export default (state = initialState, { type, payload, values }) => {
  switch (type) {
    case FETCH_MESSAGES_API_SAGA: {
      state.messengerList = payload;
      return { ...state };
    }

    case FETCH_ACCOUNT_API_SAGA: {
      state.accountList = payload;
      return { ...state };
    }

    case POST_MESSAGES_API_SAGA: {
      let messengerListUpdate = [...state.messengerList, payload];
      state.messengerList = messengerListUpdate;
      return { ...state };
    }

    case IS_SIGN_UP_SUCCESS_SAGA: {
      state.isSignUpSuccess = true;
      return { ...state };
    }

    case USER_LOGIN: {
      let checkLogin = values;
      console.log(checkLogin);
      let index = state.accountList.findIndex((item) => {
        return (
          checkLogin.accountName === item.accountName &&
          checkLogin.password === item.password
        );
      });
      if (index !== -1) {
        state.credentials = { ...state.accountList[index] };
        localStorage.setItem(`credentials`, JSON.stringify(state.credentials));
        state.isLogUpSuccess = true;
        state.isDisabled = false;
      }
      return { ...state };
    }

    case GET_USER_STORAGE_SAGA: {
      let { values } = payload;
      console.log(values);
      console.log(state.accountList);
      let index = state.accountList.findIndex((item) => {
        return (
          values.accountName === item.accountName &&
          values.password === item.password
        );
      });
      if (index !== -1) {
        state.credentials = { ...state.accountList[index] };
        localStorage.setItem(`credentials`, JSON.stringify(state.credentials));
        state.isLogUpSuccess = true;
        state.isDisabled = false;
      }
      return { ...state };
    }
    default:
      return { ...state };
  }
};
