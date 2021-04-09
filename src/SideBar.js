import React from "react";
import clsx from "clsx";

import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import AssignmentIcon from "@material-ui/icons/Assignment";
import Logo from "../src/assets/company_logo.png";
import LogoSmall from "../src/assets/company_logo_small.png";
import { Link, useHistory, useLocation } from "react-router-dom";
import Badge from "@material-ui/core/Badge";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useAuthDispatch, useAuthState } from "./hooks/LoginContext";
import { logout } from "./hooks/LoginActions";
import AssessmentIcon from "@material-ui/icons/Assessment";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";

import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { useStyles } from "./styles/_sideBar";




export const SideBar = () => {
  const history = useHistory();
  const classes = useStyles();

  const theme = useTheme();

  // Rutas que se usaran para perfil admin
  const routesAdmin = [
    {
      path: "/dashboard",
      name: "Dashboard",
      icon: <AssessmentIcon />,
    },
    {
      path: "/dashboard/statistics",
      name: "Estadísticas",
      icon: <AssessmentIcon />,
    },
    {
      path: "/dashboard/allprojects",
      name: "Proyectos",
      icon: <AssignmentIcon />,
    },
    {
      path: "/dashboard/workers",
      name: "Trabajadores",
      icon: <PeopleOutlineIcon />,
    },
  ];
  // Rutas que se usaran para perfil user
  const routesUser = [
    {
      path: "/dashboard",
      name: "Dashboard",
      icon: <AssessmentIcon />,
    },
    {
      path: "/dashboard/projects",
      name: "Proyectos",
      icon: <AssignmentIcon />,
    },
    {
      path: "/dashboard/details",
      name: "Detalles",
      icon: <VisibilityIcon />,
    },
  ];

  const GetCurrentView = () => {
    const { pathname } = useLocation();
    const currentRole = localStorage.getItem("role");
    console.log("Current Path:", pathname);
    return currentRole === "admin"
      ? routesAdmin.find((p) => p.path === pathname)?.name
      : routesUser.find((p) => p.path === pathname)?.name;
    //routesUser.find((p) => console.log("UP:", p.path)); //p.path === currentLocation.pathname).name;
    //routesAdmin.find((p) => console.log("AP:", p.path)); //p.path === currentLocation.pathname).name;
  };

  const dispatch = useAuthDispatch();
  const { user } = useAuthState();

  const handleLogout = () => {
    logout(dispatch);
    history.push("/login");
  };

  const handleProfile = () => {
    history.push("/dashboard/profile");
  };
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, { [classes.appBarShift]: open })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <img
              src={LogoSmall}
              className={classes.logotiny}
              alt="Logo Altiuz"
            />
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            {GetCurrentView() || "Mi Perfil"}
          </Typography>
          <Typography
            noWrap
            className={classes.title}
            component="p"
            color="inherit"
            align="right"
            onClick={handleProfile}
          >
            Bienvenido {user.full_name}
          </Typography>
          <IconButton color="inherit" onClick={handleLogout}>
            <Badge color="secondary">
              <ExitToAppIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <img src={Logo} className={classes.img} alt="Logo Altiuz" />
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {localStorage.getItem("role") === "admin"
            ? routesAdmin.map((route, index) => (
                <Link className={classes.link} key={index} to={route.path}>
                  <ListItem button onClick={handleDrawerClose}>
                    <ListItemIcon>{route.icon}</ListItemIcon>
                    <ListItemText primary={route.name} />
                  </ListItem>
                </Link>
              ))
            : routesUser.map((route, index) => (
                <Link className={classes.link} key={index} to={route.path}>
                  <ListItem button onClick={handleDrawerClose}>
                    <ListItemIcon>{route.icon}</ListItemIcon>
                    <ListItemText primary={route.name} />
                  </ListItem>
                </Link>
              ))}
        </List>
      </Drawer>
    </React.Fragment>
  );
};
