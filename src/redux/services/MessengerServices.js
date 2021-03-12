import Axios from "axios";
// import { DOMAIN } from "./../util/constants/settingSystems";

export const fetchMessengerApi = () => {
  return Axios({
    url: `https://604a2cdb9251e100177ce195.mockapi.io/messages`,
    method: "GET",
  });
};

export const fetchAccountListApi = () => {
  return Axios({
    url: `https://604a2cdb9251e100177ce195.mockapi.io/Account`,
    method: "GET",
  });
};

export const postMessengerApi = (messenger) => {
  return Axios({
    url: `https://604a2cdb9251e100177ce195.mockapi.io/messages`,
    method: "POST",
    data: messenger,
  });
};

export const postUserSignUpApi = (userInfo) => {
  return Axios({
    url: "https://604a2cdb9251e100177ce195.mockapi.io/Account",
    method: "POST",
    data: userInfo,
  });
};
