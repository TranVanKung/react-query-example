import { TEACHER_SAVE_SELECTED_EXAM } from "@/redux/type";

export const actTeacherSaveSelectedExam = (payload) => ({
  type: TEACHER_SAVE_SELECTED_EXAM,
  payload,
});
