import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Lottie from "react-lottie";
import animationData from "../../assets/loading_cev_explora.json";
import * as RecordsService from "../../services/RecordsService";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import Typography from "@material-ui/core/Typography";
import ImageTwoTone from "@material-ui/icons/ImageTwoTone";
import LinkTwoTone from "@material-ui/icons/LinkTwoTone";
import VideocamTwoTone from "@material-ui/icons/VideocamTwoTone";
import TextFieldsTwoTone from "@material-ui/icons/TextFieldsTwoTone";
import InfoTwoTone from "@material-ui/icons/InfoTwoTone";
import LibraryBooksTwoTone from "@material-ui/icons/LibraryBooksTwoTone";
import { useTheme } from "@material-ui/core/styles";
import { cutText } from "../utils/utils";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 0,
    height: "100%",
    boxShadow: "3px 3px 10px -3px rgba(0,0,0,0.5)",
  },
  image: {
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100%",
  },
  backgroundContainer: {
    paddingTop: "50%",
    height: "100%",
    display: "flex",
  },
  contenedor: {
    backgroundColor: "#08080899",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "10px !important",
    minHeight: "120px",
    width: "100%",
  },
  flexDiv: {
    display: "flex",
    alignItems: "flex-start",
    position: "relative",
    padding: "0 0 0 5px",
  },
  icon: {
    color: "white",
  },
  group: {
    position: "absolute",
    left: "-10px",
    top: "-10px",
    height: "22px",
    width: "9px",
    backgroundColor: "#e04b4c",
  },
  groupHeader: {
    position: "absolute",
    color: "white",
    left: 0,
    top: 0,
    padding: "0 10px",
    width: "auto",
    backgroundColor: "#e04b4c",
    fontWeight: "bold",
  },
  iconContainer: {
    display: "flex",
    gap: "10px",
    justifyContent: "end",
  },

  title: {
    lineHeight: "1.1",
    fontWeight: "700",
    maxWidth: "80%",
  },
  description: {
    flex: "0 53%",
    lineHeight: "15px",
  },
  cevLogo: {
    position: "absolute",
    right: 0,
    width: "30px",
    maxWidth: "15%",
  },
}));

const CardCollection = (props) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("/media/cev/pic/logos/LogoCevSpinner.svg");
  const [collection, setCollection] = useState(props.collection);
  const [types, setTypes] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    loadImage();
  }, []);
  useEffect(() => {
    getTypes();
  }, [collection]);

  const getTypes = () => {
    let types = [];
    if (collection && collection.cards && collection.cards.length) {
      collection.cards.forEach((element) => {
        if (element.pieces && element.pieces.length) {
          element.pieces.forEach((piece) => {
            //si no está en el array pongalo
            if (piece.type && !types.includes(piece.type))
              types.push(piece.type);
          });
        }
      });
    }
    setTypes(types);
  };

  const getIcon = (icon, i) => {
    switch (icon) {
      case "recurso":
      case "recurso_externo":
        return <LibraryBooksTwoTone key={i} className={classes.icon} />;
      case "texto":
      case "text":
        return <TextFieldsTwoTone key={i} className={classes.icon} />;
      case "imagen":
      case "galeria":
      case "image":
        return <ImageTwoTone key={i} className={classes.icon} />;
      case "link":
        return <LinkTwoTone key={i} className={classes.icon} />;
      case "enlace_video":
        return <VideocamTwoTone key={i} className={classes.icon} />;
      default:
        return <InfoTwoTone key={i} className={classes.icon} />;
    }
  };

  const renderIcons = () => {
    if (types.length) return types.map((type, index) => getIcon(type, index));
  };

  const loadImage = async () => {
    try {
      let res = await RecordsService.serviceImage(
        window.btoa(props.collection.cover_page.path)
      );
      if (res) {
        setImage(URL.createObjectURL(res));
      }
    } catch (error) {
      setImage("/media/cev/pic/logos/LogoCevSpinner.svg");
    }
  };

  return (
    <>
      {loading && (
        <div className="loading_viz">
          <Lottie
            height={150}
            width={150}
            options={{
              loop: true,
              autoplay: true,
              animationData: animationData,
              rendererSettings: {
                preserveAspectRatio: "xMidYMid slice",
              },
            }}
          />
        </div>
      )}

      <Link to={`/${props.collection._id}`}>
        <Card
          raised={true}
          elevation={0}
          className={classes.root}
          sx={{ borderRadius: 0 }}
        >
          <CardActionArea
            className={classes.image}
            style={{ backgroundImage: `url(${image})` }}
          >
            <span
              className={classes.groupHeader}
              style={{
                backgroundColor:
                  props.collection.type === "Catálogo"
                    ? "#e04b4c"
                    : theme.palette.all.main,
              }}
            >
              {props.collection.type}
            </span>
            <div className={classes.backgroundContainer}>
              <CardContent className={classes.contenedor}>
                <div className={classes.flexDiv}>
                  <span
                    className={classes.group}
                    style={{
                      backgroundColor:
                        props.collection.type === "Catálogo"
                          ? "#e04b4c"
                          : theme.palette.all.main,
                    }}
                  ></span>

                  <Typography
                    className={classes.title}
                    style={{ color: "white" }}
                    gutterBottom
                    variant="h6"
                    component="h6"
                  >
                    {cutText(props.collection.title, 30)}
                  </Typography>
                  <img
                    className={classes.cevLogo}
                    src="/media/cev/pic/logos/LogoInforme.svg"
                    alt="cev"
                  />
                </div>
                <Typography
                  className={classes.description}
                  style={{ color: "white", paddingLeft: "10px" }}
                  variant="body2"
                  color="textSecondary"
                  component="small"
                >
                  {cutText(props.collection.description, 100)}
                </Typography>

                <div className={classes.iconContainer}>{renderIcons()}</div>
              </CardContent>
            </div>
          </CardActionArea>
        </Card>
      </Link>
    </>
  );
};

export default CardCollection;
