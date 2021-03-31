import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuthState } from "./hooks/LoginContext";

export default function PublicRoute({ component: Component, ...rest }) {
  const { user } = useAuthState();
  user ?  console.log(user) :  console.log("usuario no auth");
  return (
    <Route
      {...rest}
      render={(props) => {
        return !user ? (
          <Component {...props} />
        ) : (
          <Redirect to="/dashboard" />
        );
      }}
    ></Route>
  );
}
