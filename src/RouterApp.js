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
import { Profile } from "./hours/Profile";
import { Workers } from "./hours/Workers";
import { Login } from "./Login";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import image404 from "../src/assets/404.png";

const LoginContainer = () => (
  <div>
    <Route path="/login" component={Login}></Route>
  </div>
);

const sectionStyle = {
  width: "100%",
  height: "94vh",
  backgroundRepeat: "no-repeat",
  backgroundImage: `url(${image404})`,
};

export const NotFound = () => (
  <section style={sectionStyle}>
    <h1 style={{ marginLeft: "38%", fontSize: 30 }}>
      Esta página está perdida en el espacio
    </h1>
    <h1 style={{ marginLeft: "45%", fontSize: 100 }}>404</h1>
  </section>
);

const privateContainer = () => (
  <div style={{ display: "flex" }}>
    <Switch>
      <PrivateRoute exact path="/dashboard" component={Projects} />
      <PrivateRoute exact path="/dashboard/details" component={Details} />
      <PrivateRoute exact path="/dashboard/projects" component={Projects} />
      <PrivateRoute exact path="/dashboard/statistics" component={Statistics} />
      <PrivateRoute exact path="/dashboard/profile" component={Profile} />
      <PrivateRoute exact path="/dashboard/workers" component={Workers} />
      <PrivateRoute
        exact
        path="/dashboard/allprojects"
        component={AllProjects}
      />
      <PrivateRoute path="*" component={NotFound} />
    </Switch>
  </div>
);

export const RouterApp = () => {
  return (
    <Router basename="/registro-horas-app">
      <AuthProvider>
        <Switch>
          <Route path="/dashboard" component={privateContainer} />
          <Redirect exact from="/" to="/login"></Redirect>
          <PublicRoute path="/login" component={LoginContainer} />
          <Route path="*" component={NotFound} />
        </Switch>
      </AuthProvider>
    </Router>
  );
};
