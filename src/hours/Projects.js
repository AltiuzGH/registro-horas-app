import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import { ModalForm } from './modals/ModalForm';
import { green } from '@material-ui/core/colors';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import AddAlarmIcon from '@material-ui/icons/AddAlarm';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        margin: 'auto',
        justifyContent: 'center'
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200
    },
    green: {
        color: '#fff',
        backgroundColor: green[500],
    },
    timers: {
        margin: 'auto',
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.5),
        },
    },
    chip: {
        backgroundColor: '#3378af',
        color: 'white'
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
    },
    containerProjects: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export const Projects = () => {

    const classes = useStyles();

    return (
        <React.Fragment>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="xl" className={classes.containerProjects}>
                    <form className={classes.container} noValidate>
                        <TextField
                            id="date"
                            label="Birthday"
                            type="date"
                            defaultValue="2017-05-24"
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </form>
                    <main>
                        <Container className={classes.cardGrid} maxWidth="xl">
                            {/* End hero unit */}
                            <Grid container spacing={4}>
                                {cards.map((card) => (
                                    <Grid item key={card} xs={12} sm={6} md={4}>
                                        <Card className={classes.card}>
                                            <CardMedia
                                                className={classes.cardMedia}
                                                image="https://source.unsplash.com/random"
                                                title="Image title"
                                            />
                                            <CardContent className={classes.cardContent}>
                                                <Typography gutterBottom variant="h5" component="h2">
                                                    Proyecto {card}
                                                </Typography>
                                                <Typography>
                                                    This is a media card. You can use this section to describe the content.
                                        </Typography>
                                                <div className={classes.timers}>
                                                    <Chip
                                                        icon={<AccessTimeIcon className={classes.chip} />}
                                                        label={`HH: ${8}`}
                                                        className={classes.chip}
                                                    />
                                                    <Chip
                                                        icon={<AddAlarmIcon className={classes.chip} />}
                                                        label={`HE: ${2}`}
                                                        className={classes.chip}
                                                    />
                                                </div>
                                            </CardContent>
                                            <CardActions>
                                                <ModalForm name={"Registrar hora"} />
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Container>
                    </main>
                </Container>
            </main>
        </React.Fragment>
    )
}
