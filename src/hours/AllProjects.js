import React, { useState, useEffect } from "react";
import {
  Paper,
  makeStyles,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  InputAdornment,
  LinearProgress,
  Card,
  CardActions,
  CardContent,
  Typography,
  Container,
} from "@material-ui/core";
import useTable from "../components/UseTable";
import ProjectsService from "../services/project.service";
import Controls from "../components/controls/Controls";
import { ModalAssign } from "./modals/ModalAssign";
import { Search } from "@material-ui/icons";
import { useMediaPredicate } from "react-media-hook";

const useStyles = makeStyles((theme) => ({
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  root: {
    minWidth: 250,
    marginTop: "10px",
  },
  containerProjects: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  searchInput: {
    width: "100%",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  progress: {
    margin: "2%",
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

const headCells = [
  { id: "id_project_c", label: "Id Proyecto", minWidth: 100, align: "center" },
  { id: "name", label: "Proyecto", minWidth: 110, align: "center" },
  {
    id: "cuenta_p_c",
    label: "Cuenta",
    minWidth: 130,
    align: "center",
  },
  {
    id: "estimated_end_date",
    label: "Fecha de Inicio",
    minWidth: 140,
    align: "center",
  },
  {
    id: "estimated_start_date",
    label: "Fecha de Término",
    minWidth: 170,
    align: "center",
  },
  {
    id: "status",
    label: "Estado",
    minWidth: 170,
    align: "center",
  },
  {
    id: "asignar",
    label: "Asignar/Desasignar",
    minWidth: 170,
    align: "center",
  },
];

export const AllProjects = () => {
  const biggerThan400 = useMediaPredicate("(min-width: 400px)");
  const classes = useStyles();
  const [records, setRecords] = useState([]);
  const [progress, setProgress] = useState(true);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  useEffect(() => {
    getProjects();
  }, []);

  const getProjects = () => {
    ProjectsService.getAll()
      .then((response) => {
        const projectAssign = response.data.map(function (item) {
          item.asignar = <ModalAssign />;
          return item;
        });
        setRecords(projectAssign);
        setProgress(false);
      })
      .catch((e) => {
        setProgress(false);
      });
  };

  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting,
  } = useTable(records, headCells, filterFn);

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value === "") {
          return items;
        } else {
          const data = items.filter(
            (x) =>
              x.id_project_c.toLowerCase().includes(target.value) ||
              x.cuenta_p_c.toLowerCase().includes(target.value) ||
              x.name.toLowerCase().includes(target.value) ||
              x.estimated_start_date.toLowerCase().includes(target.value) ||
              x.estimated_end_date.toLowerCase().includes(target.value)
          );
          return data;
        }
      },
    });
  };

  return (
    <>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        {biggerThan400 && (
          <Paper className={classes.pageContent}>
            <Toolbar>
              <Controls.Input
                label="Buscar en proyectos"
                className={classes.searchInput}
                name="id_project_c"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
                onChange={handleSearch}
              />
            </Toolbar>

            {progress && <LinearProgress className={classes.progress} />}
            <TblContainer>
              <TblHead />
              <TableBody>
                {recordsAfterPagingAndSorting().map((item) => (
                  <TableRow key={item.id_project_c}>
                    <TableCell>{item.id_project_c}</TableCell>
                    <TableCell>{item.cuenta_p_c}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.estimated_start_date}</TableCell>
                    <TableCell>{item.estimated_end_date}</TableCell>
                    <TableCell>{item.status}</TableCell>
                    <TableCell>{item.asignar}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </TblContainer>
            <TblPagination />
          </Paper>
        )}
        <div>
          {!biggerThan400 && (
            <div>
              <Container maxWidth="xl" className={classes.containerProjects}>
                <form className={classes.container} noValidate>
                  <Toolbar>
                    <Controls.Input
                      label="Buscar en proyectos"
                      className={classes.searchInput}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Search />
                          </InputAdornment>
                        ),
                      }}
                      onChange={handleSearch}
                    />
                  </Toolbar>
                </form>
                {progress && <LinearProgress className={classes.progress} />}
                {recordsAfterPagingAndSorting().map((project) => (
                  <Card className={classes.root} key={project.id}>
                    <CardContent>
                      <Typography variant="h5" component="h2">
                        {project.id_project_c}
                      </Typography>
                      <Typography
                        className={classes.title}
                        color="textSecondary"
                        gutterBottom
                      >
                        {project.name}
                      </Typography>
                      <Typography className={classes.pos} color="textSecondary">
                        {project.status}
                      </Typography>
                      <Typography className={classes.pos} color="textSecondary">
                        {project.estimated_end_date} -{" "}
                        {project.estimated_start_date}
                      </Typography>
                    </CardContent>
                    <CardActions>{project.asignar}</CardActions>
                  </Card>
                ))}
              </Container>
            </div>
          )}
        </div>
      </main>
    </>
  );
};
