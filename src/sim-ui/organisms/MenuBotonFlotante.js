import { useState } from "react";
import * as React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import Drawer from "@material-ui/core/Drawer";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import withWidth, { isWidthDown } from "@material-ui/core/withWidth";


import Typography from "@material-ui/core/Typography";
import AddCircleTwoToneIcon from "@material-ui/icons/AddCircleTwoTone";
import FolderSpecialTwoToneIcon from "@material-ui/icons/FolderSpecialTwoTone";
import TituloSeccion from "./TituloSeccion";
import ImageTwoToneIcon from "@material-ui/icons/ImageTwoTone";
import PhotoLibraryTwoToneIcon from '@material-ui/icons/PhotoLibraryTwoTone';
import SurroundSoundTwoToneIcon from '@material-ui/icons/SurroundSoundTwoTone';
import FormatSizeTwoToneIcon from "@material-ui/icons/FormatSizeTwoTone";
import QueuePlayNextTwoToneIcon from '@material-ui/icons/QueuePlayNextTwoTone';
import MovieFilterTwoToneIcon from '@material-ui/icons/MovieFilterTwoTone';
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import Grid from "@material-ui/core/Grid";
import KeyboardArrowDownTwoToneIcon from "@material-ui/icons/KeyboardArrowDownTwoTone";
import IconButton from "@material-ui/core/IconButton";
// import ImageTwoToneIcon from '@material-ui/icons/ImageTwoTone';

import { useTranslation } from "react-i18next";

const ToggleButtonVerticalGroup = withStyles((theme) => ({
  groupedVertical: {
    color: theme.palette.primary.main,
    textTransform: "none",
    width: "150px",
    margin: "10px",
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: "4px",
    padding: "2px",
    justifyContent: "left",
    "&:not(:first-child)": {
      border: `1px solid ${theme.palette.primary.main}`,
      borderRadius: "4px",
      padding: "2px",
    },
    "&:not(:last-child)": {
      border: `1px solid ${theme.palette.primary.main}`,
      borderRadius: "4px",
      padding: "2px",
    },
  },
}))(ToggleButtonGroup);

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "fixed",
    bottom: theme.spacing(8),
    right: theme.spacing(3),
  },
  fabMobile: {
    position: "fixed",
    bottom: theme.spacing(16),
    right: theme.spacing(3),
  },
  fullList: {
    width: "auto",
  },
  list: {
    width: "100%",
  },
  bottomPush: {
    position: "fixed",
    bottom: 0,
    textAlign: "center",
    paddingBottom: 10,
  },
  containerItem: {
    height: theme.spacing(5),
  },
  containerButton: {
    position: "relative",
    width: "100%",
  },
  centerButton: {
    margin: 0,
    position: "absolute",
    top: "50%",
    "-ms-transform": "translateY(-50%)",
    transform: "translateY(-50%)",
  },
  contenedorOpciones: {
    height: "350px",
    marginLeft: "30px",
    marginTop: "25px",
  },
  contenedorTitulo: {
    marginBottom: "15px",
  },

  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    // backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      // backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  bloqueFormulario: {
    marginTop: "5px",
    marginBottom: "5px",
    width: "100%",
  },
  selectedToogle: {
    color: "none",
  },
  button: {
    color: theme.palette.primary.main,
    textTransform: "none",
    width: "180px",
    marginLeft: "10px",
    justifyContent: "left",
  },

  close: {
    position: "absolute",
    top: "20px",
    padding: "3px",
    right: "40px",
    color: theme.palette.primary.main,
  },
  TextoFormulario: {
    color: theme.palette.primary.main,
  },
}));

const MenuBotonFlotante = (props) => {
  const [openMenu, setOpenMenu] = React.useState(false);
  const classes = useStyles();
  const {handleMenu, handleClickButton } = props;
  const [tipoFuente, setTipoFuente] = useState("biblioteca");
  const [t, i18n] = useTranslation("common");

  
  const handleClick = (event) => {
    if (handleClickButton != null) handleClickButton(event);
    setOpenMenu(true);
   
  };


  const handleItemClick = (item,tipoRecurso) => {
    handleMenu(item,tipoRecurso,tipoFuente);
    setOpenMenu(false);
  };
  

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpenMenu(open);
  };

  const handleCloseButton = (event) => {
    setOpenMenu(false);
  };



  return (
    <div>
      <Fab
        aria-controls="customized-menu"
        aria-haspopup="true"
        color="secondary"
        size="medium"
        className={
          isWidthDown("md", props.width) ? classes.fabMobile : classes.fab
        }
        onClick={handleClick}
      >
        <AddIcon />
      </Fab>
      <Drawer
        open={openMenu}
        PaperProps={{
          style: { borderTopLeftRadius: 24, borderTopRightRadius: 24 },
        }}
        anchor="bottom"
        onClose={toggleDrawer(false)}
      >
        {/*listMenu()onClick={}*/}
        <div className={classes.contenedorOpciones}>
          <IconButton
            aria-label="settings"
            onClick={handleCloseButton}
            className={classes.close}
          >
            <KeyboardArrowDownTwoToneIcon size="small" />
          </IconButton>
          <div className={classes.contenedorTitulo}>
            <TituloSeccion
              texto={"Agregar recurso"}
              iconoTema={ AddCircleTwoToneIcon  }
            />
          </div>

         
            <div>
            
              <Grid
                className={classes.bloqueFormulario}
                container
                wrap="nowrap"
                spacing={1}
              >
                <Typography
                  className={classes.TextoFormulario}
                  variant="subtitle1"
                >
                  Tipo de recurso
                </Typography>
              </Grid>
              
              <Grid
                className={classes.bloqueFormulario}
                container
                wrap="nowrap"
                spacing={2}
              >
                <Button
                  onClick={(event) => handleItemClick(0,"recurso")}
                  className={classes.button}
                  variant="outlined"
                  startIcon={<FolderSpecialTwoToneIcon />}
                >
                  Referencia a recurso
                </Button>
              </Grid>
              <Grid
                className={classes.bloqueFormulario}
                container
                wrap="nowrap"
                spacing={2}
              >
                <Button
                  onClick={(event) => handleItemClick(0, "imagen")}
                  className={classes.button}
                  variant="outlined"
                  startIcon={<ImageTwoToneIcon />}
                >
                  Imagen
                </Button>
              </Grid>
              <Grid
                className={classes.bloqueFormulario}
                container
                wrap="nowrap"
                spacing={2}
              >
                <Button
                  onClick={(event) => handleItemClick(0, "galeria")}
                  className={classes.button}
                  variant="outlined"
                  startIcon={<PhotoLibraryTwoToneIcon />}
                >
                  Galeria fotográfica
                </Button>
              </Grid>
              <Grid
                className={classes.bloqueFormulario}
                container
                wrap="nowrap"
                spacing={2}
              >
                <Button
                  onClick={(event) => handleItemClick(0, "audio")}
                  className={classes.button}
                  variant="outlined"
                  startIcon={<SurroundSoundTwoToneIcon />}
                >
                  Fragmento de audio
                </Button>
               
              </Grid>

              <Grid
                className={classes.bloqueFormulario}
                container
                wrap="nowrap"
                spacing={2}
              >                
              <Button
                  onClick={(event) => handleItemClick(0, "video")}
                  className={classes.button}
                  variant="outlined"
                  startIcon={<MovieFilterTwoToneIcon />}
                >
                  Fragmento de video
                </Button>
              </Grid>


              <Grid
                className={classes.bloqueFormulario}
                container
                wrap="nowrap"
                spacing={2}
              >                
              <Button
                  onClick={(event) => handleItemClick(0, "documento")}
                  className={classes.button}
                  variant="outlined"
                  startIcon={<MovieFilterTwoToneIcon />}
                >
                  Fragmento de texto
                </Button>
              </Grid>

              <Grid
                className={classes.bloqueFormulario}
                container
                wrap="nowrap"
                spacing={2}
              >

              <Button
                  onClick={(event) => handleItemClick(0, "recurso_externo")}
                  className={classes.button}
                  variant="outlined"
                  startIcon={<QueuePlayNextTwoToneIcon />}
                >
                  {t("crea.narrativeManager.resources.resourceExternal")}
                </Button>
                </Grid>

              <Grid
                className={classes.bloqueFormulario}
                container
                wrap="nowrap"
                spacing={2}
              >
                <Button
                  onClick={(event) => handleItemClick(1, "texto")}
                  className={classes.button}
                  variant="outlined"
                  startIcon={<FormatSizeTwoToneIcon />}
                >
                  Texto Narrativo
                </Button>
              </Grid>

            
            </div>
          
        </div>
      </Drawer>

      {/*
     
     anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}
     <Menu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {(() => {
          let options = [];
          for (let i = 0; i < menuOptions.length; i++) {
            const optionMenu = menuOptions[i];
            let oppObject = (<MenuItem key={optionMenu.id} onClick={(event) => handleItemClick(optionMenu, event)}>
              <ListItemText primary={optionMenu.name} />
            </MenuItem>)
            if (!optionMenu.enabled) {
              oppObject = (<MenuItem disabled key={optionMenu.id} onClick={(event) => handleItemClick(optionMenu, event)}>
                <ListItemText primary={optionMenu.name} />
              </MenuItem>)
            }
            options.push(oppObject);
          }

          return options;
        })()}
      </Menu>*/}
    </div>
  );
};

export default withWidth()(MenuBotonFlotante);

/*onClick={toggleDrawer(anchor, false)}
    onKeyDown={toggleDrawer(anchor, false)}*/
