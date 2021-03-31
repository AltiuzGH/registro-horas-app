import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
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

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: "#000000",
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 5px",
    ...theme.mixins.toolbar,
  },
  img: {
    height: 30,
  },
  logotiny: {
    height: 30,
  },
  title: {
    flexGrow: 1,
  },
  link: {
    textDecoration: "none",
    color: "inherit",
  },
  /*drawerPaper: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },*/
}));

export const SideBar = () => {
  const history = useHistory();
  const classes = useStyles();
  const currentPath = history.location.pathname;

  const theme = useTheme();


    // Rutas que se usaran para perfil admin
    const routesAdmin = [
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
    const routes = [
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
    const currentLocation = useLocation();
    const currentRole = localStorage.getItem("role");
    return currentRole === "admin"
      ? routesAdmin.find((p) => p.path === currentLocation.pathname).name
      : routes.find((p) => console.log(p.path));
  };

  console.log(GetCurrentView())
  /*const getCurrentView = () => {
    console.log(localStorage.getItem("role"));
    console.log(routesAdmin);
    console.log(routes);
    return localStorage.getItem("role") === "admin"
      ? routesAdmin.find((r) => r.path === currentPath).name
      : routes.find((r) => r.path === currentPath).name;
  };*/

  const dispatch = useAuthDispatch();
  const userDetails = useAuthState();

  const handleLogout = () => {
    logout(dispatch);
    history.push("/login");
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
          {GetCurrentView()}
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          ></Typography>
          <Typography
            noWrap
            className={classes.title}
            component="p"
            color="inherit"
            align="right"
          >
            Bienvenido {userDetails.user}
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
            : routes.map((route, index) => (
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
