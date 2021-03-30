import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuthState } from "./hooks/LoginContext";

export default function PrivateRoute({ component: Component, ...rest }) {
  const { user } = useAuthState();
  console.log(user);

  return (
    <Route
      {...rest}
      render={(props) => {
        console.log(props);
        return user ? <Component {...props} /> : <Redirect to="/login" />;
      }}
    ></Route>
  );
}
