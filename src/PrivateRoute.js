import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuthState } from "./hooks/LoginContext";
import { NotFound } from "./RouterApp";
import { SideBar } from "./SideBar";
import { Routes } from "./config/Routes";
import { Roles } from "./config/Roles";
export default function PrivateRoute({ component: Component, ...rest }) {
  const { user } = useAuthState();
  const { path } = rest;
  const { name } = Roles.find((role) => role.roles.includes(user.role));
  const { routes } = Routes.find((r) => r.role === name);

  //console.log(routes);
  //console.log(path);
  //console.log(routes.some((route) => route.path.includes(path)));
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!user) return <Redirect to="/login" />;
        if (path === "*") return <NotFound />;
        return routes.some((route) => route.path.includes(path)) ? (
          <React.Fragment>
            <SideBar />
            <Component {...props} />
          </React.Fragment>
        ) : (
          <NotFound /> // PLACEHOLDER | No tiene ROL necesario para acceder a esta View
        );
      }}
    />
  );
}
