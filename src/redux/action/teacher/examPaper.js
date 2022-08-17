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

export const actSaveSelectedExamPaper = (payload) => ({
  type: TEACHER_SAVE_SELECTED_EXAM_PAPER,
  payload,
});

export const actSetModalExamPaperVisible = (payload) => ({
  type: TEACHER_SET_MODAL_EXAM_PAPER_VISIBLE,
  payload,
});

export const actSaveGetAllExamPaper = (payload) => ({
  type: TEACHER_SAVE_GET_ALL_EXAM_PAPER,
  payload,
});

export const actSetExamPaperPageSize = (payload) => ({
  type: TEACHER_SET_EXAM_PAPER_PAGE_SIZE,
  payload,
});

export const actSaveCreateExamPaper = (payload) => ({
  type: TEACHER_SAVE_CREATE_EXAM_PAPER,
  payload,
});

export const actSaveUpdateExamPaper = (payload) => ({
  type: TEACHER_SAVE_UPDATE_EXAM_PAPER,
  payload,
});

export const actSaveDeleteExamPaper = (payload) => ({
  type: TEACHER_SAVE_DELETE_EXAM_PAPER,
  payload,
});

export const actSetPreviewExamPaperDrawerOpen = (payload) => ({
  type: TEACHER_SET_PREVIEW_EXAM_PAPER_DRAWER_OPEN,
  payload,
});
