import {
  TEACHER_SAVE_SELECTED_PROTOR,
  TEACHER_SET_MODAL_PROTOR_VISIBLE,
  TEACHER_SAVE_GET_ALL_PROTOR,
  TEACHER_SET_PROTOR_PAGE_SIZE,
  TEACHER_SAVE_CREATE_PROTOR,
  TEACHER_SAVE_DELETE_PROTOR,
  TEACHER_SAVE_UPDATE_PROTOR,
} from "@/redux/type";
import update from "@/redux/reducer/helper";

const initialState = {
  selectedProtor: {},
  isModalVisible: false,
  listProtor: [],
  totalData: 0,
  pageSize: 20,
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case TEACHER_SAVE_SELECTED_PROTOR:
      return {
        ...state,
        selectedProtor: payload,
      };

    case TEACHER_SET_MODAL_PROTOR_VISIBLE:
      return {
        ...state,
        isModalVisible: payload,
      };

    case TEACHER_SAVE_GET_ALL_PROTOR:
      return {
        ...state,
        listProtor: payload?.list_data,
        totalData: payload.total_data,
      };

    case TEACHER_SET_PROTOR_PAGE_SIZE:
      return {
        ...state,
        pageSize: payload,
      };

    case TEACHER_SAVE_CREATE_PROTOR: {
      let newListProtor = [];

      if (state.listProtor.length < state.pageSize) {
        newListProtor = [payload, ...state.listProtor];
      } else {
        newListProtor = [
          payload,
          ...state.listProtor.slice(0, state.listProtor.length - 1),
        ];
      }

      return {
        ...state,
        listProtor: newListProtor,
        totalData: state.totalData + 1,
      };
    }

    case TEACHER_SAVE_UPDATE_PROTOR:
      return update(state, {
        listProtor: {
          $updateOrDelete: [payload.id, payload],
        },
      });

    case TEACHER_SAVE_DELETE_PROTOR:
      return update(state, {
        listProtor: {
          $updateOrDelete: [payload],
        },
      });

    default:
      return state;
  }
};

export default reducer;
