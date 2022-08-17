import {
  TEACHER_SAVE_SELECTED_STUDENT,
  TEACHER_SET_MODAL_STUDENT_VISIBLE,
  TEACHER_SAVE_GET_ALL_STUDENT,
  TEACHER_SET_STUDENT_PAGE_SIZE,
  TEACHER_SAVE_CREATE_STUDENT,
  TEACHER_SAVE_DELETE_STUDENT,
  TEACHER_SAVE_UPDATE_STUDENT,
} from "@/redux/type";
import update from "@/redux/reducer/helper";

const initialState = {
  selectedStudent: {},
  isModalVisible: false,
  listStudent: [],
  totalData: 0,
  pageSize: 20,
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case TEACHER_SAVE_SELECTED_STUDENT:
      return {
        ...state,
        selectedStudent: payload,
      };

    case TEACHER_SET_MODAL_STUDENT_VISIBLE:
      return {
        ...state,
        isModalVisible: payload,
      };

    case TEACHER_SAVE_GET_ALL_STUDENT:
      return {
        ...state,
        listStudent: payload?.list_data,
        totalData: payload.total_data,
      };

    case TEACHER_SET_STUDENT_PAGE_SIZE:
      return {
        ...state,
        pageSize: payload,
      };

    case TEACHER_SAVE_CREATE_STUDENT: {
      let newListStudent = [];

      if (state.listStudent.length < state.pageSize) {
        newListStudent = [payload, ...state.listStudent];
      } else {
        newListStudent = [
          payload,
          ...state.listStudent.slice(0, state.listStudent.length - 1),
        ];
      }

      return {
        ...state,
        listStudent: newListStudent,
        totalData: state.totalData + 1,
      };
    }

    case TEACHER_SAVE_UPDATE_STUDENT:
      return update(state, {
        listStudent: {
          $updateOrDelete: [payload.id, payload],
        },
      });

    case TEACHER_SAVE_DELETE_STUDENT:
      return update(state, {
        listStudent: {
          $updateOrDelete: [payload],
        },
      });

    default:
      return state;
  }
};

export default reducer;
