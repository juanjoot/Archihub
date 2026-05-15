import { useState, forwardRef } from "react";
import { makeStyles } from "@material-ui/core/";
import withWidth, { isWidthDown } from "@material-ui/core/withWidth";
import Cancel from "@material-ui/icons/CancelTwoTone";
import {
  Button,
  Card,
  Typography,
  CardHeader,
  CardContent,
  IconButton,
} from "@material-ui/core/";
import PiezaRecurso from "./PiezaRecurso";
import PiezaText from "./PiezaText";
import PiezaImage from "./PiezaImage";
import PiezaVideoEmbebido from "./PiezaVideoEmbebido";

import KeyboardArrowDownTwoToneIcon from "@material-ui/icons/KeyboardArrowDownTwoTone";
import KeyboardArrowUpTwoToneIcon from "@material-ui/icons/KeyboardArrowUpTwoTone";
import ArrowDropDownTwoToneIcon from "@material-ui/icons/ArrowDropDownTwoTone";
import ArrowDropUpTwoToneIcon from "@material-ui/icons/ArrowDropUpTwoTone";
import DeleteTwoToneIcon from "@material-ui/icons/DeleteTwoTone";
import { useTranslation } from "react-i18next";

import Grid from "@material-ui/core/Grid";
import Popup from "./TooltipInput";
import Tooltip from "@material-ui/core/Tooltip";
import { withStyles } from "@material-ui/core/styles";
import SupervisedUserCircleTwoToneIcon from "@material-ui/icons/SupervisedUserCircleTwoTone";
// import HistoryEduTwoToneIcon from '@mui/icons-material/HistoryEduTwoTone';
import DeleteIcon from "@material-ui/icons/DeleteTwoTone";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
    position: "relative",
    overflow: "visible",
    marginBottom: theme.spacing(2),
    borderWidth: 0.1,
    borderColor: theme.palette.primary.main,
    borderStyle: "solid",
    borderRadius: "16px",
    "& a": {
      color: theme.palette.secondary.main,
    },
    "& a:hover": {
      color: theme.palette.secondary.dark,
    },
  },
  selected: {
    maxWidth: "100%",
    position: "relative",
    overflow: "visible",
    marginBottom: theme.spacing(2),
    borderWidth: 0.1,
    borderColor: theme.palette.primary.main,
    borderStyle: "solid",
    "& a": {
      color: theme.palette.secondary.main,
    },
    "& a:hover": {
      color: theme.palette.secondary.dark,
    },
  },
  ident: {
    position: "absolute",
    top: "-14px",
    background: "white",
    padding: "5px",
    fontSize: "11px",
    left: "10px",
    color: theme.palette.primary.main,
  },

  delete: {
    position: "absolute",
    top: "5px",
    background: "white",
    padding: "3px",
    right: "10px",
    color: theme.palette.primary.main,
  },
  up: {
    position: "absolute",
    top: "5px",
    padding: "3px",
    right: "70px",
    color: theme.palette.primary.main,
  },

  down: {
    position: "absolute",
    top: "5px",
    padding: "3px",
    right: "40px",
    color: theme.palette.primary.main,
  },

  deleteMobile: {
    position: "absolute",
    top: "3px",
    background: "white",
    padding: "2px",
    right: "4px",
    color: theme.palette.primary.main,
  },
  upMobile: {
    position: "absolute",
    top: "-4px",
    padding: "2px",
    right: "27px",
    color: theme.palette.primary.main,
  },

  downMobile: {
    position: "absolute",
    top: "10px",
    padding: "2px",
    right: "27px",
    color: theme.palette.primary.main,
  },
  flexCard: {
    border: "none",
    boxShadow: "none",
    display: "flex",
  },
  header: {
    paddingBottom: "5px",
  },
  content: {
    padding: "15px",
  },
  TextoPedagogica: {
    color: theme.palette.primary.main,
  },
  bloqueFormulario: {
    marginTop: "20px",
    marginLeft: "10px",
    marginBottom: "6px",
    width: "100%",
  },
  buttonPedag: {
    color: theme.palette.primary.main,
    textTransform: "none",
    width: "159px",
    justifyContent: "left",
    margin: theme.spacing(1),
    borderRadius: "5em",
  },
  containerIconSensible: {
    position: "absolute",
    top: "4px",
    right: "150px",
  },
  iconSensible: {
    //marginTop: "50px",
    fontSize: 30,
    color: theme.palette.error.dark,
  },
  containerIconPedagogico: {
    position: "absolute",
    top: "4px",
    right: "100px",
  },
  iconPedagogico: {
    fontSize: 30,
    color: theme.palette.info.dark,
  },
}));

const TarjetaColeccion = (props) => {
  const classes = useStyles();

  const [elevation, setElevation] = useState(0);
  const [header, setHeader] = useState(true);
  const {
    card,
    handleChangeCard,
    innerRef,
    placeholder,
    value,
    position,
  } = props;
  const [openPopup, setOpenPopup] = useState(false);
  const [openSensiblePopup, setOpenSensiblePopup] = useState(false);
  const [titleSensible, setTitleSensible] = useState("");
  const [titleContent, setTitleContent] = useState("");

  let titulo = "";

  const [anchorEl, setAnchorEl] = useState(null);

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
      color: "#000000",
    },
  }))(Tooltip);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  //const { card, handleChangeCard, innerRef } = props
  //let titulo = ""

  const [t, i18n] = useTranslation("common");

  const onMouseOverThis = () => {
    // setElevation(10)
    //setHeader(true)
    //console.log("over mouse")
  };
  const onMouseOutThis = () => {
    // setElevation(0)
    //setHeader(false)
    // console.log("out mouse")
  };

  const handleChangePieceResource = (position, piece) => {
    const editCard = { ...card };
    editCard.pieces[position] = piece;
    handleChangeCard("edit", editCard);
  };

  const handleChangeValuePiece = (value, position) => {
    const editCard = { ...card };
    editCard.pieces[position].value = value;
    handleChangeCard("edit", editCard);
  };



  const handleChangeVideoPiece = (path, input, position, alt) => {
    const editCard = { ...card };
    editCard.pieces[position].path = path;
    editCard.pieces[position].value = input;
    editCard.pieces[position].alt = alt;
    handleChangeCard("edit", editCard);
  };

  const deleteCard = () => {
    const editCard = { ...card };
    handleChangeCard("delete", editCard);
  };

  const upCard = () => {
    const editCard = { ...card };
    handleChangeCard("up", editCard);
  };

  const downCard = () => {
    const editCard = { ...card };
    handleChangeCard("down", editCard);
  };
  /*
  const addTextPiece = () => {
    const editCard = { ...card }
    handleChangeCard("addText", editCard)
  }*/

  const handleChangePiece = (action, card, piece, position) => {
    handleChangeCard(action, card, piece, position);
  };

  //Tooltip Delicado
  const handleSensibleContent = (e, text) => {
    const editCard = { ...card };
    if (text !== "") {
      editCard.sensibleContent = { added: true, content: text };
      setTitleSensible(text);
    } else {
      editCard.sensibleContent = { added: false };
    }
    handleChangeCard("edit", editCard);
  };

  //Tooltip Pedagógico
  const handlePopupContent = (e, text) => {
    const editCard = { ...card };
    if (text !== "") {
      editCard.popupContent = { added: true, content: text };
      setTitleContent(text);
    } else {
      editCard.popupContent = { added: false };
    }
    handleChangeCard("edit", editCard);
  };

  const deleteSensible = () => {
    setTitleSensible("");
    const editCard = { ...card };
    editCard.sensibleContent = { added: false, content: "" };
    handleChangeCard("edit", editCard);
  };

  const deletePedagogico = () => {
    setTitleContent ("");
    const editCard = { ...card };
    editCard.popupContent = { added: false, content: "" };
    handleChangeCard("edit", editCard);
  };

  if (card.pieces[0].type === "texto" || card.pieces[0].type === "text")
    titulo = "Texto";
  if (card.pieces[0].type === "recurso" || card.pieces[0].type === "link")
    titulo = "Recurso";
  if (card.pieces[0].type === "imagen" || card.pieces[0].type === "image")
    titulo = "Imagen";
  if (card.pieces[0].type === "recurso_externo")
    titulo = t("crea.narrativeManager.resources.addExternalResource");

  return (
    <Card
      ref={innerRef}
      elevation={elevation}
      className={classes.root}
      key={card.id}
      onMouseOver={onMouseOverThis}
      onMouseOut={onMouseOutThis}
    >
      {titulo !== "" && (
        <Typography className={classes.ident}>{titulo}</Typography>
      )}
      {header && (
        <CardHeader
          className={classes.header}
          action={
            <>
              {/* <Button
                color="default"
                size="small"
                className={classes.button}
                startIcon={<TextFields />}
                onClick={addTextPiece}
              >
                aregar texto
             </Button>*/}
              {isWidthDown("md", props.width) ? (
                <>
                  <IconButton
                    aria-label="settings"
                    onClick={upCard}
                    className={classes.upMobile}
                  >
                    <ArrowDropUpTwoToneIcon />
                  </IconButton>
                  <IconButton
                    aria-label="settings"
                    onClick={downCard}
                    className={classes.downMobile}
                  >
                    <ArrowDropDownTwoToneIcon />
                  </IconButton>
                  <IconButton
                    aria-label="settings"
                    onClick={deleteCard}
                    size="small"
                    className={classes.deleteMobile}
                  >
                    <DeleteTwoToneIcon />
                  </IconButton>
                </>
              ) : (
                <>
                  <IconButton
                    aria-label="settings"
                    onClick={upCard}
                    className={classes.up}
                  >
                    <KeyboardArrowUpTwoToneIcon size="small" />
                  </IconButton>
                  <IconButton
                    aria-label="settings"
                    onClick={downCard}
                    className={classes.down}
                  >
                    <KeyboardArrowDownTwoToneIcon size="small" />
                  </IconButton>
                  <IconButton
                    aria-label="settings"
                    onClick={deleteCard}
                    className={classes.delete}
                    size="small"
                  >
                    <Cancel />
                  </IconButton>
                </>
              )}
            </>
          }
        />
      )}

      <CardContent className={classes.content}>
        {card.pieces.map((piece, i) => {
          if (piece.type === "link" 
            || piece.type === "recurso" 
            || piece.type === "galeria"
            || piece.type === "audio"
            || piece.type === "video" 
            || piece.type === "documento")
          { 
           
            return (<> 
              <PiezaRecurso 
              place={"crea"}
              key={i + "_recurso"} 
              piece={piece} 
              position={i} 
              card={card} 
              handleChangePieceResource={handleChangePieceResource}
              lectura={false}
               /> </>)
            }
          else if (piece.type === "text" || piece.type === "texto")
            return (<PiezaText
              key={i + "_text"}
              placeholder="Agregar el texto .... "
              label=""
              value={piece.value}
              handleChangeTextPiece={handleChangeValuePiece} 
              handleChangePiece ={handleChangePiece} 
              piece={piece} 
              card={card} 
              position={i}
              rows="3" />)
          else if (piece.type === "image" || piece.type === "imagen")
            return (
              <PiezaImage 
              key={i + "_image"}
              path={piece.path} 
              piece={piece} 
              portada={false} 
              position={i} 
              handleChangeStatePiece ={handleChangeValuePiece} />
            );
          else if (piece.type === "recurso_externo")
            return (
              <PiezaVideoEmbebido
                path={piece.path}
                input={piece.value}
                text={piece.alt}
                handleChangeVideoPiece={handleChangeVideoPiece}
                position={i}
              />
            );
        })}
        <div>
          <Grid
            className={classes.bloqueFormulario}
            container
            wrap="nowrap"
            spacing={1}
          >
            <Typography className={classes.TextoPedagogica} variant="subtitle1">
              Agregar ayuda Pedagógica
            </Typography>
          </Grid>
          <Grid
            className={classes.bloqueFormulario}
            container
            wrap="nowrap"
            spacing={2}
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
          >
            <Button
              className={classes.buttonPedag}
              aria-describedby={id}
              variant="contained"
              onClick={() => setOpenSensiblePopup(true)}
            >
              Contenido Sensible
            </Button>

            <Button
              className={classes.buttonPedag}
              aria-describedby={id}
              variant="contained"
              onClick={() => setOpenPopup(true)}
            >
              Contenido Pedagógico
            </Button>
            <Popup
              title="Agregar Tooltip"
              title2="Ingresa el texto"
              openPopup={openPopup}
              setOpenPopup={setOpenPopup}
              onConfirmPopup={handlePopupContent}
            />
            <Popup
              title="Agregar Tooltip"
              title2="Ingresa el texto"
              openPopup={openSensiblePopup}
              setOpenPopup={setOpenSensiblePopup}
              onConfirmPopup={handleSensibleContent}
            />
          </Grid>
        </div>
      </CardContent>
      {card?.sensibleContent?.added ? (
        <div className={classes.containerIconSensible}>
          <LightTooltip
            title={titleSensible}
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
              <DeleteIcon
                onClick={deleteSensible}
                color="primary"
                fontSize="small"
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
              title={titleContent}
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
                {/* <HistoryEduTwoToneIcon className={classes.iconPedagogico} fontSize="30" /> */}
                <SupervisedUserCircleTwoToneIcon
                  className={classes.iconPedagogico}
                />
                <DeleteIcon
                  onClick={deletePedagogico}
                  color="primary"
                  fontSize="small"
                />
              </span>
            </LightTooltip1>
          }
        </div>
      ) : (
        ""
      )}
    </Card>
  );
};

export default withWidth()(
  forwardRef((props, ref) => (
    <TarjetaColeccion innerRef={ref} {...props} />
  ))
);
