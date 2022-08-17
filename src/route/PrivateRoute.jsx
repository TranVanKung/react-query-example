import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import DashboardLayout from "@/component/DashboardLayout";

const PrivateRoute = (props) => {
  const { component: ComponentInRoute, token, ...rest } = props;

  return (
    <Route {...rest}>
      {token ? (
        <DashboardLayout>
          <ComponentInRoute />
        </DashboardLayout>
      ) : (
        <Redirect to="/" />
      )}
    </Route>
  );
};

export default connect((state) => ({
  token: state?.Auth?.token,
}))(PrivateRoute);
