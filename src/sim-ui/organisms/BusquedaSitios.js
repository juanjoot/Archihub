
import { useState, useEffect } from 'react';
import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Autocomplete from '@material-ui/lab/Autocomplete';
import AddLocationTwoToneIcon from '@material-ui/icons/AddLocationTwoTone';
import { makeStyles } from "@material-ui/core/styles";
import * as SitesService from "../../services/SitesService";
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';

const POSITION_CLASSES = {
    bottomleft: 'leaflet-bottom leaflet-left',
    bottomright: 'leaflet-bottom leaflet-right',
    topleft: 'leaflet-top leaflet-left',
    topright: 'leaflet-top leaflet-right',
  }


const useStyles = makeStyles((theme) => ({
    controlAutocomplete: {
        marginTop: "0px"
    },
    positionClassMobile:{
      width:"100%",
      marginBottom: "10px"
    },   
    textFieldMobile:{
      
      backgroundColor: "rgba(255, 255, 255, 0.8)",        
      width:"100%",
      '&::placeholder': {
        textOverflow: 'ellipsis !important',          
        fontSize:"18px",
        fontWeight: "bold",
      },
      "& > div.MuiAutocomplete-inputRoot[class*='MuiOutlinedInput-root']": {
        padding: "0px",          "& button": {
          order: 3, 
        },
        "& > div.MuiAutocomplete-endAdornment": {
          position: "relative", 
          order: 1,
        },
      },
      
    },
    textFieldRoot: {
        minWidth: "500px",
        backgroundColor: "rgba(255, 255, 255, 0.8)",        
        width:"100%",
        '&::placeholder': {
          textOverflow: 'ellipsis !important',          
          fontSize:"18px",
          fontWeight: "bold",
        },
        "& > div.MuiAutocomplete-inputRoot[class*='MuiOutlinedInput-root']": {
          padding: "0px",          "& button": {
            order: 3, // order 3 means the search icon will appear after the clear icon which has an order of 2
          },
          "& > div.MuiAutocomplete-endAdornment": {
            position: "relative", // default was absolute. we make it relative so that it is now within the flow of the other two elements
            order: 1,
          },
        },
      },
}));

const BusquedaSitios = (props) => {
  const classes = useStyles();
  const {position, seleccionSitio} = props 
  const positionClass =(position && POSITION_CLASSES[position]) || POSITION_CLASSES.topright
  const [opciones, setOpciones] = React.useState([]);
  const [sitio, setSitio] = React.useState(null);

  const cargarOpciones = (data) =>{   
    try{
        let arrOptions = [];
        if(data["hits"].length>0){
          const arrSites = data["hits"]
          for ( const i in arrSites){
            const site = arrSites[i];
            procesarOpcion(site, arrOptions); 
          }
          setOpciones(arrOptions)
        }
      }
      catch(e){
        console.log(e);
      }
  }

  const palabraModificada = (nombre) =>{
    return nombre[0].toUpperCase() + nombre.substring(1).toLowerCase();
  }


  const procesarOpcion = (site, arrOptions ) =>{   
    try{         
      const nombre = nombreOpcion(site);
      arrOptions.push({"name":nombre, "item":site});
    }
    catch(e){
      console.log(e);
    }
  }

  const nombreOpcion = (site) =>{ 
    const propiedades = site["_source"]["properties"];
    let nombre = ""
    if(site["_index"]=="veredas")
      nombre =  palabraModificada(propiedades["NOMBRE_VER"])+" ( "+palabraModificada(propiedades["NOMB_MPIO"])+" , "+palabraModificada(propiedades["NOM_DEP"]) + ")"
    else
      nombre =  palabraModificada(propiedades["NOM_CPOB"])       
    return nombre
//"("+"COLOMBIA,"+propiedades["NOM_DEP"]+","+propiedades["NOMB_MPIO"]+","+propiedades["NOMBRE_VER"]+")"
}

  const cambioBusquedaSitios = (e) =>{
      SitesService.suggestSiteKeyword(e.target.value).then((data) => {
        cargarOpciones(data) 
      }).catch((err) => {   
      
    }); 
  }

  const cambioSitio = (e, value) =>{
    if(value!=null)
      obtencionGeometriaSitio(value);     
  }

  useEffect(() => {
    if(seleccionSitio)
      seleccionSitio(sitio);
 }, [sitio]);
  /*if(seleccionSitio)
  seleccionSitio(site); */

  const obtencionGeometriaSitio = (site) =>{
    SitesService.geometrySite(site.item).then((data) => {
      try{          
        if(data["hits"].length>0){
          const arrSites = data["hits"]
          site["item"] = arrSites[0];    
          setSitio(site);
        }
      }
      catch(e){
        console.log(e);
      }
    }).catch((err) => {   
    
  }); 
}

  return (
      <div   className={
        isWidthDown("md", props.width) ? classes.positionClassMobile : positionClass
        } >
          <div className={
           isWidthDown("md", props.width) ? classes.fabMobile : "leaflet-control"
          }     >                
              <Autocomplete
              id="search-input"
              size="small"
             // noOptionsText= "No hay opciones"
              freeSolo
              onChange={cambioSitio}
              onInputChange={cambioBusquedaSitios}
              getOptionLabel={(option) => (option!==undefined) ? option.name:null}
              options={opciones}
              renderInput={(params) => (
                  <TextField
                  {...params}
                  classes={ isWidthDown("md", props.width) ? {
                      root: classes.textFieldMobile,                        // apply class here
                  }:{  root:classes.textFieldRoot } }
                  placeholder={`Agregue sitios de interes....`}
                  margin="none"
                  variant="outlined"
                  size="small"
                  
                  InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                      <React.Fragment>
                          <IconButton size="small">
                              <AddLocationTwoToneIcon />
                          </IconButton>
                          {params.InputProps.endAdornment}
                      </React.Fragment>
                      ),
                  }}
                  />
              )}
              />
          
          </div>
      </div>

  )
}

export default withWidth()(BusquedaSitios);