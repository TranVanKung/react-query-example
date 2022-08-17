import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import NotFoundPage from "@/page/notFound";
import LoginPage from "@/page/login";
import ProtorLoginPage from "@/page/protor-login";
import SignupPage from "@/page/signup";
import SignupSuccessPage from "@/page/signup-success";
import HomePage from "@/page/home";
import ProtorLoginCodePage from "@/page/protor-login-code";
import ManageTeacherPage from "@/page/admin/manage-teacher";
import ManageSchedulePage from "@/page/supervisor/manage-schedule";
import ManageExamPage from "@/page/supervisor/manage-exam";
import TeacherManageExamRoomPage from "@/page/teacher/manage-exam-room";
import TeacherManageStudentPage from "@/page/teacher/manage-student";
import TeacherManageExamPaperPage from "@/page/teacher/manage-exam-paper";
import TeacherManageExamPage from "@/page/teacher/manage-examination";
import CreateExaminationPage from "@/page/teacher/create-examination";
import TeacherStudentDetailPage from "@/page/teacher/student-detail";
import TeacherDashboardPage from "@/page/teacher/dashboard";
import ManageQuestionPage from "@/page/teacher/manage-question";
import UploadQuestionPage from "@/page/teacher/upload-question";
import TeacherManageProtorPage from "@/page/teacher/manage-protor";

import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";

const routesConfig = [
  {
    exact: true,
    isPrivateRoute: false,
    path: "/",
    component: HomePage,
  },
  {
    exact: true,
    isPrivateRoute: false,
    path: "/login",
    component: LoginPage,
  },
  {
    exact: true,
    isPrivateRoute: false,
    path: "/protor-login",
    component: ProtorLoginPage,
  },
  {
    exact: true,
    isPrivateRoute: false,
    path: "/sign-up",
    component: SignupPage,
  },
  {
    exact: true,
    isPrivateRoute: false,
    path: "/sign-up-success",
    component: SignupSuccessPage,
  },
  {
    exact: true,
    isPrivateRoute: false,
    path: "/protor-login-code",
    component: ProtorLoginCodePage,
  },
  {
    exact: true,
    isPrivateRoute: true,
    path: "/admin/manage-teacher",
    component: ManageTeacherPage,
  },
  {
    exact: true,
    isPrivateRoute: true,
    path: "/supervisor/manage-schedule",
    component: ManageSchedulePage,
  },
  {
    exact: true,
    isPrivateRoute: true,
    path: "/supervisor/manage-exam",
    component: ManageExamPage,
  },

  {
    exact: true,
    isPrivateRoute: true,
    path: "/teacher/dashboard",
    component: TeacherDashboardPage,
  },
  {
    exact: true,
    isPrivateRoute: true,
    path: "/teacher/manage-protor",
    component: TeacherManageProtorPage,
  },
  {
    exact: true,
    isPrivateRoute: true,
    path: "/teacher/manage-exam-room",
    component: TeacherManageExamRoomPage,
  },
  {
    exact: true,
    isPrivateRoute: true,
    path: "/teacher/manage-student",
    component: TeacherManageStudentPage,
  },
  {
    exact: true,
    isPrivateRoute: true,
    path: "/teacher/manage-exam-paper",
    component: TeacherManageExamPaperPage,
  },
  {
    exact: true,
    isPrivateRoute: true,
    path: "/teacher/manage-examination",
    component: TeacherManageExamPage,
  },
  {
    exact: true,
    isPrivateRoute: true,
    path: "/teacher/create-examination",
    component: CreateExaminationPage,
  },
  {
    exact: true,
    isPrivateRoute: true,
    path: "/teacher/student-detail",
    component: TeacherStudentDetailPage,
  },
  {
    exact: true,
    isPrivateRoute: true,
    path: "/teacher/manage-question",
    component: ManageQuestionPage,
  },
  {
    exact: true,
    isPrivateRoute: true,
    path: "/teacher/upload-question",
    component: UploadQuestionPage,
  },
  {
    isPrivateRoute: true,
    path: "*",
    component: NotFoundPage,
  },
];

const AppRoute = () => {
  return (
    <Router>
      <Switch>
        {routesConfig.map((routeInfo, index) => {
          if (routeInfo.isPrivateRoute === true) {
            return <PrivateRoute key={index} {...routeInfo} />;
          }

          return <PublicRoute key={index} {...routeInfo} />;
        })}
      </Switch>
    </Router>
  );
};

export default AppRoute;
