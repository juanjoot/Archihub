import { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";

import SwipeableDrawer from "@material-ui/core/Drawer";
import TituloSeccion from "./TituloSeccion";
import ImageTwoToneIcon from "@material-ui/icons/ImageTwoTone";
import KeyboardArrowDownTwoToneIcon from "@material-ui/icons/KeyboardArrowDownTwoTone";
import IconButton from "@material-ui/core/IconButton";
import TabsGalleryCrea from "./TabsGalleryCrea";
import RecursosSeleccionados from "./RecursosSeleccionados";
import { useTranslation } from "react-i18next";
// import ImageTwoToneIcon from '@material-ui/icons/ImageTwoTone';


const useStyles = makeStyles((theme) => ({
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
    height: "70vh",
    marginLeft: "30px",
    marginRight: "25px",
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
  textoFormulario: {
    color: theme.palette.primary.main,
  },
  agregarImagen:{
    position: "fixed",
    top: "30vh",
    //top: "10px",
    left: "50%",
    transform: "translate(-50%, 0)",
    width: "100%"
  }
}));

const DrawerImagen = (props) => { 
  const [t, i18n] = useTranslation("common");
  const { abrir, handlerCerrar, handlerImageSelected} = props;
  const [openMenu, setOpenMenu] = useState(false);
  const classes = useStyles();
  const [titleSection, setTitleSection] = useState(t("crea.narrativeManager.titlePage.titleSelectorImage"));
  const [GalleryRecordSelected, setGalleryRecordSelected] = useState();
  const [GalleryResourceSelected, setGalleryResourceSelected] = useState();
  const [abrirSeleccion, setAbrirSeleccion] = useState(false);
  
  

    useEffect(() => {
      if (abrir) {
        setOpenMenu(abrir);
        setAbrirSeleccion(false);
      }
    }, [abrir])
  


    const toggleDrawer = (open) => (event) => {
      if (
        event &&
        event.type === "keydown" &&
        (event.key === "Tab" || event.key === "Shift")
      ) {
        return;
      }
      setOpenMenu(open);
      listenerCloseButton(open);
    };

  const handleCloseButton = (event) => {
    setOpenMenu(false);
    listenerCloseButton(false);
  };

  const listenerCloseButton = (estado) => {
    if(!estado){
      handlerCerrar();
    } 
  };

  const updateDataGallery = (record, resource) =>{
    setGalleryRecordSelected(record)
    setGalleryResourceSelected(resource)

    if (typeof record !== 'undefined' && resource !== 'undefined' ) 
      setAbrirSeleccion(true)
  }
  
  const handleCancelarImagenes = () =>{
      setAbrirSeleccion(false);
    //  setOpenMenu(false);
  }
  
  const handleAgregarImagenes = () =>{
    setAbrirSeleccion(false);
    setOpenMenu(false);
    
    let resource = {}
    resource = GalleryResourceSelected
    let record = {}
    record = GalleryRecordSelected
    let path = GalleryRecordSelected.filename
 
    if(handlerImageSelected)
      handlerImageSelected(resource, record, path);
  }
  
  return (
   
      <SwipeableDrawer
        open={openMenu}
        PaperProps={{
          style: { borderTopLeftRadius: 24, borderTopRightRadius: 24 },
        }}
        anchor="bottom"
        onClose={toggleDrawer(false)}>     

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
            texto={titleSection}
            iconoTema={ImageTwoToneIcon}
          />
        </div>      
            <TabsGalleryCrea updateDataGallery={updateDataGallery} />
         
      </div>
      {abrirSeleccion ? 
      <div className={classes.agregarImagen}>
          <RecursosSeleccionados  className={classes.agregarImagen} handleCancel={handleCancelarImagenes} handleAggregate={handleAgregarImagenes} selected={1} />
          </div>
        :null}
    </SwipeableDrawer> 
  );
};

export default (DrawerImagen);

/*onClick={toggleDrawer(anchor, false)}
    onKeyDown={toggleDrawer(anchor, false)}*/
