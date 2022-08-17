import {
  TEACHER_SAVE_SELECTED_EXAM_ROOM,
  TEACHER_SET_MODAL_EXAM_ROOM_VISIBLE,
  TEACHER_SAVE_GET_ALL_EXAM_ROOM,
  TEACHER_SET_EXAM_ROOM_PAGE_SIZE,
  TEACHER_SAVE_CREATE_EXAM_ROOM,
  TEACHER_SAVE_DELETE_EXAM_ROOM,
  TEACHER_SAVE_UPDATE_EXAM_ROOM,
} from "@/redux/type";
import update from "@/redux/reducer/helper";

const initialState = {
  selectedExamRoom: {},
  isModalVisible: false,
  listExamRoom: [],
  totalData: 0,
  pageSize: 20,
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case TEACHER_SAVE_SELECTED_EXAM_ROOM:
      return {
        ...state,
        selectedExamRoom: payload,
      };

    case TEACHER_SET_MODAL_EXAM_ROOM_VISIBLE:
      return {
        ...state,
        isModalVisible: payload,
      };

    case TEACHER_SAVE_GET_ALL_EXAM_ROOM:
      return {
        ...state,
        listExamRoom: payload?.list_data,
        totalData: payload.total_data,
      };

    case TEACHER_SET_EXAM_ROOM_PAGE_SIZE:
      return {
        ...state,
        pageSize: payload,
      };

    case TEACHER_SAVE_CREATE_EXAM_ROOM: {
      let newListExamRoom = [];

      if (state.listExamRoom.length < state.pageSize) {
        newListExamRoom = [payload, ...state.listExamRoom];
      } else {
        newListExamRoom = [
          payload,
          ...state.listExamRoom.slice(0, state.listExamRoom.length - 1),
        ];
      }

      return {
        ...state,
        listExamRoom: newListExamRoom,
        totalData: state.totalData + 1,
      };
    }

    case TEACHER_SAVE_UPDATE_EXAM_ROOM:
      return update(state, {
        listExamRoom: {
          $updateOrDelete: [payload.id, payload],
        },
      });

    case TEACHER_SAVE_DELETE_EXAM_ROOM:
      return update(state, {
        listExamRoom: {
          $updateOrDelete: [payload],
        },
      });

    default:
      return state;
  }
};

export default reducer;
