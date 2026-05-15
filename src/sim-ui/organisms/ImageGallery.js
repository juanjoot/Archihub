import { useState, useEffect } from "react";
import * as RecordsService from "../../services/RecordsService";
import CardMedia from "@material-ui/core/CardMedia";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  image: {  
    width: '100%',
    border: 'solid',
    height: '39vw',
    objectFit: 'cover',
    borderColor:'#575757',
    borderRadius: '14%',
    marginBottom: '20px',
    marginTop: '20px',
    borderWidth: '2px'
  },
  image_transform:{
    width: '100%',
    border: 'solid',
    height: '39vw',
    objectFit: 'cover',
    borderColor:'#575757',
    borderRadius: '14%',
    marginBottom: '20px',
    marginTop: '20px',
    borderWidth: '2px',
    transform: 'scale(1.15)'

  }
});

const ImageGallery = (props) => {
  const classes = useStyles();  
  const [loading, setLoading] = useState(false);
  const [record, setRecord] = useState(props.record); 
  const [image, setImage] = useState(null);

  useEffect(() => {
    loadData();
  }, [props.record]);

  const loadData = async () => {
    setLoading(true);
    try {
   
      let res = await RecordsService.serviceImageResize(record.idmongo, 'small');
      setImage(res);
    } catch (error) {
      setImage("/media/cev/pic/logos/LogoCevSpinner.svg");
    }
    setLoading(false);

    // setLoading(false);
  };

  return (
    <>
      {loading && (
        <div className="fa-3x">
          <i className="fas fa-spinner fa-spin"></i>
        </div>
      )}
      {
        <a className="imgGallery" onClick={(e)=>{
          e.preventDefault()
          props.selectionRecord(record)  
          // transform: scale(1.2);        

        }} target="_blank" href={image}>
          
          <img  className={(props.recordSelected && props.recordSelected.ident == record.ident)? classes.image_transform: classes.image} src={image} alt='' />
        </a>
      }
    </>
  );
};

export default ImageGallery;
