import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import SignInPage from "screen/Signin";
import EmployeeGrid from "screen/EmployeeGrid";
import PreferencesPage from "screen/Preferences";
import NotFoundPage from "screen/NotFound";
import EmployeeSetting from "screen/EmployeeSetting";
import ShiftTypeSetting from "screen/ShiftTypeSetting";
import SkillSetting from "screen/SkillSetting";
import ContractSetting from "screen/ContractSetting";
import SendEmail from "screen/SendEmail";
import EmployeeReason from "screen/EmployeeReason";
import RotationSetting from "screen/RotationSetting";
import ViewPreferences from "screen/ViewPreferences";
import Dashboard from "screen/Dashboard";
import Homepage from "screen/Homepage";
import PublicRoute from "./PublicRoute";
import UserProfile from "screen/UserProfile";
import PrivateRoute from "./PrivateRoute";

const routesConfig = [
  {
    exact: true,
    isPrivateRoute: false,
    path: "/",
    component: Homepage,
  },
  {
    exact: true,
    isPrivateRoute: false,
    path: "/log-in",
    component: SignInPage,
  },
  {
    exact: true,
    isPrivateRoute: true,
    path: "/dashboard",
    component: Dashboard,
  },
  {
    exact: true,
    isPrivateRoute: true,
    path: "/assignments",
    component: EmployeeGrid,
  },
  {
    exact: true,
    isPrivateRoute: true,
    path: "/preferences",
    component: PreferencesPage,
  },
  {
    exact: true,
    isPrivateRoute: false,
    path: "/preferences/:hashCode",
    component: ViewPreferences,
  },
  {
    exact: true,
    isPrivateRoute: true,
    path: "/settings/employees",
    component: EmployeeSetting,
  },
  {
    exact: true,
    isPrivateRoute: true,
    path: "/settings/shift-types",
    component: ShiftTypeSetting,
  },
  {
    exact: true,
    isPrivateRoute: true,
    path: "/settings/skills",
    component: SkillSetting,
  },
  {
    exact: true,
    isPrivateRoute: true,
    path: "/settings/contracts",
    component: ContractSetting,
  },
  {
    exact: true,
    isPrivateRoute: true,
    path: "/settings/employee-reason",
    component: EmployeeReason,
  },
  {
    exact: true,
    isPrivateRoute: true,
    path: "/settings/rotation",
    component: RotationSetting,
  },
  {
    exact: true,
    isPrivateRoute: true,
    path: "/profile",
    component: UserProfile,
  },
  {
    exact: true,
    isPrivateRoute: true,
    path: "/send-email",
    component: SendEmail,
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
        {routesConfig.map((singleRoute, index) => {
          if (singleRoute.isPrivateRoute === true) {
            return <PrivateRoute key={index} {...singleRoute} />;
          }

          return <PublicRoute key={index} {...singleRoute} />;
        })}
      </Switch>
    </Router>
  );
};

export default AppRoute;
