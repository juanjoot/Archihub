import { useState, useEffect } from "react";
import * as RecordsService from "../../services/RecordsService";
import { makeStyles } from "@material-ui/core/styles";
import ImagenVacia from '../assets/imagen_vacia.jpg';
import PiezaInfo from "./PiezaInfo";




const PiezaImageCSS = (props) => {
  const { portada, path, piece, handleChangeStatePiece, position } = props
  const useStyles = makeStyles((theme) => ({
    imagenPortada: {
      backgroundSize: "cover",
      width: "100%",
      height: "100%",
      backgroundPosition: 'center center',
      position: props.position ? props.position : 'fixed',
      top: 0,
      zIndex: 0
    },
    // blurImage: {
    //   content: '',
    //   width: '100%',
    //   height: '100%',
    //   position: 'absolute',
    //   backdropFilter: 'brightness(35%) Blur(30px)',
    // }
  }));
  const classes = useStyles();
  const [filename, setFileName] = useState(null);
  const [image, setImage] = useState(null);
  const [recordImage, setRecordImage] = useState(null);
  const [loading, setLoading] = useState(false);
  ///const [loading, setLoading] = useState(false);

  useEffect(() => {
    filename && loadData();
  }, [filename]);

  useEffect(() => {
    if (piece) {
      if ("records" in piece) {
        if (piece.records.length > 0) {
          setRecordImage(piece.records[0])
        }
      }
    }
  }, [piece, path]);

  useEffect(() => {
    if (recordImage)
      loadImagenesResize();
  }, [recordImage]);

  const loadImagenesResize = async () => {
    setLoading(true);
    try {
      if (recordImage != null) {
        let res = await RecordsService.serviceImageResize(recordImage.idmongo, 'blur');
        if (res) {
          if (res.status !== 500) {
            setImage(res);
          } else
            setImage("/media/cev/pic/logos/LogoCevSpinner.svg");
        }
      } else {

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
      if (res) {
        var blob = new Blob([res], { type: 'image/jpg' })

        setImage(window.URL.createObjectURL(blob));

      }
    } catch (error) {
      setImage("/media/cev/pic/logos/LogoCevSpinner.svg");
    }
    setLoading(false);
  };


  return (
    <>


      {loading ?
        <div
          className={classes.imagenPortada}
          style={{
            backgroundImage: `url('${ImagenVacia}')`
          }}
        ></div>
        :
        <div
          className={classes.imagenPortada}
          style={{
            backgroundImage: `url('${image}')`
          }}
        >

          <div className={classes.blurImage}></div>

        </div>
      }

    </>

  );
};

export default PiezaImageCSS;
