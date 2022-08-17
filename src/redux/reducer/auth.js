import {
  SAVE_USER_SIGN_IN,
  USER_SIGN_OUT,
  SAVE_GET_USER_INFO,
} from "@/redux/type";

const initialState = {
  user: {},
  token: null,
  roles: null,
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SAVE_USER_SIGN_IN:
      return {
        ...state,
        token: payload?.access_token,
        roles: payload?.roles?.[0],
      };

    case SAVE_GET_USER_INFO:
      return {
        ...state,
        user: payload,
      };

    case USER_SIGN_OUT:
      return initialState;

    default:
      return state;
  }
};

export default reducer;
