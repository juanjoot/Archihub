import { useState, useEffect } from 'react';
import LectorPDF from './LectorPDF';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import { useTranslation } from "react-i18next";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import VisibilityTwoToneIcon from '@material-ui/icons/VisibilityTwoTone';
import TextFormatTwoToneIcon from '@material-ui/icons/TextFormatTwoTone';
import Tooltip from "@material-ui/core/Tooltip";
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import FragmentoTexto from "./FragmentoTexto";
import * as RecordsService from "../../../services/RecordsService";
import { isNull } from 'lodash';
import MicrodatoDocumento from './MicrodatoDocumento';


const CustomTab = withStyles({
	root: {
		textTransform: "none"
	}
})(Tab)


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


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  contenedorDocumento: {
    minHeight: 350,
    width: '100%',
    border: '0px solid',
    backgroundColor: "white",
    '&.dark': {
      backgroundColor: 'transparent'
    }
  },
  contenedorOpciones: {
    width: '100%'
  }
}))

const ItemDocumento = props => {
  const [t, i18n] = useTranslation("common");
  const classes = useStyles();
  const theme = useTheme();

  const [contenido, setContenido] = useState("");
  const [tipo, setTipo] = useState(null);
  const [archivo, setArchivo] = useState(null);
  let tieneFragmento = false;
  let inicioOpcion = 0;
  if (props.pieza)
    if (props.pieza.text) {
      inicioOpcion = 1;
      tieneFragmento = true;
    }
  const [opcion, setOpcion] = useState(inicioOpcion);


  let lecturaTexto = props.lectura;
  if (typeof lecturaTexto === "undefined")
    lecturaTexto = true


  const cambioOpcion = (event, nuevaOpcion) => {
    setOpcion(nuevaOpcion);
  };

  const cambioIndiceOpcion = (index) => {
    setOpcion(index);
  };


  useEffect(() => {

      const ext = props.record.filename.split('.')

      const listadoExt = ['xlsx', 'xls', 'csv', '168']
      listadoExt.includes(ext[ext.length - 1]) ? setTipo('microdato') : setTipo('documento')

      async function loadDocument() {
        const blob = RecordsService.serviceFile(props.record.idmongo)
        console.log(blob)
        setArchivo(blob)
      }

      async function loadContent() {
        const response = await RecordsService.serviceContentDocumentByIdent(props.record.ident)
        console.log(response)
        procesarContenido(response);
      }
    if (!(lecturaTexto && tieneFragmento) && !listadoExt.includes(ext[ext.length - 1])){
      loadContent()      
      loadDocument()
    }    
  }, [props.record.ident])

  const procesarContenido = (response) => {
    if (response["hits"].length > 0) {
      var resource = response["hits"][0];
      try{
        if(resource["_source"]["document"])
          if (resource["_source"]["document"]["records"].length > 0) {
            var record = resource["_source"]["document"]["records"][0];      
            setContenido(record["content"]);
          }
      }catch(e){
        console.log(e);
      }
    }
  };

  return (
    <>
      <div>
        {lecturaTexto ? 
        <div className={`${classes.contenedorDocumento} ${props.place === 'conoce' ? 'dark' : ''}`}>
          {tieneFragmento ?
            <FragmentoTexto
              lectura={lecturaTexto}
              pieza={props.pieza}
            />
            : <>
              {!isNull(archivo) && tipo === 'documento' ?
                <LectorPDF
                  archivo={archivo}
                  place={props.place}
                  fullScreen = {props.fullScreen} />
                : <>
                  {tipo === 'microdato' &&
                    <MicrodatoDocumento
                      record={props.record.idmongo}
                    />
                  }
                </>}
            </>
          }
        </div> :
          <div className={classes.contenedorOpciones} >
                      
              <Tabs
                value={opcion}
                onChange={cambioOpcion}
                indicatorColor="primary"
                textColor="primary"
              >
                <CustomTab iconPosition="start"   
                icon={<VisibilityTwoToneIcon/>} 
                label={t("crea.narrativeManager.textFragment.bottonView")}/>

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
                  title={tieneFragmento?t("crea.narrativeManager.textFragment.messageEdit"):t("crea.narrativeManager.textFragment.messageCreate")}>
                     
                     <CustomTab 
                      iconPosition="start"  
                      icon={<TextFormatTwoToneIcon/>} 
                      label={t("crea.narrativeManager.textFragment.bottonText")}
                      />                
                </LightTooltip>
              </Tabs>
      
            <SwipeableViews
              axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
              index={opcion}
              onChangeIndex={cambioIndiceOpcion}
            >
              <TabPanel value={opcion} index={0} dir={theme.direction}>
                <div className={classes.contenedorDocumento}>
                  {!isNull(archivo) ?
                    <LectorPDF
                      archivo={archivo} />
                    : null}
                </div>
              </TabPanel>
             <TabPanel value={opcion} index={1} dir={theme.direction}>
           
               {<FragmentoTexto
                  lectura={lecturaTexto}
                  contenido={contenido}
                  pieza={props.pieza}
                  modificacionPieza={props.modificacionPieza}
                  record={props.record}
              /> }
              </TabPanel>
             

            </SwipeableViews>

          </div>

        }
      </div>
    </>
  )
}

export default ItemDocumento