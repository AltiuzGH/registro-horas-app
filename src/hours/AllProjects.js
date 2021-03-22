import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import { ModalAssign } from './modals/ModalAssign';


const columns = [
    { id: 'idproj', label: 'Id Proyecto', minWidth: 100, align: 'center' },
    { id: 'proyecto', label: 'Proyecto', minWidth: 110, align: 'center'},
    {
        id: 'cuenta',
        label: 'Cuenta',
        minWidth: 130,
        align: 'center',
    },
    {
        id: 'inicio',
        label: 'Fecha de Inicio',
        minWidth: 140,
        align: 'center',
    },
    {
        id: 'termino',
        label: 'Fecha de Término',
        minWidth: 170,
        align: 'center',
    },
    {
        id: 'estado',
        label: 'Estado',
        minWidth: 170,
        align: 'center',
    },
    {
        id: 'asignar',
        label: 'Asignar/Desasignar',
        minWidth: 170,
        align: 'center',
    },
];

function createData(idproj,proyecto,cuenta, inicio, termino, estado,asignar) {
    return { idproj,proyecto,cuenta, inicio, termino, estado, asignar };
}

const rows = [
    createData('10,000', 'BCH Plataforma', 'Banco de Chile', '05/05/2021','05/07/2021','En Preventa',<ModalAssign />),
    createData('10,325', 'Computec Proj', 'Computec', '05/05/2021','05/07/2021','En Preventa',<ModalAssign />),
    createData('11,250', 'Sura Proj', 'Sura', '05/05/2021','05/07/2021','Finalizado',<ModalAssign />),
    createData('21,333', 'Nexus Proj', 'Nexus', '05/05/2021','05/07/2021','En Preventa',<ModalAssign />),
    createData('12,633', 'CRM Altiuz', 'Altiuz', '05/05/2021','05/07/2021','Finalizado',<ModalAssign />),
    createData('10,755', 'Altiuz Reports', 'Altiuz', '05/05/2021','05/07/2021','En Preventa',<ModalAssign />),
    createData('11,232', 'Lo Valledor', 'Lo Valledor', '05/05/2021','05/07/2021','Finalizado',<ModalAssign />),
    createData('10,222', 'Captación', 'Altiuz', '05/05/2021','05/07/2021','En Preventa',<ModalAssign />),
    createData('10,422', 'Proyecto Interno', 'Altiuz', '05/05/2021','05/07/2021','Finalizado',<ModalAssign />),
    createData('12,333', 'Proyecto Reg', 'Altiuz', '05/05/2021','05/07/2021','En Preventa',<ModalAssign />),
    createData('11,212', 'Historial Proj', 'Altiuz', '05/05/2021','05/07/2021','En Preventa',<ModalAssign />)
];

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 600,
    },
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
    },
    containerProjects: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    appBarSpacer: theme.mixins.toolbar,
    form: {
        '& > *': {
            width: '40ch',
            marginBottom: 20
        },
    },
}));


export const AllProjects = () => {
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

    return (
        <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="xl" className={classes.containerProjects}>
                <form className={classes.form} noValidate autoComplete="off">
                    <TextField id="outlined-basic" label="Filtro por Id" variant="outlined" />
                </form>
                <Paper className={classes.root}>

                    <TableContainer className={classes.container}>
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
                                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {column.format && typeof value === 'number' ? column.format(value) : value}
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
    )
}
