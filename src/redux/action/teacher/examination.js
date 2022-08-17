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

export const actSaveSelectedExamination = (payload) => ({
  type: TEACHER_SAVE_SELECTED_EXAMINATION,
  payload,
});

export const actSaveGetAllExamination = (payload) => ({
  type: TEACHER_SAVE_GET_ALL_EXAMINATION,
  payload,
});

export const actSaveCreateExamination = (payload) => ({
  type: TEACHER_SAVE_CREATE_EXAMINATION,
  payload,
});

export const actSaveUpdateExamination = (payload) => ({
  type: TEACHER_SAVE_UPDATE_EXAMINATION,
  payload,
});

export const actSaveDeleteExamination = (payload) => ({
  type: TEACHER_SAVE_DELETE_EXAMINATION,
  payload,
});

export const actSetExaminationPageSize = (payload) => ({
  type: TEACHER_SET_EXAMINATION_PAGE_SIZE,
  payload,
});

export const actSetCreateExaminationStep = (payload) => ({
  type: TEACHER_SET_CREATE_EXAMINATION_STEP,
  payload,
});

export const actSetModalExamPaperOpen = (payload) => ({
  type: TEACHER_SET_MODAL_EXAM_PAPER_OPEN,
  payload,
});

export const actSetListExamRoom = (payload) => ({
  type: TEACHER_SET_LIST_EXAM_ROOM,
  payload,
});
