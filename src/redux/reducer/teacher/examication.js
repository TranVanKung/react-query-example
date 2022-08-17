import {
  TEACHER_SAVE_SELECTED_EXAMINATION,
  TEACHER_SAVE_GET_ALL_EXAMINATION,
  TEACHER_SET_EXAMINATION_PAGE_SIZE,
  TEACHER_SAVE_CREATE_EXAMINATION,
  TEACHER_SAVE_DELETE_EXAMINATION,
  TEACHER_SAVE_UPDATE_EXAMINATION,
  TEACHER_SET_CREATE_EXAMINATION_STEP,
  TEACHER_SET_MODAL_EXAM_PAPER_OPEN,
  TEACHER_SET_LIST_EXAM_ROOM,
} from "@/redux/type";
import update from "@/redux/reducer/helper";

export const emptyExamination = {
  name: "",
  description: "",
  subject: "",
  academic_year: "",
  semester: "",
  exam_configuration: {
    duration_mins: 0,
    enable_reminder: true,
    shuffle_question: true,
    shuffle_answer: true,
  },
  scheduled_exam_rooms: [],
};

const initialState = {
  selectedExamination: {
    ...emptyExamination,
  },
  listExamination: [],
  totalData: 0,
  pageSize: 20,
  currentStep: 0,
  isModalExamPaperOpen: false,
  listExamRoom: [],
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case TEACHER_SAVE_SELECTED_EXAMINATION:
      return {
        ...state,
        selectedExamination: { ...state.selectedExamination, ...payload },
      };

    case TEACHER_SAVE_GET_ALL_EXAMINATION:
      return {
        ...state,
        listExamination: payload?.list_data,
        totalData: payload.total_data,
      };

    case TEACHER_SET_EXAMINATION_PAGE_SIZE:
      return {
        ...state,
        pageSize: payload,
      };

    case TEACHER_SAVE_CREATE_EXAMINATION: {
      let newListExamination = [];

      if (state.listExamination.length < state.pageSize) {
        newListExamination = [payload, ...state.listExamination];
      } else {
        newListExamination = [
          payload,
          ...state.listExamination.slice(0, state.listExamination.length - 1),
        ];
      }

      return {
        ...state,
        listExamination: newListExamination,
        totalData: state.totalData + 1,
      };
    }

    case TEACHER_SAVE_UPDATE_EXAMINATION:
      return update(state, {
        listExamination: {
          $updateOrDelete: [payload.id, payload],
        },
      });

    case TEACHER_SAVE_DELETE_EXAMINATION:
      return update(state, {
        listExamination: {
          $updateOrDelete: [payload],
        },
      });

    case TEACHER_SET_CREATE_EXAMINATION_STEP:
      return {
        ...state,
        currentStep: payload,
      };

    case TEACHER_SET_MODAL_EXAM_PAPER_OPEN:
      return {
        ...state,
        isModalExamPaperOpen: payload,
      };

    case TEACHER_SET_LIST_EXAM_ROOM:
      return {
        ...state,
        selectedExamination: {
          ...state.selectedExamination,
          scheduled_exam_rooms: payload,
        },
      };

    default:
      return state;
  }
};

export default reducer;
