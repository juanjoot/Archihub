import React, { useEffect, useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Close from "@material-ui/icons/Close";
import Container from "@material-ui/core/Container";
import Fab from "@material-ui/core/Fab";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import MapaContainer from "./MapaContainer";
import RangoTiempo from "./RangoTiempo";
import PiezaRecurso from "./PiezaRecurso";
import PiezaText from "./PiezaText";
import PiezaImage from "./PiezaImage";
import PiezaImageCSS from "./PiezaImageCSS";
import ToolbarOpcionesVistaColecciones from './ToolbarOpcionesVistaColecciones'
import PiezaVideoEmbebido from "./PiezaVideoEmbebido";
import ButtonToPrint from "./ButtonToPrint";
import VistaColeccionToPrint from "./VistaColeccionToPrint";
import SupervisedUserCircleTwoToneIcon from "@material-ui/icons/SupervisedUserCircleTwoTone";
import Tooltip from "@material-ui/core/Tooltip";
import { connect } from "react-redux";
import withWidth from "@material-ui/core/withWidth";
import * as museo from "../../store/ducks/museo.duck";
import { useNavigate } from "react-router-dom";
// import { withRouter } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import Box from "@material-ui/core/Box";
import MapaColombia from '../organisms/extraCard/MapaColombia'
import LazyCard from './extraCard/LazyCard'
import { Controller, Scene } from "react-scrollmagic";


import { ascending } from 'd3'

const useStyles = makeStyles((theme) => ({
  snackBar: {
    zIndex: 2000,
  },
  containerElement: {
    display: "grid",
    width: "100%"
  },
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
    position: "relative",
    paddingTop: "0px",
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
  },
  contenedorChip: {
    margin: "0px 20px",
    "border-top": "2px solid " + theme.palette.primary.light,
    "padding-top": "8px",
  },
  contenedorChips: {
    margin: "0 0 85px 0px",
  },
  imagenContenedor: {
    display: "flex",
    position: "relative",
    [theme.breakpoints.down("sm")]: {
      display: "inline-block",
      width: "100vw",
      left: "-32px",
      "min-height": "280px",
      "background-repeat": "no-repeat",
      "background-size": "cover",
      "background-position": "center center",
    },
  },
  imagenTitle: {
    left: "0px",
    right: "0px",
    display: "grid",
    "-moz-box-align": "center",
    alignItems: "center",
    bottom: "0px",
    position: "absolute",
    padding: "10px",
    background: `${"#13c0c899"} none repeat scroll 0% 0%`, //aca hay que reemplazar por variable de color
    [theme.breakpoints.down("sm")]: {
      "background-color": "#13c0c899", //aca hay que reemplazar por variable de color
      "min-height": "150px",
      padding: "10px 0px",
      position: "absolute",
    },
  },
  imagenMensajeCarga: {
    marginLeft: "20px",
    marginRight: "20px",
    color: theme.palette.primary.light,
    fontWeight: "bold",
    fontSize: "20px",
  },
  imagenMensajeAutor: {
    marginLeft: "20px",
    marginRight: "20px",
    color: theme.palette.primary.light,
    fontSize: "18px",
    "font-weight": "lighter",
  },
  containerIconSensible: {
    position: "absolute",
    top: "-40px",
    right: "60px",
    marginTop: "50px",
  },
  iconSensible: {
    fontSize: 40,
    color: theme.palette.error.dark,
  },
  containerIconPedagogico: {
    position: "absolute",
    top: "-40px",
    right: "10px",
    marginTop: "50px",
  },
  iconPedagogico: {
    fontSize: 40,
    color: theme.palette.info.dark,
  },
  iconEditContainer: {
    display: "flex",
    justifyContent: "end",
    position: "absolute",
    width: "94%",
  },
  iconEdit: {
    backgroundColor: "#a7a9a6",
    borderRadius: "50%",
    color: "white",
    fontSize: "5.2vh",
    marginTop: "1%",
    border: "0.2px ridge white",
    padding: "3px",
  },
  headerMapa: {
    fontSize: 28,
    color: theme.palette.primary.main,
    borderBottom: `solid 3px ${theme.palette.primary.main}`,
    padding: 10,
  },
  mapaIcon: {
    fontSize: 28,
    color: theme.palette.primary.main,
    cursor: "pointer",
  },
  mapaIconBig: {
    fontSize: 32,
    color: theme.palette.primary.main,
    cursor: "pointer",
    padding: "0 3px",
  },
  iconsContainer: {
    padding: "10px 0",
    textAlign: "end",
  },
  mapaContent: {
    margin: "auto",
    maxWidth: 900,
  },
  cardHeader: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    paddingRight: 16,
  },
  linkIcon: {
    float: "right",
  },


  headerCol: {
    display: 'flex'
  },
  secondChildHeader: {
    width: '50%',
    position: 'relative',
    aspectRatio: 1.317
  },
  secondChildHeaderCover: {
    width: '100%',
  },
  secondChildHeaderDes: {
    width: '35%',
    backgroundColor: theme.palette.grey[100],
    padding: theme.spacing(2)
  }
}));

const useStylesv2 = makeStyles((theme) => ({
  headerCol: {
    display: 'flex',
    backgroundColor: '#222',
    [theme.breakpoints.down("md")]: {
      flexWrap: 'wrap'
    },
  },
  secondChildHeader: {
    width: '100%',
    position: 'relative',

    '& svg': {
      maxWidth: 300,
      margin: '0 auto'
    }
  },
  secondChildHeaderCover: {
    width: '100%',
    aspectRatio: 1.317
  },
  secondChildHeaderInfo: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.8)',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),

    '& h1': {
      fontSize: 30,
      fontWeight: 'bold',
      color: theme.palette.primary.light,
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    },
    '& h3': {
      fontSize: 20,
      color: 'white',
      borderBottom: '1px solid white',
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  },
  secondChildHeaderImg: {
    width: '100%',
    height: '100%',
    backgroundColor: '#999',
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  secondChildHeaderDes: {
    width: '35%',
    backgroundColor: '#222',
    color: "#dcdcdc",
    padding: theme.spacing(2),
    fontSize: '1.1em',
    lineHeight: '20pt',
    [theme.breakpoints.down("md")]: {
      width: '100%',
      position: 'relative',
      top: -5
    },
  },
  reduceCards: {
    background: theme.palette.primary.main,
    display: 'flex',
    flexWrap: 'wrap',
  },
  reduceIcons: {
    width: '25%',
    height: 60,
    display: 'flex',
    flexWrap: 'wrap',
    color: 'white',

    '& > div': {
      width: '100%',
      textAlign: 'center'
    }
  },
  rootContainer: {
    maxWidth: 800,
    margin: '0 auto'
  }
}));

const estilosTarjeta = makeStyles(theme => ({
  headerMapa: {
    fontSize: 28,
    color: theme.palette.primary.main,
    borderBottom: `solid 3px ${theme.palette.primary.main}`,
    padding: 10
  },
  iconsContainer: {
    padding: "10px 0",
    textAlign: "end"
  },
  cardHeader: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    paddingRight: 16
  },
  cardContent: {
    margin: "auto",
    maxWidth: 900
  }
}))

const TarjetaCol = props => {
  const classes = estilosTarjeta();
  return (
    <>
      <Box sx={{ width: '100%' }}>{props.children}</Box>
    </>
  )
}

const VistaColeccion = (props) => {
  const [elevation, setElevation] = useState(3);
  const { handleCerrar, coleccion, value, handleChange } = props;
  const classes = useStyles();
  const classes2 = useStylesv2();
  const { openLienzoCrea, setActiveCollection, setActiveStepCrea } = props;
  const [openSnack, setOpenSnack] = useState(false);
  const [cards, setCards] = useState(null)
  const [reduceCards, setReduceCards] = useState(null)
  
  let history = useNavigate()

  useEffect(() => {
    coleccion.cards.sort((a, b) => ascending(parseInt(a.order), parseInt(b.order)))
    if (coleccion.cards && coleccion.cards.length) {
      const reduce_cards = coleccion.cards.reduce((a, b, i) => {
        let temp = a
        if (i === 1) {
          temp = [{
            type: a['pieces'][0]['type'],
            total: 1
          }]
        }

        const index = temp.find(d => d['type'] === b['pieces'][0]['type'])

        if (index) {
          index.total++
        }
        else {
          temp.push({
            type: b['pieces'][0]['type'],
            total: 1
          })
        }

        return temp
      })


      setCards(coleccion.cards)
      setReduceCards(reduce_cards)

    }

  }, [coleccion])


  useEffect(() => { 
     setTimeout(() => {
            updateLocationHashElement();         
         }, 500);
   
  }, [])

  const scrollHashElement = (sectionHash) =>{  
    const yOffset = -80; 
    const element = document.getElementById(sectionHash);
    if(element){
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({top: y, behavior: 'smooth'});   
    }
  }
  
  
  const updateLocationHashElement = () =>{    
    const url = window.location.href;
    const parts = url.split("#");
    const sectionHash = parts[parts.length -1];
    scrollHashElement(sectionHash);    
  }

  const LightTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: "#000000 ",
      color: "rgba(251, 251, 251)",
      boxShadow: theme.shadows[1],
      fontSize: 11,
    },
    arrow: {
      color: "#000000 ",
    },
  }))(Tooltip);

  const LightTooltip1 = withStyles((theme) => ({
    tooltip: {
      backgroundColor: "#000000",
      color: "rgba(251, 251, 251)",
      boxShadow: theme.shadows[1],
      fontSize: 11,
    },
    arrow: {
      color: "#000000 ",
    },
  }))(Tooltip);

  const onMouseOverCard = () => {
    setElevation(20);
  };
  const onMouseOutCard = () => {
    setElevation(5);
  };

  // useEffect(() => {
  //   if (props.location.hash) {
  //     const element = document.getElementById(props.location.hash);

  //     if (element) {
  //       setTimeout(() => {
  //         element.style.paddingTop = "70px";

  //         element.scrollIntoView({ behavior: "smooth", block: "start" });
  //       }, 100);
  //     }
  //   }
  // }, [props.location]);
  const handlerLoadSection = (section) =>{       
        let url = window.location.href;
        let parts = url.split("#");       
        if(parts.length>1){
          let hashSection = parts[parts.length -1];
          if(hashSection === section){
              updateLocationHashElement(); 
          }
        }
  }
  
  const renderClave = (clave, i) => {
    return (
      <Chip
        className={classes.chip}
        label={capitalizeFirstLetter(clave)}
        color="secondary"
        key={i + "_keyword"}
        size="small"
      />
    );
  };

  const renderCard = (card, i) => {
    return (
      <div className={classes.card} key={i + "_card"}>
        {card.pieces.map((piece, j) => renderPiece(piece, j, i))}

        {card?.sensibleContent?.added ? (
          <div className={classes.containerIconSensible}>
            <LightTooltip
              title={card?.sensibleContent?.content}
              interactive
              arrow
              PopperProps={{
                modifiers: {
                  offset: {
                    enabled: true,
                    offset: "0px, -10px",
                  },
                },
              }}
            >
              <span sx={{ m: 1 }}>
                <SupervisedUserCircleTwoToneIcon
                  className={classes.iconSensible}
                />
              </span>
            </LightTooltip>
          </div>
        ) : (
          ""
        )}
        {card?.popupContent?.added ? (
          <div className={classes.containerIconPedagogico}>
            {
              <LightTooltip1
                title={card?.popupContent?.content}
                interactive
                arrow
                PopperProps={{
                  modifiers: {
                    offset: {
                      enabled: true,
                      offset: "0px, -10px",
                    },
                  },
                }}
              >
                <span sx={{ m: 1 }}>
                  <SupervisedUserCircleTwoToneIcon
                    className={classes.iconPedagogico}
                  />
                </span>
              </LightTooltip1>
            }
          </div>
        ) : (
          ""
        )}
      </div>
    );
  };

  const renderPiece = (piece, j, i) => {
    if (
      piece.type === "link" ||
      piece.type === "recurso" ||
      piece.type === "galeria" ||
      piece.type === "audio" ||
      piece.type === "video" ||
      piece.type === "documento"
    )
      return (
        <div id={`section${i + 1}`}>
          <br />

          {("value" in piece) ?
            (
              // <ToolbarOpcionesVistaColecciones
              //   copyLink={copyLink}
              //   idSection={`section${i + 1}`}
              //   piece={piece}
              // />
              <></>
            )
            : null}
          <div className={classes.containerElement}>
            <LazyCard  idSection={`section${i + 1}`} handlerLoadSection={handlerLoadSection}>
              <PiezaRecurso
                place={"conoce"}
                key={i + "_recurso"}
                piece={piece}
                lectura={true}
                copyLink={copyLink}
                idSection={`section${i + 1}`}
              />
            </LazyCard>

          </div>

        </div>
      );
    else if (piece.type === "text" || piece.type === "texto") {
      return (
        <div id={`section${i + 1}`}>
          <br />
          <PiezaText
            key={j + "_text"}
            piece={piece}
            value={piece.value}
            lectura={true}
          />
        </div>
      );
    } else if (piece.type === "image" || piece.type === "imagen") {
      return (
        <div id={`section${i + 1}`}>
          <br />
          <ToolbarOpcionesVistaColecciones
            copyLink={copyLink}
            idSection={`section${i + 1}`}
            piece={piece}
          />
          <div className={classes.containerElement}>
            <PiezaImage path={piece.path} portada={false} piece={piece} />
          </div>

        </div>
      );
    } else if (piece.type === "recurso_externo") {
      return (
        <div id={`section${i + 1}`}>
          <br />
          <ToolbarOpcionesVistaColecciones
            copyLink={copyLink}
            idSection={`section${i + 1}`}
            piece={piece}
          />
           <LazyCard  idSection={`section${i + 1}`} handlerLoadSection={handlerLoadSection}>
            <PiezaVideoEmbebido
              path={piece.path}
              input={piece.value}
              text={piece.alt}
              lectura={true}
            />
          </LazyCard>
        </div>
      );
    }
  };



  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const keywords = coleccion["keywords_resources"].concat(
    coleccion["keywords"]
  );

  const copyLink = async (fragment) => {
    let url = window.location.href;
    let parts = url.split("#");
    url = parts[0] +"#" +fragment;
    try {
      await navigator.clipboard.writeText(url);
      window.location.hash = fragment;
      scrollHashElement(fragment);
      //alert copy url

      setOpenSnack(true);
      setTimeout(() => {
        setOpenSnack(false);       
      }, 3000);

    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseSnackBar = () => {
    setOpenSnack(false);
  };

  return (
    <>
      {"cover_page" in coleccion ? (

        <>
          <Box className={classes2.headerCol}>
            <Box className={`${classes2.secondChildHeader} ${classes2.secondChildHeaderCover}`}>
              <Box className={classes2.secondChildHeaderImg}>
                <PiezaImageCSS key={"coverage_image"} piece={coleccion["cover_page"]} path={coleccion["cover_page"]["path"]} portada={true} />
                <Box className={classes2.secondChildHeaderInfo}>
                  <Typography
                    variant="h1"
                  >
                    {coleccion["title"]}
                  </Typography>
                </Box>
              </Box>

            </Box>

          </Box>
        </>
      ) : (
        <>
          <Typography variant="h4" gutterBottom>
            {coleccion["title"]}
          </Typography>
        </>
      )}

      <Box className={classes2.headerCol}>
        {keywords.length > 0 ||
          coleccion["geographicCoverage"].length > 0 ||
          ("start" in coleccion["temporalCoverage"] &&
            "end" in coleccion["temporalCoverage"]) ? (
          <>
            {coleccion["geographicCoverage"].length > 0 ? (
              // <MapaContainer coleccion={coleccion} />
              <>
                <TarjetaCol
                  className={classes2.secondChildHeader}
                  title="Localización"
                >
                  <MapaColombia
                    fColor="#3D4D68"
                    sColor="#dcdcdc"
                    bColor='#3D4D68'
                    dColor='#bfcad9'
                    pColor='#fff'
                    width={2000}
                    height={1000}
                    geo={coleccion["geographicCoverage"]}
                  />
                </TarjetaCol>
              </>
            ) : null}
            {coleccion["temporalCoverage"] && (
              <>
                {/* {"start" in coleccion["temporalCoverage"] &&
                "end" in coleccion["temporalCoverage"] ? (
                <RangoTiempo
                  tiempo={coleccion["temporalCoverage"]}
                  value={[
                    coleccion["temporalCoverage"].start.split("-")[0],
                    coleccion["temporalCoverage"].end.split("-")[0],
                  ]}
                  handleChange={handleChange}
                  activeSlider={true}
                />
              ) : null} */}
              </>
            )}
          </>
        ) : <>
          <TarjetaCol
            className={classes2.secondChildHeader}
            title="Localización"
          >
            <MapaColombia
              fColor="#3D4D68"
              sColor="#dcdcdc"
              bColor='#3D4D68'
              dColor='#bfcad9'
              pColor='#fff'
              width={2000}
              height={1000}
              geo={[]}
            />
          </TarjetaCol>
        </>}

        <Box className={`${classes2.secondChildHeader} ${classes2.secondChildHeaderDes}`}>
          {coleccion["description"]}
        </Box>

        {/* <TarjetaCol
          className={classes2.secondChildHeader}
          title="Metadatos"
        >
          {reduceCards &&
            <Box className={classes2.reduceCards}>
              {reduceCards.map(d => {
                return (
                  <>
                    {d.type !== 'texto' &&
                      <Box className={classes2.reduceIcons}>
                        <div className="icon">
                          {d.type === 'recurso' && (
                            <FolderIcon title={d.type} className={classes.icon} color="white" />
                          )}
                          {d.type === 'audio' && (
                            <FolderOpenIcon title={d.type} className={classes.icon} color="white" />
                          )}
                          {d.type === 'recurso_externo' && (
                            <AudiotrackIcon title={d.type} className={classes.icon} color="white" />
                          )}
                          {d.type === 'galeria' && (
                            <PhotoLibraryIcon title={d.type} className={classes.icon} color="white" />
                          )}
                        </div>
                        <div className="num">{d.total}</div>
                      </Box>
                    }
                  </>
                )
              })}
            </Box>
          }
        </TarjetaCol> */}
      </Box>


      <Box className={classes2.rootContainer}>
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


        {/* <div className={classes.contenedorDescripcion}>
        <Typography
          className={classes.descripcion}
          variant="body1"
          gutterBottom
        >
          {coleccion["description"]}
        </Typography>
      </div> */}


        {cards ?
          <>
            <Controller>
              {cards.map((card, i) => renderCard(card, i))}
            </Controller>

          </>
          : null
        }

        <hr />
        {keywords.length > 0 ? (
          <div className={classes.contenedorChips}>
            {keywords.map((clave, i) => renderClave(clave, i))}
          </div>
        ) : null}

        <VistaColeccionToPrint coleccion={coleccion} />
        {coleccion.category === "Labverdad" && <ButtonToPrint />}
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={openSnack}
          onClose={handleCloseSnackBar}
          message="Enlace copiado..."
          key="1"
          className={classes.snackBar}
        />
      </Box>
    </>
  );
};
const mapStateToProps = (store) => ({
  openLienzoCrea: store.museo.openLienzoCrea,
  activeCollection: store.museo.activeCollection,
});

export default connect(mapStateToProps, museo.actions)(withWidth()(VistaColeccion))