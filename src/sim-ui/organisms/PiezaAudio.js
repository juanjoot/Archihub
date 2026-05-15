import { useState } from "react";
import AudioReproductorColeccion from './AudioReproductorColeccion';
import AudioEdicionColeccion  from './AudioEdicionColeccion';
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(theme => ({
    card: {
        position: 'relative',
      //backgroundColor:'#999999',//theme.palette.primary.main,
      width: "100%",
      minWidth: 240,
      margin: "auto",
      transition: "0.3s",
      boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
      "&:hover": {
        boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
      },
      padding : "2px"
    },
    titulo:{
        color:theme.palette.primary.light,
    },
    subtitulo:{
        fontSize: "14px",
        color:theme.palette.primary.light,
    },
         
  }));


  
const PiezaAudio = ( props ) => {
    const {audio, titulo, subtitulo, inicioFragmento, finFragmento, edicion, record, modificacionPieza} = props;

    let initStartSegment = 0
    let initEndtSegment = 0
    if(typeof inicioFragmento !== 'undefined' && 
    typeof finFragmento !== 'undefined' &&  inicioFragmento && finFragmento){
      if(inicioFragmento<finFragmento){
          initStartSegment = inicioFragmento;
          initEndtSegment = finFragmento;
        }else{
          initStartSegment = finFragmento ;
          initEndtSegment = inicioFragmento;
        }
    }
    const [segmentoInicio, setSegmentoInicio] = useState(initStartSegment);
    const [segmentoFin, setSegmentoFin] = useState(initEndtSegment);
    const [editando, setEditando] = useState(false);
    const classes = useStyles();

 
  
   const  handlerGuardarFragmento = (inicio, fin) =>{
        setEditando(false);
        setSegmentoInicio(inicio);
        setSegmentoFin(fin);

        if(modificacionPieza)
          modificacionPieza(definirCambiosPieza(inicio, fin));
   }

   const handlerEdicion = ()=>{
      setEditando(true); 
   }


  const definirCambiosPieza = (inicio, fin) => {
     let retornoCambios ={}
     retornoCambios = {"records":[record],"path":record.filename}    
     retornoCambios["min"] = String(inicio);
     retornoCambios["max"] =  String(fin);    
      return retornoCambios
  }


    return (
        <>
        <Card  className={classes.card}>
        <Grid container direction="column">
        <Grid item container >
           
        {titulo?
            <Typography      
                align="left"
          
                className={classes.titulo}  
                >
                {titulo}
                </Typography>
                
            :null}
             </Grid>
             <Grid item container >
            {subtitulo ?
            <Typography      
            align="left"
       
            className={classes.subtitulo}  
            >
            {subtitulo}
            </Typography>
              :null}
            </Grid>
            <Grid item container >
              {editando &&  edicion?
             
              
                <AudioEdicionColeccion handlerSaveSegment={handlerGuardarFragmento} src={audio}  segmentStart={segmentoInicio} segmentEnd={segmentoFin}  />
                      :
                <AudioReproductorColeccion  color="white" autoPlay={props.playing} handlerEdit={handlerEdicion} src={audio}   segmentStart={segmentoInicio} segmentEnd={segmentoFin} edit={edicion}/>    
              }
              </Grid>
             </Grid>
         </Card>
        </>
        );
}

export default PiezaAudio;