import AssessmentIcon from "@material-ui/icons/Assessment";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import VisibilityIcon from "@material-ui/icons/Visibility";
import AssignmentIcon from "@material-ui/icons/Assignment";

const adminRoutes = [
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

const userRoutes = [
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

export const Routes = [
  {
    role: "Admin",
    routes: adminRoutes,
  },
  {
    role: "User",
    routes: userRoutes,
  },
];
