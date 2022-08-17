import {
  TEACHER_SAVE_SELECTED_STUDENT,
  TEACHER_SET_MODAL_STUDENT_VISIBLE,
  TEACHER_SAVE_GET_ALL_STUDENT,
  TEACHER_SET_STUDENT_PAGE_SIZE,
  TEACHER_SAVE_CREATE_STUDENT,
  TEACHER_SAVE_DELETE_STUDENT,
  TEACHER_SAVE_UPDATE_STUDENT,
} from "@/redux/type";

export const actSaveSelectedStudent = (payload) => ({
  type: TEACHER_SAVE_SELECTED_STUDENT,
  payload,
});

export const actSetModalStudentVisible = (payload) => ({
  type: TEACHER_SET_MODAL_STUDENT_VISIBLE,
  payload,
});

export const actSaveGetAllStudent = (payload) => ({
  type: TEACHER_SAVE_GET_ALL_STUDENT,
  payload,
});

export const actSetStudentPageSize = (payload) => ({
  type: TEACHER_SET_STUDENT_PAGE_SIZE,
  payload,
});

export const actSaveCreateStudent = (payload) => ({
  type: TEACHER_SAVE_CREATE_STUDENT,
  payload,
});

export const actSaveUpdateStudent = (payload) => ({
  type: TEACHER_SAVE_UPDATE_STUDENT,
  payload,
});

export const actSaveDeleteStudent = (payload) => ({
  type: TEACHER_SAVE_DELETE_STUDENT,
  payload,
});
