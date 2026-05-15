import { useState, useRef } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles'
import BorderColorTwoToneIcon from '@material-ui/icons/BorderColorTwoTone';
import SaveTwoToneIcon from '@material-ui/icons/SaveTwoTone';
import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";
import { useTranslation } from "react-i18next";
import { v4 as uuidv4 } from "uuid";


const useStyles = makeStyles((theme) => ({  

  fab: {
    position: 'fixed',
    top: 5,
    zIndex: 5,
    backgroundColor: 'white',
    color: theme.palette.secondary.main,
    '&:hover': {
        backgroundColor: theme.palette.secondary.main,
        color: 'white'
    }
  },
  blockquote: {   
    background: "#f9f9f9",
    borderLeft: "10px solid #ccc",
    margin: "1.5em 10px",
    padding: "0.5em 10px",
    quotes: '"' 
  },
  contenedor:{
    width: "100%",
    marginTop: "20px", 
    maxHeight: "300px"
  },
  contenedorEditor:{
    marginBottom: "30px",
    marginTop: "30px"
  }

}));

const LightTooltip = withStyles(theme => ({
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


const FragmentoTexto = props => {
  const [t, i18n] = useTranslation("common");
  const classes = useStyles();
  const {contenido ,modificacionPieza, pieza, lectura} = props; 
  
  let tieneFragmento = false
  let texto = ""

  if (pieza)
    if (pieza.text) {
      tieneFragmento = true;
      texto = pieza.text;
    }

  const [mostrarFragmento, setMostrarFragmento] = useState(tieneFragmento)
  const [fragmento, setFragmento] = useState(texto)  
  const id = "spanIdcontent_"+uuidv4();

 const guardarFramentoTexto = () =>{
   let seleccion = "";
    if (window.getSelection) { // non-IE
      var userSelection = window.getSelection();
      var rangeObject = userSelection.getRangeAt(0);
      if (rangeObject.startContainer === rangeObject.endContainer) {
        if(rangeObject.startContainer.parentNode.id ===id)
          seleccion = userSelection.toString();
      }else if (document.selection && document.selection.type!="Control" ) { // IE lesser
        var userSelection = document.selection.createRange();
        var spanElement = document.getElementById(id);
        if(userSelection.parentElement()===spanElement)
          seleccion = userSelection.text;
      } 
    
    } 
    if(seleccion!== ""){
      setFragmento(seleccion);
      setMostrarFragmento(true);     
      if(modificacionPieza)  
      modificacionPieza({"records":[props.record],"text":seleccion});  
    }
    
  }
    const editarFramentoTexto = () =>{  
      setMostrarFragmento(false);
    }

    return (      
      <>    
            {mostrarFragmento?
            <>
              {!lectura? 
               <div     className={classes.contenedorEditor}>
                <LightTooltip
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
                title={t("crea.narrativeManager.textFragment.bottonEdit")}>
               <Fab  
               color="white"
               size="small"
               className={classes.fab}
                onClick={editarFramentoTexto}
                 >
                              <BorderColorTwoToneIcon />    
                </Fab>    
                </LightTooltip>    
                </div>    
              :null
              }
              
              <blockquote  className={classes.blockquote} >
                  <p style={{whiteSpace: "pre-line"}}>{fragmento}</p>
              </blockquote>             
            </>
            :
            <>
     
            {!lectura? 
               <div     className={classes.contenedorEditor}>
              <LightTooltip
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
               title={t("crea.narrativeManager.textFragment.bottonSave")}>
           
              <Fab  
              color="white"
              size="small"
              className={classes.fab}
              onClick={guardarFramentoTexto}
                >
                <SaveTwoToneIcon />    
              </Fab>
             </LightTooltip>
             </div>
            :null}
            <div     className={classes.contenedor}>
              <span id={id} style={{whiteSpace: "pre-line"}}>
                {contenido}
              </span>
            </div>
          </>
            }    
         
      </>
    );
  
}

export default FragmentoTexto