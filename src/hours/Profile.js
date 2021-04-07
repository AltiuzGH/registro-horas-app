import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { useAuthState } from "../hooks/LoginContext";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  Card: {
    width: "auto",
    margin: "auto",
  },
  title: {
    justifyContent: "center",
    display: "flex",
    marginTop: "10px",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    height: "100vh",
    overflow: "auto",
    width: `calc(100% - 240px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
}));

export const Profile = () => {
  const classes = useStyles();
  const { user } = useAuthState();
  //const {user_name,status,role,it_department,id,full_name,first_name,date_entered } = user;
  console.log(user);
  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="xl" className={classes.container}>
        <Card className={classes.Card}>
          <Typography
            className={classes.title}
            gutterBottom
            variant="h5"
            component="h2"
          >
            Mi Perfil
          </Typography>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <form className={classes.form} noValidate autoComplete="off">
                  <TextField
                    id="outlined-full-width"
                    label="Username"
                    placeholder="Placeholder"
                    defaultValue={user.user_name}
                    fullWidth
                    margin="normal"
                    InputProps={{
                      readOnly: true,
                    }}
                    variant="outlined"
                  />
                  <TextField
                    id="outlined-full-width"
                    label="Nombre Completo"
                    placeholder="Placeholder"
                    defaultValue={user.full_name}
                    fullWidth
                    margin="normal"
                    InputProps={{
                      readOnly: true,
                    }}
                    variant="outlined"
                  />
                  <TextField
                    id="outlined-full-width"
                    label="Email"
                    placeholder="test@gmail.com"
                    defaultValue={user.email}
                    fullWidth
                    margin="normal"
                    InputProps={{
                      readOnly: true,
                    }}
                    variant="outlined"
                  />
                </form>
              </Grid>
              <Grid item xs={12} sm={6}>
                <form className={classes.form} noValidate autoComplete="off">
                  <TextField
                    id="outlined-full-width"
                    label="Departamento"
                    placeholder="Placeholder"
                    defaultValue={user.it_department}
                    fullWidth
                    margin="normal"
                    InputProps={{
                      readOnly: true,
                    }}
                    variant="outlined"
                  />
                  <TextField
                    id="outlined-full-width"
                    label="Rol"
                    placeholder="Placeholder"
                    defaultValue={user.role}
                    fullWidth
                    margin="normal"
                    InputProps={{
                      readOnly: true,
                    }}
                    variant="outlined"
                  />
                  <TextField
                    id="outlined-full-width"
                    label="Status"
                    placeholder="Placeholder"
                    defaultValue={user.status}
                    fullWidth
                    margin="normal"
                    InputProps={{
                      readOnly: true,
                    }}
                    variant="outlined"
                  />
                </form>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </main>
  );
};
