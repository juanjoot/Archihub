import { useState, useEffect } from 'react';
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ItemDocumento from './ItemDocumento'
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { makeStyles } from '@material-ui/core/styles'
import VisibilityIcon from '@mui/icons-material/Visibility';
import LinkIcon from '@mui/icons-material/Link';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
    },
}))

const useStyles2 = makeStyles((theme) => ({
    icon: {
        color: theme.palette.primary.main,

        '&.dark': {
            color: 'white'
        }
    },
    rotateIcon: {
        color: theme.palette.primary.main,
        transform: "rotate(90deg)",
        '&.dark': {
            color: 'white'
        }
    },
    title: {
        color: theme.palette.primary.main,
        marginLeft: theme.spacing(1),
        '&.dark': {
            color: 'white'
        },
        [theme.breakpoints.down("md")]: {
            fontSize: "1em"
        }
    },
    index: {
        color: theme.palette.primary.main,
        borderRadius: "20px",
        width: "18px",
        height: "25px",
        justifyContent: "center",
        display: "flex",
        alignItems: "flex-start",
        opacity: 0.5,
        fontWeight: "bold",
        marginLeft: theme.spacing(1),
        '&.dark': {
            color: 'white'
        }
    },
    root: {
        padding: 0,
        "&:nth-child(even)": {
            backgroundColor: theme.palette.grey[50],
        },
        "&:last-child": {
            borderBottom: 'none'
        },
        '&.dark': {
            backgroundColor: 'transparent'
        }
    },
    rootFullScreen: {
        padding: 0,
        backgroundColor: theme.palette.grey[50],
    },

    audiolist: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    iconButton: {
        padding: "8px",
    },
    toolBar: {
        minHeight: "5px",
    },
    txtButton: {
        fontSize: 12,
        borderRadius: 100,
        textTransform: 'lowercase',
        boxShadow: 'none',
        background: '#ececec',
        marginRight: 5,

        '&:hover': {
            boxShadow: 'none',
        },

        '& path': {
            fill: '#999'
        },

        '&.dark': {
            background: theme.palette.primary.main,
            color: 'white',
            '& path': {
                fill: 'white'
            }
        }
    }
}))

const Item = props => {
    const classes = useStyles2();
    const [expanded, setExpanded] = useState(false)

    useEffect(() => {
        if (props.viewing === props.index) {
            setExpanded(true);
        } else {
            setExpanded(false);
        }
    }, [props.viewing])

    const seleccionItem = () => {
        if (props.viewing === props.index) {
            props.setViewing(false);
        } else {
            props.setViewing(props.index);
        }
    };

    return (
        <>
            <ListItem
                divider={true}
                dense={true}
                className={
                    `${!props.fullscreen ? classes.root : classes.rootFullScreen} ${props.place === 'conoce' ? 'dark' : ''}`
                }
            >

                <ListItemIcon>
                    {/* <IconButton
                        onClick={seleccionItem}
                        className={classes.iconButton}
                    >
                        {props.viewing !== props.index ? (
                            <AttachFileTwoToneIcon className={`${classes.icon} ${props.place === 'conoce' ? 'dark' : ''}`} />
                        ) : (
                            <AttachFileTwoToneIcon className={`${classes.rotateIcon} ${props.place === 'conoce' ? 'dark' : ''}`} />
                        )}
                    </IconButton> */}
                    <Button
                        variant="contained"
                        size='small'
                        startIcon={<VisibilityIcon />}
                        className={`${classes.txtButton} ${props.viewing !== props.index ? '' : 'dark'}`}
                        onClick={seleccionItem}
                    >
                        Ver documento
                    </Button>
                    {props.record['resource_id'] &&
                        <Button
                            variant="contained"
                            size='small'
                            startIcon={<LinkIcon />}
                            className={classes.txtButton}
                            sx={{ marginLeft: '5px' }}
                            onClick={() => { window.open(`detalle/${props.record['resource_id']}`, '_blank') }}
                        >
                            Ir al recurso
                        </Button>
                    }

                </ListItemIcon>
                <ListItemText>
                    <Toolbar
                        variant="dense"
                        disableGutters={true}
                        className={classes.toolBar}
                    >
                        <Typography className={`${classes.title} ${props.place === 'conoce' ? 'dark' : ''}`}>{props.name}</Typography>
                        {props.lengthRecords > 1 && props.record.type === null && (
                            <Box className={`${classes.index} ${props.place === 'conoce' ? 'dark' : ''}`}>{props.index + 1}</Box>
                        )}
                    </Toolbar>
                </ListItemText>
            </ListItem>

            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <ItemDocumento
                    record={props.record}
                    place={props.place}
                />
            </Collapse>

        </>
    )
}

const ListadoDocumentos = props => {
    const classes = useStyles();

    const [viewing, setViewing] = useState(false);
    const [recordDocument, setRecordDocument] = useState(null);

    useEffect(() => {
        if(props.openFirst){
            setViewing(0)
        }
    }, [props.openFirst])


    useEffect(() => {
        try {
            if (props.piece.resource) {
                let records = props.piece.resource.document.records;
                if (records.length == 1)
                    setRecordDocument(records[0])
            }
        } catch (e) {
            console.log(e)
        }

    }, [props.piece])
    return (
        <>
            <Divider />
            <List className={classes.root} disablePadding component="nav">
                {props.documents.map((r, i) => {
                    return (
                        <>
                            {recordDocument == null ?
                                <Item
                                    viewing={viewing}
                                    record={r}
                                    index={i}
                                    place={props.place}
                                    setViewing={setViewing}
                                    key={i}
                                    name={`${props.name ? props.name : r.type ? r.type : 'Sin nombre'}`}
                                    lengthRecords={props.documents.length}
                                /> : <ItemDocumento
                                    record={recordDocument}
                                    place={props.place}
                                    pieza={props.piece}
                                />}
                        </>
                    )
                })}
            </List>
        </>

    )
}

export default ListadoDocumentos