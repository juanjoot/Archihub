import { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Lottie from "react-lottie";
import animationData from "../../assets/loading_cev_explora.json";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import LocationOnOutlined from "@material-ui/icons/LocationOnOutlined";
import VolumeUpOutlined from "@material-ui/icons/VolumeUpOutlined";
import * as RecordsService from "../../services/RecordsService";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Link } from "react-router-dom";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import Typography from "@material-ui/core/Typography";
import ImageOutlined from "@material-ui/icons/ImageOutlined";
import LinkOutlined from "@material-ui/icons/LinkOutlined";
import VideocamOutlined from "@material-ui/icons/VideocamOutlined";
import TextFieldsOutlined from "@material-ui/icons/TextFieldsOutlined";
import InfoOutlined from "@material-ui/icons/InfoOutlined";
import LabelImportant from "@material-ui/icons/LabelImportant";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  image: {
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  contenedor: {
    marginTop: "20%",
   
    backgroundColor: "#3441728c",
    height: "250px",
    [theme.breakpoints.down("xs")]: {
      marginTop: "60%",
      height: "170px",
    },
    // [theme.breakpoints.down("sm")]: {
    //   height: "390px",
    // },
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  icon: {
    color: "white",
  },
  iconContainer: {
    display: "flex",
    justifyContent: "space-between",
    gap: "10px",
    marginTop: "20px",
    [theme.breakpoints.down("xs")]: {
      marginTop: "10px",
      
    },
  },
  title: {
    lineHeight: "50px",
    fontWeight: "600",
    [theme.breakpoints.down("xs")]: {
      fontWeight: "600",
      lineHeight: "20px",
    },
  },
  description: {
    flex: "0 53%",
    lineHeight: "20px",
    fontSize: "larger",
    marginTop: "20px",
    [theme.breakpoints.down("xs")]: {
      marginTop: "10px",
      lineHeight: "16px",
    },
  },
  secondContainer: {
    paddingLeft: "10vmax",
    paddingRight: "8vmax",
    [theme.breakpoints.down("xs")]: {
      paddingLeft: "1vmax",
      paddingRight: "1vmax",
    },
  },
  separator: {
    backgroundColor: "white",
    border: "0 none",
    color: "#white",
    height: "1.2px",
    marginTop: "0px",
  },
  chips: {
    color: "black",
    backgroundColor: "white",
    marginRight: "15px",
    marginBottom: "3px",
  },
}));

const CardCollectionSlider = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("/media/cev/pic/logos/LogoCevSpinner.svg");
  const [collection, setCollection] = useState(props.collection);
  const [types, setTypes] = useState([]);
  const [small, setSmall] = useState(matches);

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

  const getIcon = (icon) => {
    switch (icon) {
      case "recurso":
      case "recurso_externo":
        return <LibraryBooks className={classes.icon} />;
        break;
      case "texto":
      case "text":
        return <TextFieldsOutlined className={classes.icon} />;
        break;
      case "imagen":
      case "galeria":
      case "image":
        return <ImageOutlined className={classes.icon} />;
        break;
      case "link":
        return <LinkOutlined className={classes.icon} />;
        break;
      case "enlace_video":
        return <VideocamOutlined className={classes.icon} />;
        break;

      default:
        return <InfoOutlined className={classes.icon} />;

        return;
        break;
    }
  };

  const renderIcons = () => {
    if (types.length) return types.map((type) => getIcon(type));
  };

  const cutText = (text, limit) => {
    let newText = text.slice(0, limit);
    if (text.length > limit) return newText + "...";
    return newText;
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

  const renderChips = () => {
    if (collection && collection.keywords && collection.keywords.length) {
      return collection.keywords.map((keyword, index) => (
        <Chip
          key={index}
          size="small"
          className={classes.chips}
          variant="outlined"
          icon={<LabelImportant style={{ color: "#b8b8b8" }} />}
          label={keyword}
        />
      ));
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

      <Card elevation={0} className={classes.root}>
        <CardActionArea
          elevation={6}
          className={classes.image}
          style={{
            backgroundImage: `url(${image})`,
          }}
        >
          <CardContent className={classes.contenedor}>
            <div className={classes.secondContainer}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <Link to={`/${props.collection._id}`}>
                  <Typography
                    className={classes.title}
                    style={{ color: "white" }}
                    gutterBottom
                    variant={matches ? "h5" : "h3"}
                    component={matches ? "h5" : "h3"}
                  >
                    {matches
                      ? cutText(props.collection.title, 35)
                      : cutText(props.collection.title, 70)}
                  </Typography>
                </Link>
              </div>
              <hr className={classes.separator} />
              <Typography
                className={classes.description}
                style={{ color: "white" }}
                variant="body2"
                color="textSecondary"
                component="p"
              >
                {matches
                  ? cutText(props.collection.description, 100)
                  : cutText(props.collection.description, 200)}
              </Typography>
              <div className={classes.iconContainer}>
                <div
                  style={{
                    display: "flex",
                    overflow: "auto",
                    overflowX: "hidden",
                  }}
                >
                  {renderChips()}
                </div>
              </div>
            </div>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
};

export default CardCollectionSlider;
