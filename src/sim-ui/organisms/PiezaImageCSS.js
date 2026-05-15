import { useState, useEffect } from "react";
import * as RecordsService from "../../services/RecordsService";
import { makeStyles } from "@material-ui/core/styles";
import ImagenVacia from '../assets/imagen_vacia.jpg';
import PiezaInfo from "./PiezaInfo";
import { Translate } from "@material-ui/icons";
import { width } from "@mui/system";




const PiezaImageCSS = (props) => {
  const { portada, path, piece, handleChangeStatePiece, position } = props
  const useStyles = makeStyles((theme) => ({
    imagenPortada: {
      backgroundSize: "contain",
      width: "calc(100% - 30px)",
      height: "calc(100% - 120px)",
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
      position: props.position ? props.position : 'absolute',
      top: !props.center ? '' : 100,
      left: !props.center ? '' : '50%',
      transform: !props.center ? '' : 'translate(-50%, 0)',
      maxWidth: 800
    },
    imagen: {
      display: "block",
      marginLeft: "auto",
      marginRight: "auto",
      width: "80%",
    }
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
    } else {
      if (path)
        setFileName(path);
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
        let res = await RecordsService.serviceImageResize(recordImage.idmongo, props.size ? props.size : 'medium');
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
            backgroundImage: `url('${image}')`,
            width: props.wh ? props.wh.w : '',
            height: props.wh ? props.wh.h : '',
          }}
        ></div>
      }

    </>

  );
};

export default PiezaImageCSS;
