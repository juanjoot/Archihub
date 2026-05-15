import { useState, useEffect } from "react";
import CardCollectionSlider from "./CardCollectionSlider";
import * as CollectionService from "../../../services/CollectionService";
import { makeStyles } from "@material-ui/core/styles";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 0 },
    items: 1,
  }
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    overflowX: "auto",
    paddingBottom: '60px'
  },
}));

const ViewSectionMicrositePrincipal = (props) => {
  const classes = useStyles();

  const [loading, setLoading] = useState(true);
  const [section, setSection] = useState(props.section);
  const [collections, setCollections] = useState(null);

  useEffect(() => {
    getCollectionValues();
  }, []);
  useEffect(() => {
    getCollectionValues();
  }, [props.section]);

  const getCollectionValues = async () => {
    if (
      props.section &&
      props.section.metadato &&
      props.section.values &&
      props.section.values.length
    ) {


      const modifYvalues = props.section.values.map((item) => item.value);
      const res = await CollectionService.collectionsByMetadata(
        props.section.metadato,
        modifYvalues
      );
      if (res.length) setCollections(sortCollections(res));
    }
  };

  const sortCollections = (collections) =>{
    if(props.section.relevants && props.section.relevants.length)  {
      const relevantes = props.section.relevants      
      const primeras = collections.filter(collection => relevantes.includes(collection._id))
      const segundas = collections.filter(collection => !relevantes.includes(collection._id))
      const new_array = primeras.concat(segundas);
      return new_array

    }  
    return collections

  }

  const renderCollections = () => {
    return collections.map((collection) => (
        <CardCollectionSlider key = {collection._id}  collection={collection} />
    ));
  };

  return (
    <>
      <div>
        {collections ? (
          <Carousel  arrows={true} showDots={false} responsive={responsive}>
            {renderCollections()}
          </Carousel>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default ViewSectionMicrositePrincipal;
