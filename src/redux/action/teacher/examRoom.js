import {
  TEACHER_SAVE_SELECTED_EXAM_ROOM,
  TEACHER_SET_MODAL_EXAM_ROOM_VISIBLE,
  TEACHER_SAVE_GET_ALL_EXAM_ROOM,
  TEACHER_SET_EXAM_ROOM_PAGE_SIZE,
  TEACHER_SAVE_CREATE_EXAM_ROOM,
  TEACHER_SAVE_DELETE_EXAM_ROOM,
  TEACHER_SAVE_UPDATE_EXAM_ROOM,
} from "@/redux/type";

export const actSaveSelectedExamRoom = (payload) => ({
  type: TEACHER_SAVE_SELECTED_EXAM_ROOM,
  payload,
});

export const actSetModalExamRoomVisible = (payload) => ({
  type: TEACHER_SET_MODAL_EXAM_ROOM_VISIBLE,
  payload,
});

export const actSaveGetAllExamRoom = (payload) => ({
  type: TEACHER_SAVE_GET_ALL_EXAM_ROOM,
  payload,
});

export const actSetExamRoomPageSize = (payload) => ({
  type: TEACHER_SET_EXAM_ROOM_PAGE_SIZE,
  payload,
});

export const actSaveCreateExamRoom = (payload) => ({
  type: TEACHER_SAVE_CREATE_EXAM_ROOM,
  payload,
});

export const actSaveUpdateExamRoom = (payload) => ({
  type: TEACHER_SAVE_UPDATE_EXAM_ROOM,
  payload,
});

export const actSaveDeleteExamRoom = (payload) => ({
  type: TEACHER_SAVE_DELETE_EXAM_ROOM,
  payload,
});
