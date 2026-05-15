
import { useState, useEffect, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Edit from '@material-ui/icons/EditTwoTone';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddAPhotoIcon from '@material-ui/icons/AddAPhotoTwoTone';
import SelectorColeccion from "./SelectorColeccion";
import ImagenVacia from '../assets/imagen_vacia.jpg';
import ContenedorElemento from "./ContenedorElemento"
import TextoColeccion from './TextoColeccion';
import LugarColeccion from './LugarColeccion';
import CreadorColeccion from './CreadorColeccion';
import DrawerImagen from './DrawerImagen';
import PiezaImagen from './PiezaImage';
import { useTranslation } from "react-i18next";
import * as CollectionService from "../../services/CollectionService";
import { Button } from '@material-ui/core';
import AccordionDetail from './AccordionDetail';
import PiezaImage from './PiezaImage';
// import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import Snackbar from '@material-ui/core/Snackbar';

const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom: theme.spacing(2)
    },
    categoria: {
        marginTop: theme.spacing(2)
    },
    imagen:{
        visibility: "hidden"
    }, 
    imagenM:{
        objectFit: "cover",
        width: "100%",
        maxHeight:"350px",
        height: "auto",
        "-moz-box-flex": 1,
        flexGrow: 1
    },
 
   imagenTitle:{
    left: "0px",
    right: "0px",
    display: "flex",
    "-moz-box-align": "center",
    "align-items": "center",
    bottom: "0px",
    position: "absolute",
    background: `${ "rgb(42 80 128 / 60%)"} none repeat scroll 0% 0%`,
    height: "30%"
    }, 
    imagenMensajeCarga:{
        left: "75px",    
        top: "30px",
        position: "absolute",
        color: theme.palette.primary.light,
        fontWeight: "bold",
        fontSize:"18px",
        }, 
    addImageIcon:{
        fontSize:"28px",
        }
    , 
    addImageBtn:{
        left: "10px",    
        top: "10px",
        position: "absolute",
        color: "lightgray",  
        fontSize:"30px",  
        zIndex:800,
        //backgroundColor:theme.palette.primary.main
    },
    addImageBtnWhite:{
        left: "20px",    
        top: "15px",
        position: "absolute",
        color: theme.palette.primary.light, 
        fontSize:"30px",  
        zIndex:800,
        //backgroundColor:theme.palette.primary.main
    },
    imagenContenedor:{
        display: "flex",
        position: "relative",
        marginTop: "16px"
    } , 
    margin: {
        margin: theme.spacing(1),
      },
    EditIcon: {    
          fontSize:"28px",
          color: theme.palette.common.white,   
         // zIndex: 100, 
          marginLeft: theme.spacing(2),
          marginRight: theme.spacing(1)
      },
    textTitulo: {       
        fontWeight: "bold",
        fontSize:"18px",
        color: 'white',      
        '&::placeholder': {
          textOverflow: 'ellipsis !important',
          color: 'white',
          fontSize:"18px",
          fontWeight: "bold",
        }
      },
    rootText:{
          width: "80%"
      },
      buttonImage: {
        color: theme.palette.primary.main,        
        border: '1px solid'
      },
      fragment: {
          display: 'flex',
          alignItems: 'baseline'
      }

    
}));


const DescripcionColeccion = props => {
    const [t, i18n] = useTranslation("common");
    const classes = useStyles()   
    const { handleTitulo,
        handleDescripcion,
        handleChangeCategoria,
        handleTipo,
        handleEnfoque,
        handleChangeCoverPage,
        handleLugarCreacion,
        handleTipoCreador,
        handleCreador,  
        handleAreaCreador,
        handleMandato,  
        handleTema,  
        handleMetadatos,
          titulo,
           descripcion,
           categoria, 
           tipo,
           enfoque,
           coverPage ,
           lugarCreacion, 
           creador,
           tipoCreador,
           areaCreador,
           mandato,
           tema
        } = props
    const usuarioComision = "Usuario de la Comisión de la Verdad";
    let infoCreador = false;
    try{
         infoCreador = tipoCreador.toLowerCase().includes(usuarioComision.toLowerCase());
    }catch(e){
        console.log(e)
    }


    const [abrirSeleccionImagen, setAbrirSeleccionImagen] = useState(false)
    const [cover, setCover] = useState(coverPage);
    const [tipos, setTipos] = useState([]);
    const [enfoques, setEnfoques] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [tiposCreador, setTiposCreador] = useState([]);
    const [areasCreador, setAreasCreador] = useState([]);
    const [mandatos, setMandatos] = useState([]);
    const [temas, setTemas] = useState([]);
    const [mostrarOpcionesCreador, setMostrarOpcionesCreador] = useState(infoCreador);
    const [ilustration, setIlustration] = useState(false)

    
    /*
    const [tipoColeccion, setTipoColeccion] = useState([]);
    const [categoriaColeccion, setCategoriaColeccion] = useState([]);
    const [tipoCreadorColeccion, setTipoCreadorColeccion] = useState([]);*/

    useEffect(() => {
        cargaMandato();
        cargaTemas();
        cargaAreaCreador();
        cargaTipoCreador();
        cargaLugarPublicacion();
        cargaTipoColeccion();
        cargaEnfoques();
        cargaIlustration()
     }, []);

     const cargaIlustration = () =>{

     }

     const cargaEnfoques = async () => {

        const response = await CollectionService.getlist('Objetivo');
        if(response.options)
        setEnfoques(response.options.map(o => o.term))

     }


     const cargaTipoColeccion =() =>{
        CollectionService.getlist("Tipo coleccion").then((data) => { 
            setTipos(data.options.map(o => o.term));
        }).catch((err) => {         
          console.log("Error ", err);
        }); 
    } 

     const cargaLugarPublicacion =() =>{
        CollectionService.getlist("Lugar coleccion").then((data) => { 
            setCategorias(data.options.map(o => o.term));
        }).catch((err) => {         
          console.log("Error ", err);
        }); 
    } 


     const cargaTipoCreador =() =>{
        CollectionService.getlist("Creador coleccion").then((data) => { 
            setTiposCreador(data.options.map(o => o.term));
        }).catch((err) => {         
          console.log("Error ", err);
        }); 
    } 

     const cargaAreaCreador =() =>{
        CollectionService.getlist("Areas").then((data) => { 
            setAreasCreador(data.options.map(o => o.term));
        }).catch((err) => {         
          console.log("Error ", err);
        }); 
    } 


    const cargaMandato =() =>{
        CollectionService.getlist("Mandato").then((data) => { 
           setMandatos(data.options.map(o => o.term));
        }).catch((err) => {         
          console.log("Error ", err);
        }); 
    } 

    const cargaTemas =() =>{
        CollectionService.getlist("Temas").then((data) => {     
        setTemas(data.options.map(o => o.term).sort());
        }).catch((err) => {         
        console.log("Error ", err);
        }); 
    } 
   
    const updateTitulo = (event) => {
        const { target: { value } } = event;      
        handleTitulo(value);
      };
      const updateDescripcion = (event) => {
        const { target: {  value } } = event;      
        handleDescripcion(value);      
      };

      const seleccionImagenPortada = () =>{
        setAbrirSeleccionImagen(true); 
      }

      const handlerCerradoDrawerImagen = ()=>{
        setAbrirSeleccionImagen(false);
      }

      const handlerCargaPortada = (resource, record, path) =>{
        setCover({"path":path,"records":[record],"resource":resource});  
        setAbrirSeleccionImagen(false);   
        if(handleChangeCoverPage)   
            handleChangeCoverPage({"path":path,"records":[record],"resource":resource});
    }

    const cambioTipoCreador = (value) =>{     
        if(value!== null) 
            infoCreador = value.toLowerCase().includes(usuarioComision.toLowerCase()); 
        else 
            infoCreador = false
            
        setMostrarOpcionesCreador(infoCreador);      
        if(!infoCreador){
            handleMetadatos(  { "topic": "", "mandate": "", "area_author": "", "type_author":value });
        }else{
            handleTipoCreador(value);
        }
    }

    const onChangeImage = (event) => {
      let { name, files } = event.target;
      var len = files.length;
      let filesDoc = [];
      for (var i = 0; i < len; i++) {
        var file = files[i];
        var valorKb = 0;
        if (file) {
          valorKb = parseInt(file.size / 1024, 10);
        }
        
        file.url = URL.createObjectURL(file);


        filesDoc.push({
          file: file,
         
        });
      }
      props.handleIlustration(filesDoc);
    };


    return (
      <>
        <div className={classes.imagenContenedor}>
          {!(typeof cover !== "undefined" && "path" in cover) ? (
            <>
              <img
                src={ImagenVacia}
                alt="Imagen "
                loading="lazy"
                className={classes.imagenM}
              />
              <div>
                <IconButton
                  className={classes.addImageBtnWhite}
                  onClick={() => {
                    seleccionImagenPortada();
                  }}
                >
                  <AddAPhotoIcon className={classes.addImageIcon} />
                </IconButton>
                <Typography
                  align="center"
                  gutterBottom
                  noWrap
                  className={classes.imagenMensajeCarga}
                  onClick={() => {
                    seleccionImagenPortada();
                  }}
                >
                  {t("crea.narrativeManager.titlePage.addImage")}
                </Typography>
              </div>
            </>
          ) : (
            <>
              <IconButton
                className={classes.addImageBtn}
                onClick={() => {
                  seleccionImagenPortada();
                }}
              >
                <AddAPhotoIcon className={classes.addImageIcon} />
              </IconButton>
              <PiezaImagen path={cover.path} portada={true} />
            </>
          )}

          <div className={classes.imagenTitle}>
            <Edit className={classes.EditIcon} />
            <TextField
              value={titulo}
              onChange={(ev) => updateTitulo(ev)}
              multiline
              id="input-with-icon-grid"
              className={classes.rootText}
              InputProps={{
                classes: {
                  input: classes.textTitulo,
                },
                disableUnderline: true,
              }}
              onInput={(e) => {
                e.target.value = e.target.value.toString().slice(0, 200);
              }}
              placeholder={t("crea.narrativeManager.titlePage.addTitle")}
            />
          </div>
        </div>

        <ContenedorElemento
          titulo="Añade una descripción"
          styleTitle={{ fontSize: "15px", fontWeight: 100 }}
          style={{ marginTop: "25px", width: "100%" }}
          styleContent={{ padding: "8px" }}
          styleHeader={{ padding: "0px" }}
        >
          <TextoColeccion
            placeholder=""
            label=""
            onChange={(ev) => updateDescripcion(ev)}
            defaultValue={descripcion}
            rows="5"
            onInput={(e) => {
              e.target.value = e.target.value.toString().slice(0, 700);
            }}
            InputProps={{ disableUnderline: true }}
          />
        </ContenedorElemento>

        <ContenedorElemento
          titulo=""
          style={{ marginTop: "25px", width: "100%" }}
          styleContent={{ padding: "8px" }}
          styleHeader={{ padding: "0px" }}
        >
          <SelectorColeccion
            id={"idTipoColeccion"}
            cambioOpciones={handleTipo}
            opciones={tipos}
            seleccionado={tipo}
            placeHolder={"Tipo de colección"}
          />
        </ContenedorElemento>

        <ContenedorElemento
          titulo=""
          style={{ marginTop: "25px", width: "100%" }}
          styleContent={{ padding: "8px" }}
          styleHeader={{ padding: "0px" }}
        >
          <SelectorColeccion
            id={"idLugarpublicacion"}
            cambioOpciones={handleChangeCategoria}
            opciones={categorias}
            seleccionado={categoria}
            placeHolder={"Lugar de publicación "}
          />
        </ContenedorElemento>

        <ContenedorElemento
          titulo="Asigne lugar de creación"
          styleTitle={{ fontSize: "15px", fontWeight: 100 }}
          style={{ marginTop: "25px", width: "100%" }}
          styleContent={{ padding: "8px" }}
          styleHeader={{ padding: "0px" }}
        >
          <LugarColeccion
            handleLugarCreacion={handleLugarCreacion}
            lugarCreacion={lugarCreacion}
          />
        </ContenedorElemento>

        <ContenedorElemento
          titulo=""
          styleTitle={{ fontSize: "15px", fontWeight: 100 }}
          style={{ marginTop: "25px", width: "100%" }}
          styleContent={{ padding: "8px" }}
          styleHeader={{ padding: "0px" }}
        >
          <CreadorColeccion handleCreador={handleCreador} creador={creador} />
        </ContenedorElemento>

        <ContenedorElemento
          titulo=""
          style={{ marginTop: "25px", width: "100%" }}
          styleContent={{ padding: "8px" }}
          styleHeader={{ padding: "0px" }}
        >
          <SelectorColeccion
            id={"idTipoCreador"}
            cambioOpciones={cambioTipoCreador}
            opciones={tiposCreador}
            seleccionado={tipoCreador}
            placeHolder={"Tipo de creador"}
          />
        </ContenedorElemento>

        {mostrarOpcionesCreador ? (
          <>
            <ContenedorElemento
              titulo=""
              style={{ marginTop: "25px", width: "100%" }}
              styleContent={{ padding: "8px" }}
              styleHeader={{ padding: "0px" }}
            >
              <SelectorColeccion
                id={"idAreaCreador"}
                cambioOpciones={handleAreaCreador}
                opciones={areasCreador}
                seleccionado={areaCreador}
                placeHolder={"Área productora"}
              />
            </ContenedorElemento>

            <ContenedorElemento
              titulo=""
              style={{ marginTop: "25px", width: "100%" }}
              styleContent={{ padding: "8px" }}
              styleHeader={{ padding: "0px" }}
            >
              <SelectorColeccion
                id={"idMandato"}
                cambioOpciones={handleMandato}
                opciones={mandatos}
                seleccionado={mandato}
                placeHolder={"Mandato"}
              />
            </ContenedorElemento>

            <ContenedorElemento
              titulo=""
              style={{ marginTop: "25px", width: "100%" }}
              styleContent={{ padding: "8px" }}
              styleHeader={{ padding: "0px" }}
            >
              <SelectorColeccion
                id={"idTema"}
                cambioOpciones={handleTema}
                opciones={temas}
                seleccionado={tema}
                placeHolder={"Tema"}
              />
            </ContenedorElemento>
          </>
        ) : null}

        <ContenedorElemento
          titulo=""
          style={{ marginTop: "25px", width: "100%" }}
          styleContent={{ padding: "8px" }}
          styleHeader={{ padding: "0px" }}
        >
          <SelectorColeccion
            id={"idEnfoque"}
            cambioOpciones={handleEnfoque}
            opciones={enfoques}
            seleccionado={enfoque}
            placeHolder={"Objetivo"}
          />
        </ContenedorElemento>

        <ContenedorElemento
          titulo="Ilustración"
          styleTitle={{ fontSize: "15px", fontWeight: 100 }}
          style={{ fontSize: "15px", marginTop: "25px", width: "100%" }}
          styleContent={{ padding: "8px" }}
          styleHeader={{ padding: "0px" }}
        >
          <div className={classes.fragment}
          >
            <input
              color="primary"
              accept="image/*"
              type="file"
              onChange={(e) => onChangeImage(e)}
              id="icon-button-file"
              name="attachedDocument"
              style={{ display: "none" }}
            />
            <label htmlFor="icon-button-file">
              <Button
                variant="contained"
                component="span"
                className={classes.buttonImage}
                size="small"
              >
                <AddAPhotoIcon />
              </Button>
            </label>
            {props.ilustration && props.ilustration.ilustrationPathSaved ? (
          <AccordionDetail title='Ver imagen'>
            <PiezaImage
              path={props.ilustration.ilustrationPathSaved}
              portada={false}
            />
          </AccordionDetail>
        ) : (
          ""
        )}
        </div>
          
        </ContenedorElemento>
      

        <DrawerImagen
          abrir={abrirSeleccionImagen}
          handlerCerrar={handlerCerradoDrawerImagen}
          handlerImageSelected={handlerCargaPortada}
        />

        {/* <ResultadosAudio/>*/}
      </>
    );

}

export default DescripcionColeccion;