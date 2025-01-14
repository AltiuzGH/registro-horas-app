import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import { ModalConfirmation } from "./modals/ModalConfirmation";
import { ModalProjects } from "./modals/ModalProjects";
import WorkerService from "../services/worker.service";
import { useState } from "react";
import { useEffect } from "react";
import LinearProgress from "@material-ui/core/LinearProgress";

const columns = [
  { id: "first_name", label: "Nombre", minWidth: 100, align: "center" },
  { id: "last_name", label: "Apellido", minWidth: 110, align: "center" },
  {
    id: "email",
    label: "Email",
    minWidth: 130,
    align: "center",
  },
  {
    id: "status",
    label: "Estado del Empleado",
    minWidth: 140,
    align: "center",
  },
  {
    id: "proyectos",
    label: "Proyectos",
    minWidth: 170,
    align: "center",
  },
  {
    id: "activar",
    label: "Activar/Desactivar",
    minWidth: 170,
    align: "center",
  },
];

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 600,
  },
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
  containerProjects: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  appBarSpacer: theme.mixins.toolbar,
  form: {
    "& > *": {
      width: "40ch",
      marginBottom: 20,
    },
  },
}));

export const Workers = () => {
  const classes = useStyles();
  const [workers, setWorkers] = useState([]);
  const [progress, setProgress] = useState(true);

  useEffect(() => {
    getWorkers();
  }, []);

  const getWorkers = () =>{
      WorkerService.getAll()
      .then((response) => {
          const allWorkers = response.data.map(function (item){
            item.proyectos = <ModalProjects />;
            item.activar = <ModalConfirmation />;
            return item;
          });
          setWorkers(allWorkers);
          setProgress(false);
      })
      .catch((e) =>{
        console.log(e);
        setProgress(false);
      });
  };



  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="xl" className={classes.containerProjects}>
        <form className={classes.form} noValidate autoComplete="off">
          <TextField
            id="outlined-basic"
            label="Filtro por Nombre"
            variant="outlined"
          />
        </form>
        <Paper className={classes.root}>
          <TableContainer className={classes.container}>
           {progress && <LinearProgress />}
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {workers
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) =>{
                    return(
                      <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.id}
                      >
                      {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                      })}
                      </TableRow>
                    );
                  })
                }
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={workers.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      </Container>
    </main>
  );
};
