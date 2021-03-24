import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { HoursCount } from "./charts/HoursCount";
import { ChartMonthHours } from "./charts/ChartMonthHours";
import { LastRegisters } from "./charts/LastRegisters";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    height: "100vh",
    overflow: "auto",
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
  containerProjects: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

export const Statistics = () => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="xl" className={classes.containerProjects}>
        <Grid container spacing={3}>
          {/* Chart */}
          <Grid item xs={12} md={8} lg={9}>
            <Paper className={fixedHeightPaper}>
              <ChartMonthHours />
            </Paper>
          </Grid>
          {/* Horas del mes Registradas */}
          <Grid item xs={12} md={4} lg={3}>
            <Paper className={fixedHeightPaper}>
              <HoursCount />
            </Paper>
          </Grid>
          {/* Ultimos registros realizados */}
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <LastRegisters />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </main>
  );
};
