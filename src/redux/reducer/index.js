import { combineReducers } from "redux";
import App from "./app";
import Auth from "./auth";
import AdminTeacher from "./admin/teacher";
import TeacherStudent from "./teacher/student";
import TeacherExam from "./teacherExam";
import TeacherExamPaper from "./teacher/examPaper";
import TeacherExamRoom from "./teacher/examRoom";
import TeacherQuestion from "./teacher/question";
import TeacherExamination from "./teacher/examication";
import TeacherProtor from "./teacher/protor";

const reducer = () => {
  return combineReducers({
    Auth,
    App,
    AdminTeacher,
    TeacherStudent,
    TeacherExam,
    TeacherExamPaper,
    TeacherExamRoom,
    TeacherQuestion,
    TeacherExamination,
    TeacherProtor,
  });
};

export default reducer;
