import { USER_TYPE } from "@/util/config";
import { SET_SIDEBAR_OPEN, SET_USER_TYPE } from "@/redux/type";

const initialState = {
  isSidebarOpen: true,
  userType: USER_TYPE.ADMIN,
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_SIDEBAR_OPEN:
      return {
        ...state,
        isSidebarOpen: payload,
      };

    case SET_USER_TYPE:
      return {
        ...state,
        userType: payload,
      };

    default:
      return state;
  }
};

export default reducer;
