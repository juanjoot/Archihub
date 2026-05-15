import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
// import { alpha } from '@material-ui/core/styles/colorManipulator';
import Close from "@material-ui/icons/Close";
import Container from "@material-ui/core/Container";
import Fab from "@material-ui/core/Fab";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import RangoTiempo from "./RangoTiempo";
import PiezaText from "./PiezaText";
import PiezaImage from "./PiezaImage";
import MapaColombia from "./extraCard/MapaColombia";

const useStyles = makeStyles((theme) => ({
  close: {
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(1),
    zIndex: 1000,
  },
  description: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(4),
  },
  features: {
    marginBottom: theme.spacing(2),
  },
  card: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  chip: {
    margin: "1px",
  },
  contenedorDescripcion: {
    marginBottom: "20px",
    marginTop: "20px",
  },
  descripcion: {
    color: "black",
    fontFamily: "Montserrat, sans-serif",
    fontSize: "20px",
    fontWeight: 400,
  },
  contenedorChip: {
    margin: "5px",
  },
  imagenContenedor: {
    display: "flex",
    position: "relative",
  },
  imagenTitle: {
    left: "0px",
    right: "0px",
    display: "flex",
    "-moz-box-align": "center",
    alignItems: "center",
    bottom: "0px",
    position: "absolute",
    // background: `${ alpha(theme.palette.primary.main, 0.6)} none repeat scroll 0% 0%`,
    height: "30%",
  },
  imagenMensajeCarga: {
    fontFamily: "Montserrat, sans-serif",
    fontSize: "96px",
  },
  printSource: {
    display: "none",
  },
  mapaInfo: {
    width: 250,
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  },
}));

const VistaColeccionToPrint = (props) => {
  const { handleCerrar, coleccion } = props;
  const classes = useStyles();

  const renderClave = (clave, i) => {
    return (
      <Chip
        className={classes.chip}
        label={capitalizeFirstLetter(clave)}
        color="primary"
        key={i + "_keyword"}
        variant="outlined"
      />
    );
  };

  const renderCard = (card, i) => {
    return (
      <div className={classes.card} key={i + "_card"}>
        {card.pieces.map((piece, j) => renderPiece(piece, j))}
      </div>
    );
  };

  const renderPiece = (piece, j) => {
    if (piece.type === "recurso") {
      return (
        <>
          <h2>{piece.resource.document.metadata.firstLevel.title}</h2>
          <p>{piece.resource.document.metadata.firstLevel.description}</p>
          <p style={{"font-weight": "bold"}}>{piece.type}</p>
        </>
      );
    } else if (piece.type === "audio") {
      return (
        <>
          <h2>{piece.resource.document.metadata.firstLevel.title}</h2>
          <p>{piece.resource.document.metadata.firstLevel.description}</p>
          <p style={{"font-weight": "bold"}}>{piece.type}</p>
        </>
      );
    } else if (piece.type === "video") {
      return (
        <>
          <h2>{piece.resource.document.metadata.firstLevel.title}</h2>
          <p>{piece.resource.document.metadata.firstLevel.description}</p>
          <p style={{"font-weight": "bold"}}>{piece.type}</p>
        </>
      );
    } else if (piece.type === "galeria") {
      return (
        <>
          <h2>{piece.resource.document.metadata.firstLevel.title}</h2>
          <p>{piece.resource.document.metadata.firstLevel.description}</p>
          <p style={{"font-weight": "bold"}}>{piece.type}</p>
        </>
      );
    } else if (piece.type === "text" || piece.type === "texto") {
      return (
        <PiezaText
          key={j + "_text"}
          piece={piece}
          value={piece.value}
          lectura={true}
        />
      );
    } else if (piece.type === "image" || piece.type === "imagen") {
      return <PiezaImage   key={j + "_image"} path={piece.path} portada={false} piece={piece} />;
    } else if (piece.type === "recurso_externo") {
      return (
        <>
          <p>{piece.value}</p>
          <p style={{"font-weight": "bold"}}>{piece.type}</p>
        </>
      ) 
    }
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const keywords = coleccion["keywords_resources"].concat(
    coleccion["keywords"]
  );

  return (
    <>
      <Container id="divcontents" className={classes.printSource}>
        {handleCerrar && (
          <Fab
            aria-controls="customized-menu"
            aria-haspopup="true"
            color="primary"
            size="small"
            className={classes.close}
            onClick={handleCerrar}
          >
            <Close />
          </Fab>
        )}

        {"cover_page" in coleccion ? (
          <div className={classes.imagenContenedor}>
            <PiezaImage  key={"coverage_image"} path={coleccion["cover_page"]["path"]} portada={true} />
            <div className={classes.imagenTitle}>
              <Typography variant="h1" className={classes.imagenMensajeCarga}>
                {coleccion["title"]}
              </Typography>
            </div>
          </div>
        ) : (
          <>
            <Typography variant="h1" className={classes.imagenMensajeCarga}>
              {coleccion["title"]}
            </Typography>
          </>
        )}
        <div className={classes.contenedorDescripcion}>
          <Typography
            className={classes.descripcion}
            variant="body1"
            gutterBottom
          >
            {coleccion["description"]}
          </Typography>
        </div>
        {keywords.length > 0 ||
        coleccion["geographicCoverage"].length > 0 ||
        ("start" in coleccion["temporalCoverage"] &&
          "end" in coleccion["temporalCoverage"]) ? (
          <>
            <div className={classes.contenedorChip}>
              {keywords.map((clave, i) => renderClave(clave, i))}
            </div>
            {coleccion["geographicCoverage"].length > 0 ? (
              <MapaColombia
                className={classes.mapaInfo}
                geo={coleccion["geographicCoverage"]}
              />
            ) : null}
            {"start" in coleccion["temporalCoverage"] &&
            "end" in coleccion["temporalCoverage"] ? (
              <p>{coleccion.temporalCoverage.start} - {coleccion.temporalCoverage.end}</p>
            ) : null}
          </>
        ) : null}
        {coleccion["cards"].map((card, i) => renderCard(card, i))}
      </Container>
    </>
  );
};

export default VistaColeccionToPrint;
