import {
  SAVE_SELECTED_TEACHER,
  SET_DRAWER_TEACHER_VISIBLE,
  SAVE_GET_ALL_TEACHER,
  SET_PAGE_SIZE,
  SAVE_CREATE_TEACHER,
  SAVE_DELETE_TEACHER,
  SAVE_UPDATE_TEACHER,
} from "@/redux/type";

export const actSaveSelectedTeacher = (payload) => ({
  type: SAVE_SELECTED_TEACHER,
  payload,
});

export const actSetDrawerTeacherVisible = (payload) => ({
  type: SET_DRAWER_TEACHER_VISIBLE,
  payload,
});

export const actSaveGetAllTeacher = (payload) => ({
  type: SAVE_GET_ALL_TEACHER,
  payload,
});

export const actSetPageSize = (payload) => ({
  type: SET_PAGE_SIZE,
  payload,
});

export const actSaveCreateTeacher = (payload) => ({
  type: SAVE_CREATE_TEACHER,
  payload,
});

export const actSaveUpdateTeacher = (payload) => ({
  type: SAVE_UPDATE_TEACHER,
  payload,
});

export const actSaveDeleteTeacher = (payload) => ({
  type: SAVE_DELETE_TEACHER,
  payload,
});
