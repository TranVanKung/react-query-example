import { SET_SIDEBAR_OPEN, SET_USER_TYPE } from "@/redux/type";

export const actSetSideBarOpen = (payload) => ({
  type: SET_SIDEBAR_OPEN,
  payload,
});

export const actSetUserType = (payload) => ({
  type: SET_USER_TYPE,
  payload,
});
