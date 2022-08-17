import _ from "lodash";
import {
  TEACHER_SAVE_SELECTED_QUESTION,
  TEACHER_SET_DRAWER_QUESTION_VISIBLE,
  TEACHER_SAVE_GET_ALL_QUESTION,
  TEACHER_SAVE_CREATE_QUESTION,
  TEACHER_SAVE_DELETE_QUESTION,
  TEACHER_SAVE_UPDATE_QUESTION,
} from "@/redux/type";
import update from "@/redux/reducer/helper";

const initialState = {
  selectedQuestion: {},
  isDrawerVisible: false,
  listQuestion: [],
  totalData: 0,
  pageSize: 20,
  selectedExam: {},
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case TEACHER_SAVE_SELECTED_QUESTION:
      return {
        ...state,
        selectedQuestion: payload,
      };

    case TEACHER_SET_DRAWER_QUESTION_VISIBLE:
      return {
        ...state,
        isDrawerVisible: payload,
      };

    case TEACHER_SAVE_GET_ALL_QUESTION:
      return {
        ...state,
        listQuestion: payload?.questions || [],
        totalData: payload?.questions?.length || 0,
        selectedExam: _.omit(payload, ["questions"]),
      };

    case TEACHER_SAVE_CREATE_QUESTION: {
      let newListQuestion = [];

      if (state.listQuestion.length < state.pageSize) {
        newListQuestion = [payload, ...state.listQuestion];
      } else {
        newListQuestion = [
          payload,
          ...state.listQuestion.slice(0, state.listQuestion.length - 1),
        ];
      }

      return {
        ...state,
        listQuestion: newListQuestion,
        totalData: state.totalData + 1,
      };
    }

    case TEACHER_SAVE_UPDATE_QUESTION:
      return update(state, {
        listQuestion: {
          $updateOrDelete: [payload.id, payload],
        },
      });

    case TEACHER_SAVE_DELETE_QUESTION:
      return update(state, {
        listQuestion: {
          $updateOrDelete: [payload],
        },
      });

    default:
      return state;
  }
};

export default reducer;
