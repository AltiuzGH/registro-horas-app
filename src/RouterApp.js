import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { AuthProvider } from "./hooks/LoginContext";
import { AllProjects } from "./hours/AllProjects";
import { Details } from "./hours/Details";
import { Projects } from "./hours/Projects";
import { Statistics } from "./hours/Statistics";
import { Workers } from "./hours/Workers";
import { Login } from "./Login";
import { SideBar } from "./SideBar";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";

const LoginContainer = () => (
  <div>
    <Route path="/login" component={Login}></Route>
  </div>
);

const notFound = () => (
  <div style={{ marginLeft: 800, marginTop: 400 }}>404</div>
);

const privateContainer = () => (
  <div style={{ display: "flex" }}>
    <SideBar />
    <Switch>
      <PrivateRoute
        path="/dashboard/details"
        component={Details}
      ></PrivateRoute>
      <PrivateRoute
        path="/dashboard/projects"
        component={Projects}
      ></PrivateRoute>
      <PrivateRoute
        path="/dashboard/statistics"
        component={Statistics}
      ></PrivateRoute>
      <PrivateRoute
        path="/dashboard/allprojects"
        component={AllProjects}
      ></PrivateRoute>
      <PrivateRoute
        path="/dashboard/workers"
        component={Workers}
      ></PrivateRoute>
      <PrivateRoute path="/dashboard" component={Projects}></PrivateRoute>
    </Switch>
  </div>
);

export const RouterApp = () => {
  return (
    <Router basename="/registro-horas-app">
      <AuthProvider>
        <Switch>
          <Route path="/dashboard" component={privateContainer}></Route>
          <Redirect exact from="/" to="/login"></Redirect>
          <PublicRoute path="/login" component={LoginContainer} />
          <Route component={notFound}></Route>
        </Switch>
      </AuthProvider>
    </Router>
  );
};
