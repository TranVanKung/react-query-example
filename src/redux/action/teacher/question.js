import {
  TEACHER_SAVE_SELECTED_QUESTION,
  TEACHER_SET_DRAWER_QUESTION_VISIBLE,
  TEACHER_SAVE_GET_ALL_QUESTION,
  TEACHER_SET_QUESTION_PAGE_SIZE,
  TEACHER_SAVE_CREATE_QUESTION,
  TEACHER_SAVE_DELETE_QUESTION,
  TEACHER_SAVE_UPDATE_QUESTION,
} from "@/redux/type";

export const actSaveSelectedQuestion = (payload) => ({
  type: TEACHER_SAVE_SELECTED_QUESTION,
  payload,
});

export const actSetDrawerQuestionVisible = (payload) => ({
  type: TEACHER_SET_DRAWER_QUESTION_VISIBLE,
  payload,
});

export const actSaveGetAllQuestion = (payload) => ({
  type: TEACHER_SAVE_GET_ALL_QUESTION,
  payload,
});

export const actSaveCreateQuestion = (payload) => ({
  type: TEACHER_SAVE_CREATE_QUESTION,
  payload,
});

export const actSaveUpdateQuestion = (payload) => ({
  type: TEACHER_SAVE_UPDATE_QUESTION,
  payload,
});

export const actSaveDeleteQuestion = (payload) => ({
  type: TEACHER_SAVE_DELETE_QUESTION,
  payload,
});
