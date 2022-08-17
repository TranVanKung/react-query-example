import { SAVE_USER_SIGN_IN, USER_SIGN_OUT, SAVE_GET_USER_INFO } from "../type";

export const actSaveUserSignIn = (payload) => {
  return {
    type: SAVE_USER_SIGN_IN,
    payload,
  };
};

export const actSaveGetUserInfo = (payload) => {
  return {
    type: SAVE_GET_USER_INFO,
    payload,
  };
};

export const actUserSignOut = () => {
  return {
    type: USER_SIGN_OUT,
  };
};
