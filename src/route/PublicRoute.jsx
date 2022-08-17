import React from "react";
import { Route } from "react-router-dom";

const PublicRoute = (props) => {
  const { component: ComponentInRoute, ...rest } = props;

  return (
    <Route {...rest}>
      <ComponentInRoute />
    </Route>
  );
};

export default PublicRoute;
