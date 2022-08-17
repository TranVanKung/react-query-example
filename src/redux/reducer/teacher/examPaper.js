import {
  TEACHER_SAVE_SELECTED_EXAM_PAPER,
  TEACHER_SET_MODAL_EXAM_PAPER_VISIBLE,
  TEACHER_SAVE_GET_ALL_EXAM_PAPER,
  TEACHER_SET_EXAM_PAPER_PAGE_SIZE,
  TEACHER_SAVE_CREATE_EXAM_PAPER,
  TEACHER_SAVE_DELETE_EXAM_PAPER,
  TEACHER_SAVE_UPDATE_EXAM_PAPER,
  TEACHER_SET_PREVIEW_EXAM_PAPER_DRAWER_OPEN,
} from "@/redux/type";
import update from "@/redux/reducer/helper";

const initialState = {
  selectedExamPaper: {},
  isModalVisible: false,
  listExamPaper: [],
  totalData: 0,
  pageSize: 20,
  isPreviewDrawerVisible: false,
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case TEACHER_SAVE_SELECTED_EXAM_PAPER:
      return {
        ...state,
        selectedExamPaper: payload,
      };

    case TEACHER_SET_MODAL_EXAM_PAPER_VISIBLE:
      return {
        ...state,
        isModalVisible: payload,
      };

    case TEACHER_SAVE_GET_ALL_EXAM_PAPER:
      return {
        ...state,
        listExamPaper: payload?.list_data,
        totalData: payload.total_data,
      };

    case TEACHER_SET_EXAM_PAPER_PAGE_SIZE:
      return {
        ...state,
        pageSize: payload,
      };

    case TEACHER_SAVE_CREATE_EXAM_PAPER: {
      let newListExamPaper = [];

      if (state.listExamPaper.length < state.pageSize) {
        newListExamPaper = [payload, ...state.listExamPaper];
      } else {
        newListExamPaper = [
          payload,
          ...state.listExamPaper.slice(0, state.listExamPaper.length - 1),
        ];
      }

      return {
        ...state,
        listExamPaper: newListExamPaper,
        totalData: state.totalData + 1,
      };
    }

    case TEACHER_SAVE_UPDATE_EXAM_PAPER:
      return update(state, {
        listExamPaper: {
          $updateOrDelete: [payload.id, payload],
        },
      });

    case TEACHER_SAVE_DELETE_EXAM_PAPER:
      return update(state, {
        listExamPaper: {
          $updateOrDelete: [payload],
        },
      });

    case TEACHER_SET_PREVIEW_EXAM_PAPER_DRAWER_OPEN:
      return {
        ...state,
        isPreviewDrawerVisible: payload,
      };

    default:
      return state;
  }
};

export default reducer;
