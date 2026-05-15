import React, { useState, useEffect } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Collapse from "@material-ui/core/Collapse";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import Box from "@material-ui/core/Box";
import Radio from "@material-ui/core/Radio";
import ReproductorAudio from "./ReproductorAudio";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import LinkIcon from '@mui/icons-material/Link';

const useStyles = makeStyles((theme) => ({
  chipTime: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.down("md")]: {
      display: 'none'
    }
  },
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
}));

const ItemAudio = (props) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [autoplaying, setAutoPlaying] = useState(false);

  let lecturaAudio = props.lectura;
  if (typeof lecturaAudio === "undefined") lecturaAudio = true;

  useEffect(() => {
    if (props.playing === props.index) {
      setExpanded(true);
    } else {
      setExpanded(false);
    }
  }, [props.playing]);

  useEffect(() => {
    if (props.place === "crea" && !lecturaAudio) {
      if (!props.playing) {
        props.setPlaying(0);
      }
      setAutoPlaying(false);
    }
    if (props.place === "crea" && lecturaAudio) {
      setAutoPlaying(true);
    } else if (props.place === "explora") {
      setAutoPlaying(true);
    } else if (
      props.place === "conoce" &&
      typeof props.pieza.path === "undefined"
    ) {
      setAutoPlaying(true);
    } else {
      setAutoPlaying(false);
    }
  }, []);

  const seleccionItem = () => {
    if (props.playing === props.index) {
      props.setPlaying(false);
    } else {
      props.setPlaying(props.index);
    }
  };

  return (
    <>
      {props.place === "conoce" && typeof props.pieza.path !== "undefined" ? (
        <>
          {props.playing === props.index ? (
            <>
              <ReproductorAudio
                record={props.record}
                ident={props.record.ident}
                lectura={lecturaAudio}
                modificacionPieza={props.modificacionPieza}
                pieza={props.pieza}
                autoplaying={autoplaying}
              />
            </>
          ) : null}
        </>
      ) : (
        <>
          <ListItem
            divider={true}
            dense={true}
            className={
              `${!props.fullscreen ? classes.root : classes.rootFullScreen} ${props.place === 'conoce' ? 'dark' : ''}`
            }
          >
            <ListItemIcon>
              {lecturaAudio ? (
                <>

                  <Button
                    variant="contained"
                    size='small'
                    startIcon={props.playing !== props.index ? <PlayArrowIcon /> : <StopIcon />}
                    className={`${classes.txtButton} ${props.playing !== props.index ? '' : 'dark'}`}
                    onClick={seleccionItem}
                  >
                    {props.playing !== props.index ? 'Reproducir' : 'Detener'}
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
                </>
              ) : (
                <>
                  {props.playing !== props.index ? (
                    <Radio
                      onClick={seleccionItem}
                      checked={false}
                      color="secondary"
                      inputProps={{ "aria-label": "primary checkbox" }}
                    />
                  ) : (
                    <Radio
                      onClick={seleccionItem}
                      checked={true}
                      color="secondary"
                      inputProps={{ "aria-label": "primary checkbox" }}
                    />
                  )}
                </>
              )}
            </ListItemIcon>
            <ListItemText>
              <Toolbar
                variant="dense"
                disableGutters={true}
                className={classes.toolBar}
              >
                {/* <Chip
                  variant="outlined"
                  className={classes.chipTime}
                  size="small"
                  label={`00:00:00`}
                /> */}
                <Typography className={`${classes.title} ${props.place === 'conoce' ? 'dark' : ''}`}>{props.name}</Typography>
                {props.lengthRecords > 1 && props.record.type === null && (
                  <Box className={`${classes.index} ${props.place === 'conoce' ? 'dark' : ''}`}>{props.index + 1}</Box>
                )}
              </Toolbar>
            </ListItemText>
          </ListItem>

          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <div className={classes.audiolist}>
              <ReproductorAudio
                record={props.record}
                ident={props.record.ident}
                lectura={lecturaAudio}
                modificacionPieza={props.modificacionPieza}
                pieza={props.pieza}
                autoplaying={autoplaying}
              />
            </div>
          </Collapse>
        </>
      )}
    </>
  );
};

export default ItemAudio;
