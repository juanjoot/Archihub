import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { Marker ,Popup } from 'react-leaflet'
import {  makeStyles } from '@material-ui/core/styles'
import * as L from "leaflet";
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import IconButton from '@material-ui/core/IconButton'
import DeleteForeverTwoToneIcon from '@material-ui/icons/DeleteForeverTwoTone';
import Grid from '@material-ui/core/Grid'
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import Typography from '@material-ui/core/Typography';
import TextoColeccion from "./TextoColeccion";


function createIcon() {
    return new L.Icon({
      iconUrl: icon,
      shadowUrl: iconShadow
    });
  }

  
const useStyles = makeStyles((theme) => ({

    poup: {
        padding: theme.spacing(0, 0,0, 0),
       // width: "400px"
    },
    contenedor: {
        padding: theme.spacing(0, 0,0, 0),
        width: "300px"
    },

    contenedorMobile: {
        padding: theme.spacing(0, 0,0, 0),
        width: "250px"
    },
 
    gridContainer: {
        margin: theme.spacing(0),
        padding: theme.spacing(0),
      },
    grid: {
        margin: theme.spacing(0),
        padding: theme.spacing(0),
        height:"30px"
      },
    button: {
        margin: theme.spacing(0),
        padding: theme.spacing(0),
        alignItems: "center",
        color:  theme.palette.primary.main
    },
   text: {
        margin: theme.spacing(0),
        color:  theme.palette.primary.main
    }, 
    title: {
        color:  theme.palette.primary.main
    }
  
}));


const  MarcadorPersonalizado = (props) =>{
    const classes = useStyles();
    const {item, index, abrirPopup, eliminar, actualizarDescripcion, lectura} = props
    const [draggable, setDraggable] = useState(false)   
    
    const [position, setPosition] = useState([item.geoPoint.coordinates[1], item.geoPoint.coordinates[0]])
    const markerRef = useRef(null);
    const iconMarker = createIcon(); 
    
    
    useEffect(() => {
     const marker = markerRef.current;       
       if(abrirPopup){
      
         marker.leafletElement.openPopup();
      }else
      { marker.leafletElement.closePopup();}
  }, []);


    const eventHandlers = useMemo(
      () => ({
        dragend() {
          const marker = markerRef.current
          if (marker != null) {
            setPosition(marker.getLatLng())
          }
        },
      }),
      [],
    )
    const toggleDraggable = useCallback(() => {
      setDraggable((d) => !d)
    }, [])

    const actualizar = (ev)=>{
        if(actualizarDescripcion)
          actualizarDescripcion(index,item,ev.target.value)      
    }

    const eliminarMarcador = (ev)=>{
      if(eliminar)
        eliminar(index,item );
    }
 


  //onClick={toggleDraggable}
    return (
      <Marker
        key={"nuevoMarker"+item.code+index}
        index={"indiceMarker"+item.code+index}
        //draggable={draggable}
        //eventHandlers={eventHandlers}
        position={position}
        icon={iconMarker}        
        ref={markerRef}>
          <>
        {lectura? 
        <Popup>            
          <Typography  variant="body2" color="primary">
          Lugar: {item.name}
          </Typography>       
          <Typography variant="body2" color="primary">
          {item.description}
          </Typography>       
        </Popup>
          :
        <Popup  minWidth={90} maxWidth={400} className={classes.poup}>
        <div className={isWidthDown('md', props.width) ? classes.contenedorMobile:classes.contenedor }>
                <Grid container spacing={1}>
                    <Grid container item xs spacing={1}>
                        <Grid className={classes.gridContainer} direction="row"   justifyContent="flex-start"  alignItems="flex-start" container item xs={12}>
                               
                                <Grid justifyContent="flex-start"  alignItems="flex-start"  className={classes.grid}  container  item  xs={11}>
                                     <Typography className={classes.text} variant="body2" color="textSecondary">
                                        Lugar: {item.name}
                                    </Typography>
                                </Grid>
                                <Grid justifyContent="flex-start"  alignItems="center" container  item  xs={1}className={classes.grid} >
                                    <IconButton aria-label="delete" className={classes.button} onClick={eliminarMarcador}>
                                    <DeleteForeverTwoToneIcon />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        <Grid item xs={12}>
                           
                      

                        <Typography className={classes.text} variant="body2" color="textSecondary">
                                  
                            </Typography>
                      
                        <TextoColeccion 
                            variant="outlined"
                            placeholder="Ingresa una descripción"
                            label=""
                            onChange={ev => actualizar(ev)}
                            value={item.description}
                            rows="5"
                       
                            /> 
                        </Grid>
                       
                    </Grid>
                 
                </Grid>
            </div>
        </Popup>}
        </>
      </Marker>
    )
  }


  export default withWidth()(MarcadorPersonalizado);