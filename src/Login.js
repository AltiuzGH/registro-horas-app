import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Logo from "../src/assets/company_logo.png";
import AltiuzBackGround from "../src/assets/altiuz.jpg";
import { useForm } from "./hooks/useForm";
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";
import { useAuthDispatch, useAuthState } from "./hooks/LoginContext";
import { loginUser } from "./hooks/LoginActions";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: `url(${AltiuzBackGround})`,
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  img: {
    marginBottom: 19,
    height: 37,
  },
  loading: {
    color: "white",
  },
}));

export const Login = ({ history }) => {
  const [formValues, handleInputChange] = useForm({
    username: "",
    password: "",
  });

  const dispatch = useAuthDispatch();
  const { loading } = useAuthState();

  const { username, password } = formValues;

  const userRoles = ["OPER-Team"];
  const adminRoles = ["OPER-Lideres"];

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const resLogin = await loginUser(dispatch, { username, password });
      if (!resLogin) return;
      const { role } = resLogin;
      if (adminRoles.includes(role)) {
        localStorage.setItem("role", "admin");
      } else if (userRoles.includes(role)) {
        localStorage.setItem("role", "user");
      } else {
        throw new Error("Invalid Role");
      }
      return;
    } catch (error) {
      console.log(error.message);
    }
  };

  const classes = useStyles();
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <img src={Logo} className={classes.img} alt="Logo Altiuz" />
          <Typography component="h1" variant="h5">
            Chronos
          </Typography>
          <form className={classes.form} onSubmit={handleLogin}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="User"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={handleInputChange}
              disabled={loading}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={handleInputChange}
              disabled={loading}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {loading && (
                <CircularProgress size={24} className={classes.loading} />
              )}
              {loading && "Cargando"}
              {!loading && "Sign In"}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
      <NotificationContainer />
    </Grid>
  );
};
