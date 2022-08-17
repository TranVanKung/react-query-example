import {
  TEACHER_SAVE_SELECTED_PROTOR,
  TEACHER_SET_MODAL_PROTOR_VISIBLE,
  TEACHER_SAVE_GET_ALL_PROTOR,
  TEACHER_SET_PROTOR_PAGE_SIZE,
  TEACHER_SAVE_CREATE_PROTOR,
  TEACHER_SAVE_DELETE_PROTOR,
  TEACHER_SAVE_UPDATE_PROTOR,
} from "@/redux/type";

export const actSaveSelectedProtor = (payload) => ({
  type: TEACHER_SAVE_SELECTED_PROTOR,
  payload,
});

export const actSetModalProtorVisible = (payload) => ({
  type: TEACHER_SET_MODAL_PROTOR_VISIBLE,
  payload,
});

export const actSaveGetAllProtor = (payload) => ({
  type: TEACHER_SAVE_GET_ALL_PROTOR,
  payload,
});

export const actSetProtorPageSize = (payload) => ({
  type: TEACHER_SET_PROTOR_PAGE_SIZE,
  payload,
});

export const actSaveCreateProtor = (payload) => ({
  type: TEACHER_SAVE_CREATE_PROTOR,
  payload,
});

export const actSaveUpdateProtor = (payload) => ({
  type: TEACHER_SAVE_UPDATE_PROTOR,
  payload,
});

export const actSaveDeleteProtor = (payload) => ({
  type: TEACHER_SAVE_DELETE_PROTOR,
  payload,
});
