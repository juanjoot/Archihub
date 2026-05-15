import { useState, useEffect } from "react";
import * as RecordsService from "../../services/RecordsService";
import { makeStyles } from "@material-ui/core/styles";
import ImagenVacia from '../assets/imagen_vacia.jpg';
import PiezaInfo from "./PiezaInfo";

const useStyles = makeStyles((theme) => ({ 
    imagenPortada:{
        objectFit: "cover",
        width: "100%",
        maxHeight:"350px",
        height: "auto",
        "-moz-box-flex": 1,
        flexGrow: 1
    },
    imagen:{
      display: "block",
      marginLeft: "auto",
      marginRight: "auto",
      width: "100%",
    }    
}));


const PiezaImage  = (props) => {
  const {portada, path, piece,  handleChangeStatePiece, position} = props
  const classes = useStyles();   
  const [filename, setFileName] = useState(null); 
  const [image, setImage] = useState(null);
  const [recordImage, setRecordImage] = useState(null);
  const [loading, setLoading] = useState(false);
  ///const [loading, setLoading] = useState(false);

  useEffect(() => { 
    loadData();
  }, [filename]);
  
 

  const findPathResource =  (piece) => {
    if("resource" in piece){
      const resource = piece["resource"]
      if("document" in resource){
        const records = resource["document"]["records"]
        const filterPathRecords = records.filter(r => r.filename === piece.path);        
        if(filterPathRecords.length>0){
          const recordPath = filterPathRecords[0];
          setRecordImage(recordPath)
        }
      }
   
    }
  }
  useEffect(() => { 
    if(piece){
      if("records" in piece){       
        if(piece.records.length >0){
          setRecordImage(piece.records[0]);
        }
      }else{        
        findPathResource(piece);
      }
    }else{
      if(path)
      setFileName(path);
    }
  }, [piece,path]);

  useEffect(() => {
    if(recordImage)
      loadImagenesResize();
  }, [recordImage]);


  const loadImagenesResize = async () => {
    setLoading(true);
    try {
      
      if(recordImage!=null){
          let res = await RecordsService.serviceImageResize(recordImage.idmongo, 'large');
          setImage(res)
       }else{

       }
    } catch (error) {
      setImage("/media/cev/pic/logos/LogoCevSpinner.svg");
    }
 
    setLoading(false);
  };


  const loadData = async () => {
    setLoading(true);
    try {
      let res = await RecordsService.serviceImage(window.btoa(filename));
      if (res){
        setImage(URL.createObjectURL(res));        
      }
    } catch (error) {
        setImage("/media/cev/pic/logos/LogoCevSpinner.svg");
    }
    setLoading(false);
  };

  return (
    <>
   
      { portada? 
        <>
        {loading?
            <img  className={classes.imagenPortada} src={ImagenVacia} alt='' />
            :
            <img  className={classes.imagenPortada} src={image} alt='' />
        }
        </>
        :
        <> 
          <PiezaInfo piece={piece} position={position}  handleChangeStatePiece={handleChangeStatePiece}/>
          <img  className={classes.imagen} src={image} alt='' />
        </>
      }
      </>
   
  );
};

export default PiezaImage;
