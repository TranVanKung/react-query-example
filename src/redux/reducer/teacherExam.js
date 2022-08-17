import { TEACHER_SAVE_SELECTED_EXAM } from "@/redux/type";

const initialState = {
  selectedExam: {},
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case TEACHER_SAVE_SELECTED_EXAM:
      return {
        ...state,
        selectedExam: payload,
      };

    default:
      return state;
  }
};

export default reducer;
