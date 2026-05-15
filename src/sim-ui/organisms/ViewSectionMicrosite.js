import { useState, useEffect } from "react";
import CardCollection from "./CardCollection";
import { collectionsByMetadata } from "../../services/CollectionService";
import { makeStyles } from "@material-ui/core/styles";
import Carousel from "react-multi-carousel";
import Typography from "@material-ui/core/Typography";
import "react-multi-carousel/lib/styles.css";
import { col_conoce, col_explora } from "./HomeDesktop";
import { iteratee } from "lodash";

const colors = {
  blanco: "white",
  azul: "#2A5080",
  rojo: col_explora.main,
  verde: col_conoce.main,
};

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 4,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 600 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 600, min: 0 },
    items: 2,
  },
};

const useStyles = makeStyles((theme) => ({
  root: {
    overflowX: "auto",
  },
  carousel: {
    "& .carousel-item-p": {
      padding: "12px 5px",
    },
  },
  groupContainer: {
    position: "relative",
    marginBottom: "2em",
    paddingTop: "2em",
    paddingLeft: "10vmax",
    paddingRight: "8vmax",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "15px",
      paddingRight: "15px",
    },
    [theme.breakpoints.down("xs")]: {
      paddingLeft: "5px",
      paddingRight: "5px",
    },
  },
  titleSection: {
    fontWeight: "800",
    marginBottom: "0.5em",
    color: "rgb(42 80 128)",
  },
  subtitle: {
    opacity: "20%",
    fontWeight: "800",
    textAlign: "right",
    transform: "translate(0, -70%)",
    fontSize: "15vw",
    marginBottom: "-15%",
    [theme.breakpoints.up("md")]: {
      transform: "translate(-40%, -40%)",
      fontSize: "10vw",
      marginBottom: "-5%",
    },
  },
}));

const ViewSectionMicrosite = (props) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [section, setSection] = useState(props.section);
  const [collections, setCollections] = useState(null);

  useEffect(() => {
    getCollectionValues();
  }, []);

  const getCollectionValues = async () => {
    if (
      section &&
      section.metadato &&
      section.values &&
      section.values.length
    ) {
      const modifYvalues = section.values.map((item) => item.value);
      const res = await collectionsByMetadata(
        section.metadato,
        modifYvalues
      );
      let collections = [];
      if (res && res.hits && res.hits.hits && res.hits.hits.length) {
        collections = res.hits.hits.map((item) => {
          if (item._source) {
            item._source._id = item._id;
            return item._source;
          }
        });
        setCollections(sortCollections(collections));
      }
    }
  };

  const sortCollections = (collections) => {
    if (props.section.relevants && props.section.relevants.length) {
      const relevantes = props.section.relevants;
      const primeras = collections.filter((collection) =>
        relevantes.includes(collection._id)
      );
      const segundas = collections.filter(
        (collection) => !relevantes.includes(collection._id)
      );
      const new_array = primeras.concat(segundas);
      return new_array;
    }
    return collections;
  };

  const renderCollections = () =>
    collections.map((collection, index) => {
      if (collection.slug)
        return <CardCollection key={index} collection={collection} />;
    });

  return (
    <div className={classes.root}>
      {collections && (
        <div
          className={classes.groupContainer}
          style={{
            background: `linear-gradient(180deg, ${
              colors[section.color]
            } 80%, #FFF 80%, #FFF 100%)`,
          }}
        >
          <Typography
            variant="h3"
            className={classes.titleSection}
            style={{
              color: `${section.color !== "blanco" ? "white" : colors.azul}`,
            }}
          >
            {section.title}
          </Typography>

          {section.subtitle !== "" && (
            <Typography
              variant="h1"
              component="h4"
              className={classes.subtitle}
              style={{
                color: `${section.color !== "blanco" ? "white" : colors.azul}`,
              }}
            >
              {section.subtitle}
            </Typography>
          )}
          <Carousel
            arrows={false}
            showDots={false}
            responsive={responsive}
            className={classes.carousel}
            itemClass="carousel-item-p"
          >
            {renderCollections()}
          </Carousel>
        </div>
      )}
    </div>
  );
};

export default ViewSectionMicrosite;
