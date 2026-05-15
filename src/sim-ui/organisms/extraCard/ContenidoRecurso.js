import { createElement, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import * as Icons from '@material-ui/icons';
import * as museo from "../../../store/ducks/museo.duck";
import { connect } from "react-redux"
import Filter9PlusTwoToneIcon from '@material-ui/icons/Filter9PlusTwoTone';
const useStyles = makeStyles((theme) => ({
    content: {
        marginLeft: '10px',
        marginRight: '10px'
    },
    iconos:{
        color:"red"
    }
}));

const CreadorIcono = props => {
        const classes = useStyles();
      return createElement(Icons[props.nombre], { style: { fontSize: '25', padding: '3px' }, className: classes.iconos });

  }

const ContenidoRecurso = props => {
    const {recurso} = props;
    const classes = useStyles();

    const [temporal, setTemporal] = useState(true);
    const [geografica, setGeografica] = useState(true);
    const [palabrasClave, setPalabrasClave] = useState(true);
    const [numeroAgregadoRecurso, setNumeroAgregadoRecurso] = useState(0);
 
    useEffect(() => {

        setTemporal(validacionCoberturaTemporal());        
        setGeografica(validacionCoberturaGeografica()); 
        setPalabrasClave(validacionPalabrasClave());

        if(props.contarEnColeccion===true)
            setNumeroAgregadoRecurso(contarRecurso());

    },[recurso])

    const contarRecurso = () => {
     
        let contador = 0;
        for (let i in props.activeCollection.cards) {
            let card = props.activeCollection.cards[i];
          try{

            contador = contador+ card.pieces.filter(x => x.resource.document.ident === recurso.document.ident).length
          }catch(e){
              console.log(e);
          }
        }
        return contador;
    }

    const validacionCoberturaTemporal = () => {        
        let temp = true;
        try{
            const temporalCoverage = recurso.document.metadata.firstLevel.temporalCoverage;
            const dateStar = new Date(Date.parse(temporalCoverage["start"]))
            const dateEnd = new Date(Date.parse(temporalCoverage["end"]))
            if(dateStar>dateEnd)
                temp = false;
        }catch(e){
            temp = false;
        }
        return temp;
    }

    const validacionCoberturaGeografica = () => { 
        let geo = true;  
        let nuevaLocalizacion = []
        try{
            const arrGeographicCoverage = { ...recurso.document.metadata.firstLevel.geographicCoverage };
          
            for (let i in arrGeographicCoverage) {
                let geographicCoverage = arrGeographicCoverage[i]
                geographicCoverage["ident"] = recurso.document.ident       
                if(geographicCoverage.geoPoint){
                    nuevaLocalizacion.push(geographicCoverage)
                }
            }

            if(nuevaLocalizacion.length<=0)
                geo = false;

        }catch(e){
            geo = false;
            }
          
            return geo;
    }

    const validacionPalabrasClave = () => { 
        let keywords = true;  
        try{

            let nivelMissionHumanRigths = recurso.document.metadata.missionLevel.humanRights; 
            if(typeof nivelMissionHumanRigths === "undefined")
                keywords = false;
        }catch(e){
            keywords = false;
            }
            return keywords;
        }
      
      

    return(
        <>
            <div  className={classes.content}>
           {!temporal?<CreadorIcono nombre={"TimerOffTwoTone"}/>:null}
           {!geografica?<CreadorIcono nombre={"LocationOffTwoTone"}/>:null}
           {!palabrasClave?<CreadorIcono nombre={"SpeakerNotesOffTwoTone"}/>:null}
         
            {numeroAgregadoRecurso>0?              
             <>
                {numeroAgregadoRecurso>9?
                <CreadorIcono nombre={"Filter9PlusTwoTone"}/>:
                <CreadorIcono nombre={`Filter${numeroAgregadoRecurso}TwoTone`}/>}
             </> 
                :null}
              
            </div>
        </>
    )
}

const mapStateToProps = store => ({
    activeCollection: store.museo.activeCollection
});

export default connect(mapStateToProps, museo.actions)(ContenidoRecurso);