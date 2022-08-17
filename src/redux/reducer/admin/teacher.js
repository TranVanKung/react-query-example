import {
  SAVE_SELECTED_TEACHER,
  SET_DRAWER_TEACHER_VISIBLE,
  SAVE_GET_ALL_TEACHER,
  SET_PAGE_SIZE,
  SAVE_CREATE_TEACHER,
  SAVE_DELETE_TEACHER,
  SAVE_UPDATE_TEACHER,
} from "@/redux/type";
import update from "@/redux/reducer/helper";

const initialState = {
  selectedTeacher: {},
  isDrawerVisible: false,
  listTeacher: [],
  totalData: 0,
  pageSize: 20,
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SAVE_SELECTED_TEACHER:
      return {
        ...state,
        selectedTeacher: payload,
      };

    case SET_DRAWER_TEACHER_VISIBLE:
      return {
        ...state,
        isDrawerVisible: payload,
      };

    case SAVE_GET_ALL_TEACHER:
      return {
        ...state,
        listTeacher: payload?.list_data,
        totalData: payload.total_data,
      };

    case SET_PAGE_SIZE:
      return {
        ...state,
        pageSize: payload,
      };

    case SAVE_CREATE_TEACHER: {
      let newListTeacher = [];

      if (state.listTeacher.length < state.pageSize) {
        newListTeacher = [payload, ...state.listTeacher];
      } else {
        newListTeacher = [
          payload,
          ...state.listTeacher.slice(0, state.listTeacher.length - 1),
        ];
      }

      return {
        ...state,
        listTeacher: newListTeacher,
        totalData: state.totalData + 1,
      };
    }

    case SAVE_UPDATE_TEACHER:
      return update(state, {
        listTeacher: {
          $updateOrDelete: [payload.id, payload],
        },
      });

    case SAVE_DELETE_TEACHER:
      return update(state, {
        listTeacher: {
          $updateOrDelete: [payload],
        },
      });

    default:
      return state;
  }
};

export default reducer;
