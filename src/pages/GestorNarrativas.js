import { useReducer, useEffect, useState, useRef } from "react";
import * as React from "react";
import { connect } from "react-redux";
import * as museo from "../store/ducks/museo.duck";
import { Navigate } from "react-router-dom";

import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import MobileStepper from "@material-ui/core/MobileStepper";
import Fab from "@material-ui/core/Fab";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import AddIcon from "@material-ui/icons/Add";
import Visibility from "@material-ui/icons/Visibility";
import Save from "@material-ui/icons/Save";
import CheckIcon from "@material-ui/icons/Check";
import CircularProgress from "@material-ui/core/CircularProgress";
import { green } from "@material-ui/core/colors";

import MainLayout from "../sim-ui/layout/MainLayout";
import MenuBotonFlotante from "../sim-ui/organisms/MenuBotonFlotante";
import ContenedorColeccion from "../sim-ui/organisms/ContenedorColeccion";
import DescripcionColeccion from "../sim-ui/organisms/DescripcionColeccion";
import CaracteristicasColeccion from "../sim-ui/organisms/CaracteristicasColeccion";
import VistaColeccion from "../sim-ui/organisms/VistaColeccion";
import DrawerImagen from "../sim-ui/organisms/DrawerImagen";

import withWidth, { isWidthDown } from "@material-ui/core/withWidth";
import Biblioteca from "../sim-ui/organisms/bloqueBusqueda/Biblioteca";
import * as CollectionService from "../services/CollectionService";

import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    margin: theme.spacing(1),
  },
  fabSaveCheck: {
    color: "white",
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700],
    },
    position: "absolute",
    bottom: theme.spacing(14),
    right: theme.spacing(3),
    zIndex: 1000,
  },
  fabProgress: {
    color: green[500],
    position: "absolute",
    bottom: "109px",
    right: "20px",
    zIndex: 1000,
  },

  content: {
    minHeight: "100%",
    overflow: "auto",
    width: "100%",
  },
  fabVisibility: {
    position: "fixed",
    bottom: theme.spacing(22),
    right: theme.spacing(3),
    zIndex: 1000,
  },
  fabSave: {
    position: "fixed",
    bottom: theme.spacing(14),
    right: theme.spacing(3),
    zIndex: 1000,
  },
  textoGestor: {
    marginBottom: "1.5em",
  },
  stepperMobile: {
    bottom: theme.spacing(9),
  },

  stepperRoot: {
    height: "32px",
    " button": {
      minWidth: "32px",
    },
  },
  stepperProgress: {
    width: "100%",
    height: "15px",
    borderWidth: "5px",
    borderColor: theme.palette.secondary.main,
    borderStyle: "solid",
    borderRadius: "18px",
    backgroundColor: "#fafafa",
    "& .MuiLinearProgress-colorPrimary": {
      backgroundColor: "#fafafa",
    },
  },
  contenedorGestor: {
    marginTop: "-16px",
    marginBottom: "120px",
  },
}));

function getSteps() {
  return ["1. Descripción ", "2. Contenido ", "3. Caracterización"];
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const GestorNarrativas = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const tarjetasColeccionesRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [tipoRecurso, setTipoRecurso] = useState("");
  const [openImageSelect, setOpenImageSelect] = useState(false);

  const [abrirVista, setAbrirVista] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [messageAlert, setMessageAlert] = useState("");
  const [duration, setDuration] = useState(2000);

  const [typeAlert, setTypeAlert] = useState("");
  const [successSave, setSuccessSave] = useState(false);
  const [redirectMuseo, setNavigateMuseo] = useState(false);
  const [nuevasClavesExtras, setNuevasClavesExtras] = useState([]);
  const [loadingSave, setLoadingSave] = React.useState(false);
  const steps = getSteps();
  const initCollection = {
    cards: [],
    locations_resources: [],
    geographicCoverage: [],
    keywords: [],
    keywords_resources: [],
    temporalCoverage: {},
    place_creation: {},
    type_author: "",
    author: "",
    area_author: null,
    mandate: null,
    topic: null,
    category: "",
    type: "",
    cover_page: {},
    title: "",
    description: "",
    user: "",
  };
  const {
    user,
    setActiveStepCrea,
    activeStepCrea,
    setOpenLienzoCrea,
    activeCollection,
    setActiveCollection,
  } = props;

  let min = 1890;
  let max = 2021;
  let tiempol = {};
  const [value, setValue] = React.useState([]);

  const handleChange = (event, newValue) => {
    modifyActiveCollection({
      temporalCoverage: {
        start: newValue[0] + "-01-01",
        end: newValue[1] + "-01-01",
      },
    });
    setValue(newValue);
  };

  setOpenLienzoCrea(true);

  useEffect(() => {
    if (tarjetasColeccionesRef.current != null)
      tarjetasColeccionesRef.current.updateCards(activeCollection["cards"]);
  });

  useEffect(() => {
    if (activeCollection === null) setActiveCollection(initCollection);
  }, []);

  const modifyActiveCollection = (modifyCollection) => {
    const newCollection = { ...activeCollection };
    for (let p in modifyCollection) {
      if (p === "cards")
        newCollection[p] = recalcularOrden(modifyCollection[p]);
      else newCollection[p] = modifyCollection[p];
    }
    setActiveCollection(newCollection);
  };

  const buildCollection = () => {
    let collection = { ...activeCollection };
    collection = transformKeywords(collection);
    collection["user"] = user._id;
    return collection;
  };

  const transformKeywords = (collection) => {
    const keywords = collection["keywords"];
    var keywordslower = [];
    for (var i = 0; i < keywords.length; i++) {
      keywordslower.push(keywords[i].toLowerCase());
    }
    collection["keywords"] = keywordslower;

    const keywords_resources = collection["keywords_resources"];
    var keywordslower_resources = [];
    for (var i = 0; i < keywords_resources.length; i++) {
      keywordslower_resources.push(keywords_resources[i].toLowerCase());
    }
    collection["keywords_resources"] = keywordslower_resources;
    return collection;
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
    setMessageAlert("");
    setTypeAlert("");
    if (successSave) {
      setNavigateMuseo(true);
      modifyActiveCollection(initCollection);
      setActiveStepCrea(0);
    }
  };

  const alertMessage = (type, message, duration) => {
    setOpenAlert(true);
    setTypeAlert(type);
    setMessageAlert(message);
    setDuration(duration);
  };

  const handleNext = () => {
    console.log("next", activeStepCrea);
    if (activeStepCrea === 0) {
      let val = validacionCamposDescripcion();
      if (!val["validacion"]) {
        alertMessage("error", val["mensaje"], 6000);
      } else {
        setActiveStepCrea(activeStepCrea + 1);
      }
    } else {
      if (!openAlert) {
        setActiveStepCrea(activeStepCrea + 1);
      }
    }

    if (activeStepCrea === 1) {
      let tiempo = activeCollection["temporalCoverage"];

      if (Array.isArray(tiempo)) {
        tiempol = tiempo[0];
      } else {
        tiempol = tiempo;
      }

      let start =
        "start" in tiempol
          ? new Date(Date.parse(tiempol["start"])).getFullYear()
          : min;
      let end =
        "end" in tiempol
          ? new Date(Date.parse(tiempol["end"])).getFullYear()
          : max;

      setValue([parseInt(start), parseInt(end)]);
    }
  };

  const handleBack = () => {
    if (!openAlert) {
      setActiveStepCrea(activeStepCrea - 1);
    }
  };

  const handleMenu = (item, tipo, fuente) => {
    if (item === 0) {
      setTipoRecurso(tipo);
      if (fuente === "biblioteca") {
        if (tipo === "recurso_externo") agregarEnlaceVideoALienzo();
        else if (tipo === "imagen") setOpenImageSelect(true);
        else setOpen(true);
      }
    } else if (item === 1) {
      agregarTextoALienzo();
    }
  };

  const handleClickVisibility = () => {
    if (!openAlert) {
      setAbrirVista(true);
    }
  };

  const handleClickSave = () => {
    setLoadingSave(true);
    if (!openAlert) {
      const collection = buildCollection();

      if (typeof collection._id === "undefined") {
        CollectionService.create(collection)
          .then((data) => {
            alertMessage(
              "success",
              "Su colección se ha guardado satisfactoriamente",
              2000,
            );
            setSuccessSave(true);
            setLoadingSave(false);
          })
          .catch((err) => {
            alertMessage(
              "error",
              "Se presento un error almacenando la colección",
              2000,
            );
            setLoadingSave(false);
            console.log("Error ", err);
          });
      } else {
        CollectionService.update(collection._id, collection)
          .then((data) => {
            alertMessage(
              "success",
              "Los cambios en la colección se han guardado satisfactoriamente",
              2000,
            );
            setSuccessSave(true);
            setLoadingSave(false);
          })
          .catch((err) => {
            alertMessage(
              "error",
              "Se presento un error actualizando la colección",
              2000,
            );
            setLoadingSave(false);
            console.log("Error ", err);
          });
      }
    }
  };

  const handleChangeCategoria = (categoria) => {
    if (categoria !== "") modifyActiveCollection({ category: categoria });
  };

  const handleDeleteKeywordsResources = (claves) => {
    let nuevasClavesCopia = [...nuevasClavesExtras];

    nuevasClavesCopia.forEach(function (nc) {
      if (!claves.includes(nc)) {
        const index = nuevasClavesCopia.indexOf(nc);
        if (index > -1) {
          nuevasClavesCopia.splice(index, 1);
        }
      }
    });

    claves.forEach(function (clave) {
      if (!activeCollection["keywords_resources"].includes(clave)) {
        nuevasClavesCopia.push(clave);
      }
    });
    setNuevasClavesExtras(nuevasClavesCopia);
    modifyActiveCollection({ keywords_resources: claves });
  };

  const handleAddKeywords = (nuevasClaves) => {
    modifyActiveCollection({ keywords: nuevasClaves });
  };

  const handleModifyLocation = (nuevasLocalizaciones) => {
    modifyActiveCollection({ geographicCoverage: nuevasLocalizaciones });
  };

  const handleCerrarBiblioteca = () => {
    setOpen(false);
  };

  const handleCerrarVista = () => {
    setAbrirVista(false);
  };
  const handleTitulo = (titulo) => {
    modifyActiveCollection({ title: titulo });
  };

  const handleChangeCoverPage = (cover) => {
    modifyActiveCollection({ cover_page: cover });
  };

  const handleDescripcion = (descripcion) => {
    modifyActiveCollection({ description: descripcion });
  };

  const handleChangePlaceCreacion = (placeCreation) => {
    modifyActiveCollection({ place_creation: placeCreation });
  };

  const handleCreator = (author) => {
    modifyActiveCollection({ author: author });
  };

  const handleTypeCreator = (type_author) => {
    modifyActiveCollection({ type_author: type_author });
  };

  const handleType = (type) => {
    modifyActiveCollection({ type: type });
  };

  const handleAreaCreator = (area_author) => {
    modifyActiveCollection({ area_author: area_author });
  };

  const handleMandate = (mandate) => {
    modifyActiveCollection({ mandate: mandate });
  };

  const handleTopic = (topic) => {
    modifyActiveCollection({ topic: topic });
  };

  const handleMetadata = (object) => {
    modifyActiveCollection(object);
  };

  const agregarTextoALienzo = () => {
    let nuevasTarjetas = [...activeCollection["cards"]];
    let i = nuevasTarjetas.length;
    let newCard = crearNuevaTarjetaTexto("", i);
    newCard.id = i;
    nuevasTarjetas.push(newCard);
    modifyActiveCollection({ cards: nuevasTarjetas });
  };

  const agregarImagenALienzo = (resource, record, path) => {
    let nuevasTarjetas = [...activeCollection["cards"]];
    let nuevasClaves = [...activeCollection["keywords_resources"]];
    let nuevasLocalizaciones = [...activeCollection["geographicCoverage"]];
    let nuevoTiempo = { ...activeCollection["temporalCoverage"] };
    let i = nuevasTarjetas.length;
    let newCard = crearNuevaTarjetaImage(resource, record, path, i);
    newCard.id = i;
    nuevasTarjetas.push(newCard);
    nuevasClaves = caracterizacionPalabrasClave(resource, nuevasClaves);
    nuevoTiempo = caracterizacionTiempo(resource, nuevoTiempo);
    nuevasLocalizaciones = caracterizacionLocalizacion(
      resource,
      nuevasLocalizaciones,
    );
    modifyActiveCollection({
      cards: nuevasTarjetas,
      keywords_resources: nuevasClaves,
      geographicCoverage: nuevasLocalizaciones,
      temporalCoverage: nuevoTiempo,
    });
  };

  const agregarEnlaceVideoALienzo = () => {
    let nuevasTarjetas = [...activeCollection["cards"]];
    let i = nuevasTarjetas.length;
    let newCard = crearNuevaTarjetaEnlaceVideo("", i);
    newCard.id = i;
    nuevasTarjetas.push(newCard);
    modifyActiveCollection({ cards: nuevasTarjetas });
  };

  const handleAgregarRecursoALienzo = (recursosBiblioteca) => {
    agregarRecursoALienzo(recursosBiblioteca);
  };

  const handlerCloseDrawerImage = () => {
    setOpenImageSelect(false);
  };

  const handlerAgregarPiezaImagen = (resource, record, path) => {
    agregarImagenALienzo(resource, record, path);
    setOpenImageSelect(false);
  };

  const agregarRecursoALienzo = (recursosBiblioteca) => {
    let nuevasTarjetas = [...activeCollection["cards"]];
    let nuevasClaves = [...activeCollection["keywords_resources"]];
    let nuevasLocalizaciones = [...activeCollection["geographicCoverage"]];
    let nuevoTiempo = { ...activeCollection["temporalCoverage"] };
    let i = nuevasTarjetas.length;
    recursosBiblioteca.forEach(function (r) {
      let newCard = crearNuevaTarjetaRecurso(r, i);
      newCard.id = i;
      nuevasTarjetas.push(newCard);
      nuevasClaves = caracterizacionPalabrasClave(r, nuevasClaves);
      nuevoTiempo = caracterizacionTiempo(r, nuevoTiempo);
      nuevasLocalizaciones = caracterizacionLocalizacion(
        r,
        nuevasLocalizaciones,
      );
      i++;
    });

    modifyActiveCollection({
      cards: nuevasTarjetas,
      keywords_resources: nuevasClaves,
      geographicCoverage: nuevasLocalizaciones,
      temporalCoverage: nuevoTiempo,
    });
  };

  const handleChangePiece = (action, card, piece, position) => {
    let nuevasTarjetas = [...activeCollection["cards"]];
    if (action === "delete_piece") {
      if (nuevasTarjetas[card.order]["pieces"].length > 1)
        nuevasTarjetas[card.order]["pieces"].splice(position, 1);
      else nuevasTarjetas.splice(card.order, 1);
    } else if (action === "up_piece") {
      let nuevasPiezas = ordenarElementoArreglo(
        nuevasTarjetas[card.order]["pieces"],
        position,
        -1,
      );
      nuevasTarjetas[card.order]["pieces"] = nuevasPiezas;
    } else if (action === "down_piece") {
      let nuevasPiezas = ordenarElementoArreglo(
        nuevasTarjetas[card.order]["pieces"],
        position,
        1,
      );
      nuevasTarjetas[card.order]["pieces"] = nuevasPiezas;
    }
    modifyActiveCollection({ cards: nuevasTarjetas });
  };

  const handleChangeCard = (action, editCard, piece, position) => {
    let nuevasTarjetas = [...activeCollection["cards"]];
    if (typeof piece === "undefined") {
      if (action === "edit") {
        nuevasTarjetas[editCard.order] = editCard;
        modifyActiveCollection({ cards: nuevasTarjetas });
      } else if (action === "delete") {
        nuevasTarjetas.splice(editCard.order, 1);
        let nuevasClaves = [];
        let nuevasLocalizaciones = [];
        let nuevoTiempo = {};
        nuevasTarjetas.forEach(function (t) {
          t.pieces.forEach(function (p) {
            if (typeof p.resource !== "undefined") {
              nuevasClaves = caracterizacionPalabrasClave(
                p.resource,
                nuevasClaves,
              );
              nuevoTiempo = caracterizacionTiempo(p.resource, nuevoTiempo);
              nuevasLocalizaciones = caracterizacionLocalizacion(
                p.resource,
                nuevasLocalizaciones,
              );
            }
          });
        });

        if (nuevasClavesExtras.length > 0) {
          nuevasClaves = nuevasClaves.concat(nuevasClavesExtras);
        }

        modifyActiveCollection({
          cards: nuevasTarjetas,
          keywords_resources: nuevasClaves,
          geographicCoverage: nuevasLocalizaciones,
          temporalCoverage: nuevoTiempo,
        });
      } else if (action === "up") {
        nuevasTarjetas = ordenarElementoArreglo(
          nuevasTarjetas,
          editCard.order,
          -1,
        );
        modifyActiveCollection({ cards: nuevasTarjetas });
      } else if (action === "down") {
        nuevasTarjetas = ordenarElementoArreglo(
          nuevasTarjetas,
          editCard.order,
          1,
        );
        modifyActiveCollection({ cards: nuevasTarjetas });
      } else if (action === "addText") {
        let piece = { value: "", type: "text" };
        nuevasTarjetas[editCard.order].pieces.unshift(piece);
        modifyActiveCollection({ cards: nuevasTarjetas });
        //nuevasTarjetas =  ordenarElementoArreglo(nuevasTarjetas,editCard.order,1);
      }
    } else {
      handleChangePiece(action, editCard, piece, position);
    }
  };

  var ordenarElementoArreglo = function (arreglo, index, delta) {
    var newIndex = Number(index) + Number(delta);
    if (!(newIndex < 0 || newIndex > arreglo.length)) {
      var elemento = arreglo[index];
      arreglo.splice(index, 1);
      arreglo.splice(newIndex, 0, elemento);
    }
    return arreglo;
  };

  const recalcularOrden = (nuevasTarjetas) => {
    for (let i in nuevasTarjetas) {
      nuevasTarjetas[i].id = i;
      nuevasTarjetas[i].order = i;
    }
    return nuevasTarjetas;
  };

  const crearNuevaTarjetaRecurso = (recurso, order) => {
    let card = {};
    card["order"] = order;
    let piece = {};
    piece["resource"] = recurso;
    piece["type"] = tipoRecurso;
    card["pieces"] = [piece];
    return card;
  };

  const crearNuevaTarjetaTexto = (value, order) => {
    let card = {};
    card["order"] = order;
    let piece = {};
    piece["value"] = value;
    piece["type"] = "texto";
    card["pieces"] = [piece];
    return card;
  };

  const crearNuevaTarjetaImage = (resource, record, path, order) => {
    let card = {};
    card["order"] = order;
    let piece = {};
    piece["path"] = path;
    piece["record"] = {};
    piece["record"] = record;
    piece["resource"] = {};
    piece["resource"] = resource;
    piece["type"] = "imagen";
    card["pieces"] = [piece];
    return card;
  };

  const crearNuevaTarjetaEnlaceVideo = (path, order) => {
    let card = {};
    card["order"] = order;
    let piece = {};
    piece["path"] = path;
    piece["type"] = "recurso_externo";
    card["pieces"] = [piece];
    return card;
  };

  const caracterizacionPalabrasClave = (recurso, nuevasClaves) => {
    try {
      let nivelMissionHumanRigths =
        recurso.document.metadata.missionLevel.humanRights;
      for (const property in nivelMissionHumanRigths) {
        let arrClaves = nivelMissionHumanRigths[property];
        arrClaves.forEach(function (clave) {
          if (!Array.isArray(clave)) {
            if (clave !== "")
              if (
                !nuevasClaves.includes(clave) &&
                clave.toLowerCase() !== "no homologado" &&
                !clave.toLowerCase().includes("sin especificar")
              )
                nuevasClaves.push(clave);
          } else {
            clave.forEach(function (c) {
              if (c !== "")
                if (
                  !nuevasClaves.includes(c) &&
                  c.toLowerCase() !== "no homologado" &&
                  !c.toLowerCase().includes("sin especificar")
                )
                  nuevasClaves.push(c);
            });
          }
        });
      }
    } catch (e) {
      console.log(
        "Error en el la recuperación del campo missionLevel humanRights",
        e,
      );
    }
    return nuevasClaves;
  };

  const formatDate = (date) => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };

  const caracterizacionTiempo = (recurso, nuevoTiempo) => {
    try {
      const temporalCoverage =
        recurso.document.metadata.firstLevel.temporalCoverage;
      const dateStar = new Date(Date.parse(temporalCoverage["start"]));
      const dateEnd = new Date(Date.parse(temporalCoverage["end"]));
      const nvdateStar = new Date(Date.parse(nuevoTiempo["start"]));
      const nvdateEnd = new Date(Date.parse(nuevoTiempo["end"]));
      if ("start" in nuevoTiempo && "end" in nuevoTiempo) {
        if (dateStar < nvdateStar) nuevoTiempo["start"] = formatDate(dateStar);
        if (dateEnd > nvdateEnd) nuevoTiempo["end"] = formatDate(dateEnd);
      } else {
        nuevoTiempo["start"] = formatDate(dateStar);
        nuevoTiempo["end"] = formatDate(dateEnd);
      }
    } catch (e) {
      console.log("Error en el la recuperación del campo temporalCoverage");
    }
    return nuevoTiempo;
  };

  const caracterizacionLocalizacion = (recurso, nuevaLocalizacion) => {
    try {
      const arrGeographicCoverage = {
        ...recurso.document.metadata.firstLevel.geographicCoverage,
      };

      for (let i in arrGeographicCoverage) {
        let geographicCoverage = arrGeographicCoverage[i];
        if ("originalLocation" in geographicCoverage)
          delete geographicCoverage.originalLocation;
        geographicCoverage["ident"] = recurso.document.ident;
        if (geographicCoverage.geoPoint) {
          geographicCoverage["resource"] = true;
          nuevaLocalizacion.push(geographicCoverage);
        }
      }
    } catch (e) {
      console.log("Error en el la recuperación del campo geographicCoverage");
    }
    return nuevaLocalizacion;
  };

  const tipoCreadorComision = (tipoCreador) => {
    const usuarioComision = "Usuario de la Comisión de la Verdad";
    let infoCreador = false;
    try {
      infoCreador = tipoCreador
        .toLowerCase()
        .includes(usuarioComision.toLowerCase());
    } catch (e) {
      console.log(e);
    }
    return infoCreador;
  };

  const procesoValidacion = (propiedad) => {
    let val = true;
    let mensaje = "";
    try {
      if (propiedad["nombre"] === "cover_page") {
        try {
          if (!("path" in activeCollection[propiedad["nombre"]])) {
            val = false;
            mensaje = propiedad["mensaje"];
          }
        } catch (e) {
          val = false;
          mensaje = propiedad["mensaje"];
          console.log(e);
        }
      } else if (propiedad["nombre"] === "place_creation") {
        try {
          if (!activeCollection[propiedad["nombre"]]["country"]) {
            val = false;
            mensaje = propiedad["mensaje"];
          }
        } catch (e) {
          val = false;
          mensaje = propiedad["mensaje"];
          console.log(e);
        }
      } else if (
        propiedad["nombre"] === "area_author" ||
        propiedad["nombre"] === "mandate" ||
        propiedad["nombre"] === "topic"
      ) {
        if (tipoCreadorComision(activeCollection["type_author"])) {
          if (
            activeCollection[propiedad["nombre"]] === "" ||
            typeof activeCollection[propiedad["nombre"]] === "undefined" ||
            !activeCollection[propiedad["nombre"]]
          ) {
            val = false;
            mensaje = propiedad["mensaje"];
          }
        }
      } else {
        if (
          activeCollection[propiedad["nombre"]] === "" ||
          !activeCollection[propiedad["nombre"]]
        ) {
          val = false;
          mensaje = propiedad["mensaje"];
        }
      }
    } catch (e) {
      console.log(e);
    }
    return { validacion: val, mensaje: mensaje };
  };

  const validacionCamposDescripcion = () => {
    const arrayVal = [
      { nombre: "cover_page", mensaje: "imagen de portada" },
      { nombre: "title", mensaje: "titulo" },
      { nombre: "description", mensaje: "descripción" },
      { nombre: "type", mensaje: "tipo de colección" },
      { nombre: "category", mensaje: "lugar de publicación" },
      { nombre: "place_creation", mensaje: "lugar de creación" },
      { nombre: "author", mensaje: "creador" },
      { nombre: "type_author", mensaje: "tipo de creador" },
      { nombre: "area_author", mensaje: "área productora" },
      { nombre: "mandate", mensaje: "mandato" },
      { nombre: "topic", mensaje: "tema" },
    ];
    let mensaje = "";
    let validacion = true;
    let count = 0;
    for (let i in arrayVal) {
      const pv = procesoValidacion(arrayVal[i]);

      if (!pv["validacion"]) {
        validacion = false;
        if (mensaje !== "") mensaje = mensaje + ", " + pv["mensaje"];
        else mensaje = pv["mensaje"];

        count++;
      }
    }
    if (count > 0) mensaje = "Debe ingresar " + mensaje + " antes de continuar";

    return { validacion: validacion, mensaje: mensaje };
  };

  if (redirectMuseo) {
    return <Navigate to="/museo" />;
  }

  return (
    <>
      <MainLayout>
        {activeCollection ? (
          <Container className={classes.contenedorGestor}>
            <Grid container spacing={1}>
              <Grid container item xs={12} spacing={1}>
                <MobileStepper
                  variant="progress"
                  steps={3}
                  color="secondary"
                  position="bottom"
                  activeStep={activeStepCrea}
                  className={
                    isWidthDown("sm", props.width) ? classes.stepperMobile : ""
                  }
                  classes={{
                    progress: classes.stepperProgress,
                    root: classes.stepperRoot,
                  }}
                  nextButton={
                    <Button
                      size="small"
                      onClick={handleNext}
                      disabled={activeStepCrea === 2}
                    >
                      {theme.direction === "rtl" ? (
                        <KeyboardArrowLeft />
                      ) : (
                        <KeyboardArrowRight />
                      )}
                    </Button>
                  }
                  backButton={
                    <Button
                      size="small"
                      onClick={handleBack}
                      disabled={activeStepCrea === 0}
                    >
                      {theme.direction === "rtl" ? (
                        <KeyboardArrowRight />
                      ) : (
                        <KeyboardArrowLeft />
                      )}
                    </Button>
                  }
                />
              </Grid>

              <Grid container item xs={12} spacing={1}>
                <div className={classes.content}>
                  {activeStepCrea == 0 && (
                    <>
                      <DescripcionColeccion
                        titulo={activeCollection["title"]}
                        handleTitulo={handleTitulo}
                        descripcion={activeCollection["description"]}
                        handleDescripcion={handleDescripcion}
                        handleChangeCategoria={handleChangeCategoria}
                        categoria={activeCollection["category"]}
                        handleTipo={handleType}
                        tipo={activeCollection["type"]}
                        handleChangeCoverPage={handleChangeCoverPage}
                        coverPage={activeCollection["cover_page"]}
                        lugarCreacion={activeCollection["place_creation"]}
                        handleLugarCreacion={handleChangePlaceCreacion}
                        creador={activeCollection["author"]}
                        handleCreador={handleCreator}
                        handleTipoCreador={handleTypeCreator}
                        tipoCreador={activeCollection["type_author"]}
                        handleAreaCreador={handleAreaCreator}
                        areaCreador={activeCollection["area_author"]}
                        handleMandato={handleMandate}
                        mandato={activeCollection["mandate"]}
                        handleTema={handleTopic}
                        tema={activeCollection["topic"]}
                        handleMetadatos={handleMetadata}
                      />
                    </>
                  )}
                  {activeStepCrea == 1 && (
                    <>
                      <ContenedorColeccion
                        ref={tarjetasColeccionesRef}
                        cards={activeCollection["cards"]}
                        handleChangeCard={handleChangeCard}
                      />
                      <MenuBotonFlotante
                        handleMenu={handleMenu}
                        icon={<AddIcon />}
                      />
                    </>
                  )}

                  {activeStepCrea == 2 && (
                    <>
                      <CaracteristicasColeccion
                        claves={activeCollection["keywords_resources"]}
                        handleAddKeywords={handleAddKeywords}
                        nuevasClaves={activeCollection["keywords"]}
                        tiempo={activeCollection["temporalCoverage"]}
                        value={value}
                        handleChange={handleChange}
                        //localizaciones_recursos={activeCollection["locations_resources"]}
                        localizaciones={activeCollection["geographicCoverage"]}
                        handleModifyLocation={handleModifyLocation}
                        handleDeleteKeywordsResources={
                          handleDeleteKeywordsResources
                        }
                      />
                      {loadingSave ? (
                        <>
                          <Fab
                            aria-controls="customized-menu"
                            aria-haspopup="true"
                            color="primary"
                            size="medium"
                            className={classes.fabSave}
                          >
                            <Save />
                          </Fab>
                          <CircularProgress
                            size={55}
                            className={classes.fabProgress}
                          />
                        </>
                      ) : (
                        <>
                          {successSave ? (
                            <Fab
                              aria-controls="customized-menu"
                              aria-haspopup="true"
                              size="medium"
                              className={classes.fabSaveCheck}
                            >
                              <CheckIcon />
                            </Fab>
                          ) : (
                            <div>
                              <Fab
                                aria-controls="customized-menu"
                                aria-haspopup="true"
                                color="primary"
                                size="medium"
                                className={classes.fabVisibility}
                                onClick={handleClickVisibility}
                              >
                                <Visibility />
                              </Fab>
                              <Fab
                                aria-controls="customized-menu"
                                aria-haspopup="true"
                                color="primary"
                                size="medium"
                                className={classes.fabSave}
                                onClick={handleClickSave}
                              >
                                <Save />
                              </Fab>
                            </div>
                          )}
                        </>
                      )}
                    </>
                  )}
                </div>
              </Grid>
            </Grid>
            <Dialog fullScreen open={open} TransitionComponent={Transition}>
              <Biblioteca
                handleCerrar={handleCerrarBiblioteca}
                handleAgregarALienzo={handleAgregarRecursoALienzo}
                tipoRecurso={tipoRecurso}
              />
            </Dialog>
            <Dialog
              fullScreen
              open={abrirVista}
              TransitionComponent={Transition}
            >
              <VistaColeccion
                coleccion={activeCollection}
                value={value}
                handleChange={handleChange}
                handleCerrar={handleCerrarVista}
              />
            </Dialog>
          </Container>
        ) : null}
      </MainLayout>
      <DrawerImagen
        abrir={openImageSelect}
        handlerCerrar={handlerCloseDrawerImage}
        handlerImageSelected={handlerAgregarPiezaImagen}
      />

      <Snackbar
        open={openAlert}
        autoHideDuration={duration}
        onClose={handleCloseAlert}
      >
        <>
          <Alert
            onClose={handleCloseAlert}
            severity={typeAlert}
            closeText={"Cerrar"}
          >
            {messageAlert}
          </Alert>
        </>
      </Snackbar>
    </>
  );
};

const mapStateToProps = (store) => ({
  activeStepCrea: store.museo.activeStepCrea,
  openLienzoCrea: store.museo.openLienzoCrea,
  activeCollection: store.museo.activeCollection,
});
//autoHideDuration={2000}
export default connect(
  mapStateToProps,
  museo.actions,
)(withWidth()(GestorNarrativas));
