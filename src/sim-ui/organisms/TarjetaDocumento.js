import { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as museo from "../../store/ducks/museo.duck";
import ToolbarExplora from "./extraCard/ToolbarExplora";
import ToolbarCrea from "./extraCard/ToolbarCrea";
import ToolbarBiblioteca from "./extraCard/ToolbarBiblioteca";
import ToolbarVistaColecciones from "./extraCard/ToolbarVistaColecciones";
import ErrorTwoToneIcon from "@mui/icons-material/ErrorTwoTone";
import Divider from "@material-ui/core/Divider";
import Slider from "@material-ui/core/Slider";
import Box from "@material-ui/core/Box";
import MapaColombia from "../organisms/extraCard/MapaColombia";
import { Link, useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardInfo from "./extraCard/CardInfo";
import Toolbar from "@material-ui/core/Toolbar";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import DescriptionIcon from "@material-ui/icons/Description";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import GaleriaTarjeta from "./extraCard/GaleriaTarjeta";
import ListadoAudios from "./extraCard/ListadoAudios";
import ListadoDocumentos from "./extraCard/ListadoDocumentos";
import PiezaVideoEmbebido from "./PiezaVideoEmbebido";
import VizViewer from "./../molecules/VizViewer";
import * as ColletionService from "../../services/BookmarkCollectionService";
import * as ArchihubService from "../../services/ArchihubService";
import { useTranslation } from "react-i18next";
import ImportContactsTwoToneIcon from "@mui/icons-material/ImportContactsTwoTone";
import ArticleTwoToneIcon from "@mui/icons-material/ArticleTwoTone";
import FolderTwoToneIcon from "@mui/icons-material/FolderTwoTone";
import MovieCreationTwoToneIcon from "@mui/icons-material/MovieCreationTwoTone";
import CollectionsTwoToneIcon from "@mui/icons-material/CollectionsTwoTone";
import AudiotrackTwoToneIcon from "@mui/icons-material/AudiotrackTwoTone";
import ExtensionTwoToneIcon from "@mui/icons-material/ExtensionTwoTone";
import StorageTwoToneIcon from "@mui/icons-material/StorageTwoTone";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import DownloadIcon from '@mui/icons-material/Download';
import BookmarksOutlinedIcon from '@mui/icons-material/BookmarksOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';



function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function navigateToHash(hash) {
  const cleanhash = hash.replace("#", "");
  const el = document.getElementById(cleanhash);
  if (el) {
    el.scrollIntoView({
      behavior: "smooth",
    });
  }
}

const TarjetaDocumento = (props) => {
  const location = useLocation();
  const [t, i18n] = useTranslation("common");
  const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(false);
  const [tab, setTab] = useState("info");
  const [recordsType, setRecordsType] = useState({});
  const view = props.view ? props.view : "rows";

  const useStyles = makeStyles((theme) => ({
    root: {
      marginBottom: theme.spacing(2),
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",

      '&.dark': {
        background: 'rgba(255,255,255,.1)'
      },

      '&.mobile': {
        maxWidth: 800,
        margin: '0 auto',
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(2),
      }
    },
    cardActions: {
      padding: 0,
      paddingTop: 15,
      paddingBottom: 15,

      '&.dark': {
        paddingBottom: 0,
        paddingTop: 0
      }
    },
    cardContent: {
      padding: "5px !important",
    },
    slider: {
      "& .MuiSlider-valueLabel": {
        fontSize: 10,
      },
    },
    expand: {
      marginLeft: "auto",
      transform: "rotate(0deg)",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),

      '&.dark path': {
        fill: 'white'
      }
    },
    expandOpen: {
      transform: "rotate(180deg)",
      marginLeft: "auto",
      '&.dark path': {
        fill: 'white'
      }
    },
    highlight: {
      paddingLeft: theme.spacing(2),

      "& .badge": {
        backgroundColor: theme.palette.secondary.light,
        color: "white",
      },
    },
    headCard: {
      backgroundColor: theme.palette.grey[100],
      padding: 0,
      alignItems: "flex-start",
      flexGrow: 1,

      '&.dark': {
        background: 'rgba(255,255,255,.15)'
      },

      '&.dark .MuiCardHeader-subheader': {
        color: 'rgba(255,255,255,.5)'
      }
    },
    avatar: {
      backgroundColor: props.place === 'explora' ? theme.palette.primary.main : '#fc00ad',

      '&.dark': {
        backgroundColor: 'rgba(255,255,255,.1)'
      }
    },
    headerActions: {
      padding: 0,
    },
    titleCard: {
      color: props.place === 'explora' ? theme.palette.primary.main : '#fc00ad',
      fontSize: "1em",
      textDecoration: "none",

      '&.dark': {
        color: 'white',
        display: 'block',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        maxWidth: 400,
        marginTop: 5,
        textOverflow: 'ellipsis',
      },
      "&:hover": {
        textDecoration: "underline",
      },
      [theme.breakpoints.down("md")]: {
        fontSize: "0.8em",
        lineHeight: "1",
      },
      ".mobile &": {
        fontSize: "0.8em",
        lineHeight: "1",
      },
    },
    btnCard: {
      textTransform: "none",
      marginLeft: theme.spacing(1),
      borderRadius: 50,
      paddingLeft: theme.spacing(2.5),
      paddingRight: theme.spacing(2.5),

      '&.dark': {
        "& path": {
          fill: "#bfcad9",
        },

        '&.active': {
          "& path": {
            fill: theme.palette.primary.dark,
          },
        }
      },

      "&.active": {
        backgroundColor: "#bfcad9",
        color: theme.palette.primary.dark,

        "& path": {
          fill: theme.palette.primary.dark,
        },
      },
    },
    btnCardInfo: {
      textTransform: "none",
      borderRadius: 50,
      marginRight: theme.spacing(2),

      '&.dark': {
        borderColor: props.place === 'explora' ? '#6E3092' : '#6E3092',

        "& path": {
          fill: props.place === 'explora' ? '#6E3092' : '#6E3092',
        },

        '&.active': {
          "& path": {
            fill: 'white',
          },
        }
      },

      "&.active": {
        backgroundColor: "#6E3092",
        color: 'white',

        "& path": {
          fill: 'white',
        },
      },
      [theme.breakpoints.down("md")]: {
        textIndent: "-999999999px",
        "& .MuiButton-startIcon": {
          marginRight: 0,
        },
      },
      ".mobile &": {
        textIndent: "-999999999px",
        "& .MuiButton-startIcon": {
          marginRight: 0,
        },
      },
    },
    btnLinkCard: {
      "& span": {
        margin: 0,
      },
    },
    info: {
      display: "flex",
      justifyContent: "center",
      [theme.breakpoints.down("md")]: {
        display: "block",
      },
      ".mobile &": {
        display: "block",
      },
    },
    insideInfo: {
      display: "block",
      marginRight: theme.spacing(2),
    },
    textoInfo: {
      width: "calc(100% - 250px)",
      maxWidth: 500,
      [theme.breakpoints.down("md")]: {
        width: "100%",
      },
      ".mobile &": {
        width: "100%",
      },
    },
    mapaInfo: {
      width: 250,
      [theme.breakpoints.down("md")]: {
        width: "100%",
      },
      ".mobile &": {
        width: "100%",
      },
    },
    mobileHide: {
      [theme.breakpoints.down("md")]: {
        display: "none",
      },
      ".mobile &": {
        display: "none",
      },
    },
    btnTipoLabel: {
      [theme.breakpoints.down("md")]: {
        display: "none",
      },
      ".mobile &": {
        display: "none",
      },
    },
    btnTipoLabelNum: {
      marginLeft: theme.spacing(1),
      border: "1px solid #bfcad9",
      width: 20,
      height: 20,
      lineHeight: "20px",
      borderRadius: 50,
      fontSize: "10px",
      background: "rgba(255,255,255,.8)",
      [theme.breakpoints.down("md")]: {
        marginLeft: 0,
      },
      ".mobile &": {
        marginLeft: 0,
      },
    },
  }));

  const classes = useStyles();


  let piezaType = props.pieza ? props.pieza.type : "";
  let piezaRecords = props.pieza ? props.pieza.records : undefined;

  location.hash && navigateToHash(location.hash); // navigate to hash

  // Función que determina el comportamiento del botón expandir. Cuando la tarjeta se expande se muestra el contenido que muestra _tab_
  const handleExpandClick = () => {
    setExpanded(!expanded);
    setTab("info");
  };

  // Función que determina el comportamiento cuando se hace click en alguna tab inferior de la tarjeta y expande el contenido
  const handleExpandToolbarClick = (tab_) => {
    if (!expanded) {
      setExpanded(true);
      setTab(tab_);
    } else {
      tab === tab_ ? setExpanded(false) : setTab(tab_);
    }
  };

  const actualizarListadoBusqueda = (operation) => {
    if (props.actualizarBusqueda && props.place === "biblioteca") {
      if (
        operation === false &&
        props.selectedBilioteca.filter(
          (x) => x.document.ident === props.resource.document.ident,
        ).length > 0
      )
        handleCheckRecurso(operation);
      props.actualizarBusqueda();
    }
  };
  // Función que se ejecuta cuando el usuario hace click en el botón de marcador
  const handleFav = () => {
    if (!selected) {
      setOpen(true);
      setSelected(true);
      ColletionService.createBookmarkUserMuseo({
        resource_ident: props.ident,
      }).then(() => {
        ColletionService.getIdentCollection().then(
          (data) => {
            props.setUserBookmarks(data);
            actualizarListadoBusqueda(true);
          },
          (error) => {
            console.log(error);
          },
        );
      });
    } else {
      setOpen(true);
      setSelected(false);
      ColletionService.deleteBookmarkUserMuseo(props.ident).then((data) => {
        ColletionService.getIdentCollection().then(
          (data) => {
            props.setUserBookmarks(data);
            actualizarListadoBusqueda(false);
          },
          (error) => {
            console.log(error);
          },
        );
      });
    }
  };

  // Función que maneja el cierre de las alertas que genera el botón de marcadores
  const handleCloseFav = (_, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  // Función que se ejecuta cuando el usuario hace clic en el botón de compartir recurso
  const getWebShareConfig = () => {
    return {
      params: {
        title: props.name,
        text: `Recurso Comisión de la Verdad - ${props.name}`,
        url: `/detalle/${props.ident}`,
      },
      onShareSuccess: () => {
        console.log("yay! webShare success");
      },
      onShareError: (error) => {
        console.log("damn! webShare error", error);
      },
    };
  };

  const defineTypeRecurso = () => {
    try {
      if (props.pieza) {
        let records = props.pieza.resource.document.records;
        if (records.length == 1) {
          const record = records[0];
          if ("support" in record) {
            expandByType(record.support.toLowerCase());
          }
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const expandByType = (type) => {
    if (type != "recurso") {
      switch (type) {
        case "galeria":
          handleExpandToolbarClick("Galería fotográfica");
          break;
        case "audio":
          handleExpandToolbarClick("Audio");
          break;
        case "video":
          handleExpandToolbarClick("Video");
          break;
        case "documento":
          handleExpandToolbarClick("Documento");
          break;
        default:
          break;
      }
    } else {
      defineTypeRecurso();
    }
  };

  // Función que expande el record segun el tipo
  useEffect(() => {
    expandByType(piezaType);
  }, [piezaType]);

  // Función que agrupa los tipos de documento que contiene el recurso
  useEffect(() => {
    if (props.records) {
      const reduceRecordsType = props.records.reduce((contador, record) => {
        let tipo = "";
        record.support == undefined
          ? (tipo = "Sin definir")
          : (tipo = record.support);

        contador[tipo] = (contador[tipo] || 0) + 1;
        return contador;
      }, {});
      setRecordsType(reduceRecordsType);
    }
  }, [props.records]);

  useEffect(() => {
    if (
      typeof props.tipo !== "undefined" &&
      props.tipo !== null &&
      props.tipo !== "Visualización" &&
      props.tipo !== "Galería fotográfica"
    ) {
      setTab(props.tipo);
      setExpanded(true);
    } else if (typeof props.tipo === "undefined") {
      expandDocument();
    }
  }, [props.tipo]);

  const expandDocument = () => {
    if (props.pieza)
      if (props.pieza.text) {
        setTab("Documento");
        setExpanded(true);
      }
  };

  const handleCheckRecurso = (value) => {
    if (props.resource) {
      let arrSelectedBibliotea = [...props.selectedBilioteca];
      if (value) {
        arrSelectedBibliotea.push(props.resource);
      } else {
        let index = props.selectedBilioteca.findIndex(
          (x) => x.document.ident === props.resource.document.ident,
        );
        arrSelectedBibliotea.splice(index, 1);
      }
      props.setSelectedBilioteca(arrSelectedBibliotea);
    }
  };
  const setSearchToBack = () => {
    if (props.textSearchToBack) props.SetSearchToBack(props.textSearchToBack);
  };

  const handleDownload = () => {
    ArchihubService.downloadResource(props.id, (progress) => { });
  }

  return (
    <>
      <Card
        elevation={2}
        className={
          props.place === "conoce" ? `${classes.root} dark mobile` : props.place === "white" ? `${classes.root} mobile` : classes.root
        }
        key={props.index}
      >
        <CardHeader
          className={props.place === "conoce" ? `${classes.headCard} dark` : classes.headCard}
          avatar={
            <Avatar className={props.place === "conoce" ? `${classes.avatar} dark` : classes.avatar} variant="square">
              {props.resource?.recordType === 'video' && <MovieCreationTwoToneIcon />}
              {props.resource?.recordType === 'audio' && <AudiotrackTwoToneIcon />}
              {props.resource?.recordType === 'document' && <ArticleTwoToneIcon />}
              {props.resource?.recordType === 'image' && <CollectionsTwoToneIcon />}
              {props.resource?.recordType === 'database' && <StorageTwoToneIcon />}
              {!props.resource?.recordType && <FolderTwoToneIcon />}
            </Avatar>
          }
          action={
            <>
              {props.place === "explora" ? (
                <ToolbarExplora
                  favoriteClass={classes.favorite}
                  handleFav={handleFav}
                  webShareConfig={getWebShareConfig()}
                  selected={selected}
                />
              ) : null}
              {props.place === "biblioteca" ? (
                <ToolbarBiblioteca
                  favoriteClass={classes.favorite}
                  handleFav={handleFav}
                  selected={selected}
                  handleCheckRecurso={handleCheckRecurso}
                  agregar={props.agregarRecursosBiblioteca}
                  recurso={props.resource}
                  check={
                    props.selectedBilioteca.filter(
                      (x) => x.document.ident === props.resource.document.ident,
                    ).length > 0
                  }
                />
              ) : null}
              {props.place === "crea" ? (
                <ToolbarCrea recurso={props.resource} />
              ) : null}
              {props.place === "conoce" ? (
                <ToolbarVistaColecciones
                  copyLink={props.copyLink}
                  idSection={props.idSection}
                />
              ) : null}
            </>
          }
          title={

            // <Link
            //   className={props.place === "conoce" ? `${classes.titleCard} dark` : classes.titleCard}
            //   name={props.ident}
            //   id={props.idSection}
            //   data-cy='internal-card-link'
            //   to={`/detalle/${props.id}`}
            // >
            <>{props.resource?.metadata?.firstLevel?.attributedtitle ? props.resource.metadata.firstLevel.attributedtitle : props.name.split('.')[0]}</>
            // </Link>
          }
          subheader={
            <>
              {props.resource.parents.reverse().map((p, i) => {
                return (
                  <span style={{ fontSize: 14 }}> {p.title} |</span>
                )
              })}
              <span style={{ marginLeft: 15, fontSize: 14 }}>Actualizado {props.resource.createdAt ? new Date(props.resource.createdAt).toLocaleDateString() : ''}</span>
            </>
          }
          titleTypographyProps={{
            variant: "h6",
            color: "primary",
          }}
        />

        <CardActions className={`${classes.cardActions} ${props.place === 'conoce' ? 'dark' : ''}`} disableSpacing>
          <Button
            component={Link}
            to={`/detalle/${props.id}`}
            className={classes.button}
            color={selected ? "primary" : "default"}
            variant="outlined"
            style={{
              marginLeft: 20,
              color: '#333',
              borderRadius: 50,
              borderColor: props.place === 'explora' ? '#6E3092' : '#6E3092',
            }}
            size="small"
            startIcon={<BookmarksOutlinedIcon sx={{
              color: '#333'
            }} />}
          >
            Información
          </Button>
          <Button
            component={Link}
            to={`/detalle/${props.id}?type=record`}
            className={classes.button}
            color={selected ? "primary" : "default"}
            variant="outlined"
            style={{
              marginLeft: 10,
              color: '#333',
              borderRadius: 50,
              borderColor: props.place === 'explora' ? '#6E3092' : '#6E3092',
            }}
            size="small"
            startIcon={<RemoveRedEyeOutlinedIcon sx={{
              color: '#333'
            }} />}
          >
            Previsualizar
          </Button>
          <Button
            className={classes.button}
            onClick={handleDownload}
            color={selected ? "primary" : "default"}
            variant="outlined"
            style={{
              marginLeft: 10,
              color: '#333',
              borderRadius: 50,
              borderColor: props.place === 'explora' ? '#6E3092' : '#6E3092',
            }}
            size="small"
            startIcon={<DownloadIcon sx={{
              color: '#333'
            }} />}
          >
            Descargar
          </Button>
        </CardActions>

        {view === "rows" && (
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent className={classes.cardContent}>
              {tab === "info" ? (
                <>
                  <CardInfo
                    geo={props.geo}
                    description={props.description}
                    ident={props.ident}
                  />
                </>
              ) : (
                <>

                </>
              )}
            </CardContent>
          </Collapse>
        )}
      </Card>

      <Snackbar open={open} autoHideDuration={2000} onClose={handleCloseFav}>
        <>
          {selected && (
            <Alert onClose={handleCloseFav} severity="success">
              {t("tarjeta.guardarAlert")}
            </Alert>
          )}
          {!selected && (
            <Alert onClose={handleCloseFav} severity="info">
              {t("tarjeta.deleteAlert")}
            </Alert>
          )}
        </>
      </Snackbar>
    </>
  );
};

const mapStateToProps = (store) => ({
  currentSection: store.museo.currentSection,
  currentBookmarks: store.museo.userBookmarks,
  selectedBilioteca: store.museo.selectedBilioteca,
  agregarRecursosBiblioteca: store.museo.agregarRecursosBiblioteca,
});

export default connect(mapStateToProps, museo.actions)(TarjetaDocumento);
