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
import { ModalEdit } from "./modals/ModalEdit";
import Container from '@material-ui/core/Container';

const columns = [
  { id: "proyecto", label: "Proyecto", minWidth: 150 },
  { id: "actividad", label: "Actividad", minWidth: 150 },
  { id: "asunto", label: "Asunto", minWidth: 190 },
  { id: "descripcion", label: "Descripción", minWidth: 190 },
  { id: "fecha", label: "Fecha", minWidth: 150 },
  { id: "horas", label: "Horas", minWidth: 50 },
  { id: "editar", label: "Editar", minWidth: 50 },
];

function createData(
  code,
  proyecto,
  actividad,
  asunto,
  descripcion,
  fecha,
  horas,
  editar
) {
  return {
    code,
    proyecto,
    actividad,
    asunto,
    descripcion,
    fecha,
    horas,
    editar,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: 'flex',
  },
  rootPaper: {
    width: '100%'
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  containerPaper: {
    maxHeight: 800
  },
  fab: {
    backgroundColor: "#3378af",
    color: "white",
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
    marginLeft: 240,
    width: `calc(100% - 240px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }
}));

export const Details = () => {

  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const rows = [
    createData(
      1,
      "Altiuz Report",
      "Desarrollo",
      "Desarrollo componente",
      "Se realiza el desarrollo correspondiente a la lógica de altiuz report",
      "05-02-2021",
      5,
      <ModalEdit />
    ),
    createData(
      2,
      "Computec",
      "Desarrollo",
      "Desarrollo logica",
      "Se desarrolla la lógica del componente de carga de archivos xml",
      "05-02-2021",
      7,
      <ModalEdit />
    ),
    createData(
      3,
      "CM Sura",
      "Documentación",
      "Validacion y doc",
      "Se realiza documentación de los servicios desarrollados",
      "05-02-2021",
      8,
      <ModalEdit />
    ),
    createData(
      4,
      "OD Loader Nexus",
      "Pruebas",
      "Pruebas generales",
      "Se realizan pruebas para validar los servicios modificados",
      "05-02-2021",
      7,
      <ModalEdit />
    ),
  ];

  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="xl" className={classes.container}>
        <Paper className={classes.rootPaper}>
          <TableContainer className={classes.containerPaper}>
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
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
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
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
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
