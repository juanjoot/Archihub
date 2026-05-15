import { useState, useEffect } from "react";

import MainLayout from "../sim-ui/layout/MainLayout";
import * as ResourceGroupService from "../services/ResourceGroupService";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import { Link } from "react-router-dom";

import hand from "../sim-ui/assets/imgs/hand.png";
import fondosLogo from "../sim-ui/assets/fondos.png";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { CardHeader, IconButton } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import Toolbar from "@material-ui/core/Toolbar";
import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';
import LocalLibraryOutlinedIcon from '@mui/icons-material/LocalLibraryOutlined';
import StorageIcon from '@mui/icons-material/Storage';

const useStyles = makeStyles((theme) => ({
  header: {
    // background: theme.palette.primary.dark,
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    paddingTop: "10vh",
    paddingBottom: "10vh",
    position: "relative",
    width: "33.33%",

    "& h1": {
      position: "relative",
      fontSize: 45,
      //   color: "white",
      color: theme.palette.primary.main,
      marginBottom: theme.spacing(4),
    },
    "& span": {
      position: "relative",
      //   color: "white",
      color: theme.palette.primary.main,
      maxWidth: 760,
      display: "block",
      fontSize: "1.2em",
      lineHeight: "25pt",
    },
    // "&:before": {
    //   content: '""',
    //   position: "absolute",
    //   backgroundImage: `url('${basedatos}')`,
    //   width: 450,
    //   height: 450,
    //   backgroundSize: "contain",
    //   backgroundRepeat: "no-repeat",
    //   opacity: 1,
    //   left: "5%",
    //   top: 400,
    //   zIndex: 0,
    // },
    // "&:after": {
    //   content: '""',
    //   position: "absolute",
    //   backgroundImage: `url('${fondosLogo}')`,
    //   width: 450,
    //   height: 450,
    //   backgroundSize: "contain",
    //   backgroundRepeat: "no-repeat",
    //   opacity: 1,
    //   right: "5%",
    //   zIndex: 0,
    //   bottom: 0,
    // },
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  },
  insideHeader: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 350
  },
  container: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    // background: theme.palette.primary.main,
    paddingBottom: 150,
    // paddingTop: 50,
    // width: "66.66%",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  },
  loadingViz: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "rgba(255,255,255,0.9)",
  },
  hoverButton: {
    position: "fixed",
    bottom: 15,
    right: 80,
  },
  columns: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "start",
    [theme.breakpoints.down("md")]: {
      flexWrap: "wrap",
    },
  },
  title: {
    margin: "0px",
    padding: "0px",
    fontSize: "20px",
    letterSpacing: "3px",
    // paddingTop: "20px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "18px",
      letterSpacing: "1px",
    },
  },
  subtitle: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "10px",
      // letterSpacing: "1px",
    },
  },

  blueHeader: {
    color: "white",
    cursor: "pointer",
    height: "100px",
    display: "flex",
    alignItems: "center",
    fontWeight: "bold",
    justifyContent: "start",
    backgroundColor: "#2a5080",
  },

  subContainer: {
    [theme.breakpoints.down("sm")]: {
      //   marginLeft: "60px",
    },
  },

  logo: {
    width: '150px',
    height: '125px',
    marginLeft: '55px',
    [theme.breakpoints.down("sm")]: {
      width: '110px',
      height: '80px',
      marginLeft: '40px',
      marginTop: '10px',
    },
  },
  description: {
    padding: "45px 200px 45px 200px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "18px",
    textAlign: "justify",
    [theme.breakpoints.down("sm")]: {
      padding: "30px ",

    },
  },
}));

const Fondos = (props) => {
  const [root, setRoot] = useState([]);
  const [loading, setLoading] = useState(false);
  const [path, setPath] = useState("11-OI");
  const [fondos, setFondos] = useState([]);
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    setLoading(true);

    setRoot([
      {
        id: "1000157-FSMB",
        text: "Agencia para la Reincorporación y la Normalización - ARN",
        text2: "Respuesta sobre reincorporación económica y social de las FARC",
      },
      {
        id: "35412-OE",
        text: "Amnistía Internacional",
        text2: "Oficina regional para las Américas",
      },
      {
        id: "1875181-FS",
        text: "Archivo General de la Nación - AGN",
        text2:
          "Documentación de carácter histórico de las poblaciones de San Basilio de Palenque y al Archipiélago de San Andrés Providencia y Santa Catalina",
      },
      {
        id: "1000072-FSMB",
        text: "Autoridad Nacional de Licencias Ambientales - ANLA",
        text2: "Reporte de Licencias Ambientales",
      },
      {
        id: "1000146-OEMB",
        text: "Centro Nacional de Memoria Histórica - CNMH",
        text2: "Respuesta sobre avances del Museo Nacional de la Memoria",
      },
      {
        id: "1003673-FS",
        text: "Comisión Colombiana de Juristas - CCJ",
        text2: "Área de Tierras",
      },
      {
        id: "1003623-FS",
        text: "Comisión Colombiana de Juristas - CCJ",
        text2: "Colección Documental de la CCJ",
      },
      {
        id: "1000125-OEMB",
        text: "Consejo de Estado",
        text2: "Sentencias de demandas contra la Nación",
      },
      {
        id: "81949-FS",
        text: "Consejo de Estado",
        text2: "Sentencias relacionadas con conflicto armado",
      },
      {
        id: "17959-OE",
        text: "Consejo de Estado",
        text2: "Sentencias y Autos sobre aspersión aérea con glifosato",
      },
      {
        id: "1000126-FSMB",
        text: "Consejo Superior de la Judicatura - CSJ",
        text2: "Número de jueces de la Rama Judicial",
      },
      {
        id: "35495-OE",
        text: "Consultoría para los derechos humanos y el desplazamiento - CODHES",
        text2:
          "Informes de la Comisión de Seguimiento a la Política Pública sobre Desplazamiento Forzado",
      },
      {
        id: "1004023-FS",
        text: "Corporación para la Defensa y Promoción de los Derechos Humanos Reiniciar",
        text2: "Litigio internacional del caso Unión Patriótica",
      },
      {
        id: "1853967-FS",
        text: "Corporación para la Defensa y Promoción de los Derechos Humanos Reiniciar",
        text2: "Publicaciones Reiniciar",
      },
      {
        id: "1000136-OEMB",
        text: "Corte Constitucional",
        text2: "Recopilación CJU Justicia Penal Militar",
      },
      {
        id: "35415-OE",
        text: "Corte Constitucional",
        text2: "Sentencias de Aspersión y Reparación",
      },
      {
        id: "17818-OE",
        text: "Corte Suprema de Justicia",
        text2: "Sala de Casación Penal",
      },
      {
        id: "35421-OE",
        text: "Corte Suprema de Justicia",
        text2: "Sentencias Justicia y Paz",
      },
      {
        id: "1000152-FSMB",
        text: "Corte Suprema de Justicia",
        text2:
          "Documentación sobre Jesús Armando Arias Cabrales y Luis Alfonso Plazas Vega relativa a la toma del Palacio de Justicia",
      },
      {
        id: "1000158-FSMB",
        text: "Familia directa de Jorge Eliécer Gaitán",
        text2: "Archivo Fondo Jorge Eliecer Gaitán",
      },
      {
        id: "1000147-FSMB",
        text: "Ministerio de Agricultura y Desarrollo Rural - MADR",
        text2: "Respuesta sobre Planes Nacionales Sectoriales",
      },
      {
        id: "79355-OE",
        text: "Ministerio de Defensa Nacional - MINDEFENSA",
        text2:
          "Impacto del conflicto en el sistema de salud de la Fuerza Pública",
      },
      {
        id: "1003507-FS",
        text: "Observatorio Surcolombiano de Derechos Humanos, Paz y Territorio - OBSURDH",
        text2:
          "Informes de análisis de contexto de ejecuciones extrajudiciales",
      },
      {
        id: "1000142-OEMB",
        text: "Presidencia de la República",
        text2:
          "Respuesta sobre número de ex combatientes de FARC-EP acreditados por la OACP y otros",
      },
      {
        id: "\n35406-OE",
        text: "Programa Somos Defensores - Programa No Gubernamental de Protección a Defensores de Derechos Humanos - PNGPDDH",
        text2:
          "Informes del Sistema de Información sobre Agresiones contra Defensores y Defensoras de Derechos Humanos en Colombia-SIADDHH",
      },
      {
        id: "1021959-FS",
        text: "Rama Judicial del Poder Público",
        text2:
          "Acción de reparación directa contra el Departamento del Huila y Otros por muerte de Joaquín Perdomo, Concejal de Campoalegre",
      },
      {
        id: "1021965-FS",
        text: "Rama Judicial del Poder Público",
        text2: "Caso Edward Heriberto Mattos Barrero",
      },
      {
        id: "1021945-FS",
        text: "Rama Judicial del Poder Público",
        text2:
          "Decisión sobre el caso de María del Carmen Romero Carranza para la Restitución y formalización de tierras despojadas en la vereda Paramón en Pulí, Cundinamarca",
      },
      {
        id: "1021941-FS",
        text: "Rama Judicial del Poder Público",
        text2:
          "Decisión sobre el caso de Sergio Zárate Useche para la Restitución y formalización de tierras despojadas en la vereda Hoya de Tudela en La Palma, Cundinamarca",
      },
      {
        id: "1021943-FS",
        text: "Rama Judicial del Poder Público",
        text2:
          "Decisión sobre el caso de Susana Enciso Aldana y otros para la Restitución y formalización de tierras despojadas en la vereda Chapaima en Villeta, Cundinamarca",
      },
      {
        id: "81946-FS",
        text: "Unidad Administrativa Especial de Aeronáutica Civil - AEROCIVIL",
        text2: "Actas del Consejo Superior Aeronáutico",
      },
      {
        id: "1000080-FSMB",
        text: "Unidad de Búsqueda de Personas Dadas por Desaparecidas en contexto y razón del conflicto armado - UBPD",
        text2: "Inventario de activos de información",
      },
      {
        id: "1000149-OEMB",
        text: "Unidad para la Atención y Reparación Integral a las Víctimas - UARIV",
        text2: "Respuesta sobre medidas de reparación integral",
      },
    ]);

    setLoading(false);

    // ResourceGroupService.serviceListFirstLevelLazy().then(data => {
    //     console.log(data)
    //     setRoot(data[0].children)
    //     setLoading(false)
    // })
  }, [path]);

  const setNewFondo = (fondo, add = true) => {
    setLoading(true);
    if (add) {
      ResourceGroupService.getAllChildren(fondo.id).then((data) => {
        let f_ = [...fondos, ...data, fondo];
        setFondos(f_);
        setLoading(false);
      });
      // setFondo(fondo)
    } else {
      ResourceGroupService.getAllChildren(fondo.id).then((data) => {
        const listado_remove = [...data, fondo].map((r) => r.id);
        let f_ = fondos.filter((f) => {
          if (f) return !listado_remove.includes(f.id);
        });
        setFondos(f_);
        setLoading(false);
      });
    }
  };

  return (
    <MainLayout>
      <Box className={classes.blueHeader}>
        <img className={classes.logo} src={fondosLogo} alt="" />
        <div className={classes.subContainer}>
          <h3 className={classes.title}>¿Cómo navegar el archivo?</h3>
        </div>
      </Box>
      <Box className={classes.description} style={{
        maxWidth: 900,
        margin: '0 auto'
      }}>
        <Box className={classes.insideHeader}>
          {/* <Typography variant="h1">Fondos documentales</Typography> */}

          <img src={hand} alt="" />
        </Box>
        <Typography variant="p">
          Navega entre los fondos documentales que se estructuraron para la
          investigación de la Comisión de la Verdad. Podrás consultar los
          documentos públicos como: las entrevistas, las bases de datos, los
          documentos producidos por los equipos de la Comisión de la Verdad, los
          archivos públicos de otras organizaciones e instituciones y los casos
          e informes entregados para construir el Informe Final y el diálogo
          social.
        </Typography>
      </Box>
      <Box className={classes.columns}>
        {/* <Box className={classes.header}> */}

        {/* </Box> */}

        <Box
          style={{
            width: '100%',
            maxWidth: 900
          }}
        >
          <Box
            style={{
              background: '#7a8da4',
              color: 'white',
              borderRadius: 5,
              marginBottom: 20
            }}
          >
            {[
              { icon: <StorageIcon />, text: "Descargar inventario" },
              { icon: <CloudDownloadOutlinedIcon />, text: "Descargar archivos" },
              { icon: <LocalLibraryOutlinedIcon />, text: "Ir al enlace del buscador" },
            ].map(i => {
              return (
                <Box
                  style={{
                    display: 'flex',
                    width: 'calc(100% - 20px)',
                    maxWidth: 250,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: 10,
                    margin: '0 auto',
                    borderBottom: '1px solid rgba(255,255,255,.2)'
                  }}
                >
                  <Typography
                    style={{
                      fontSize: 14
                    }}
                  >
                    {i.text}
                  </Typography>
                  <Box>
                    {i.icon}
                  </Box>
                </Box>)
            })}
          </Box>
          {[
            {
              text: "Entrevistas",
              backup: "entrevistas",
              enlace: "001-EV",
              dataset: "entrevistas"
            },
            {
              text: "Recursos internos",
              // dataset: "internas"
            },
            {
              text: "Documentos desclasificados de la National Security Agency",
              // dataset: 'nsa',
              enlace: "1000164-OEMB|1809325-FS|1884272-FS|1809326-FS|1809327-FS|1809328-FS|1809329-FS|1884273-FS|1884274-FS|1884275-FS|1884282-FS|1884283-FS|1884284-FS|1884285-FS|1884286-FS|1884287-FS|1884288-FS|1884289-FS|1884302-FS|1884306-FS|1884307-FS|1884308-FS|1884309-FS|1884310-FS|1884311-FS|1884318-FS|1884325-FS|1884326-FS|1884327-FS|1884328-FS|1884329-FS|1884330-FS|1884338-FS|1884339-FS|1884340-FS|1884345-FS|1884346-FS|1884347-FS|1884350-FS|1884351-FS|1884352-FS|1884353-FS|1884354-FS|1884360-FS|1884363-FS|1884364-FS|1884365-FS|1884367-FS|1884402-FS|1884426-FS|1884427-FS|1884428-FS|1884429-FS|1884443-FS|1884444-FS|1884446-FS|1884448-FS|1884449-FS|1884450-FS|1884451-FS|1884459-FS|1884460-FS|1930425-FS|1930427-FS|1930430-FS|1809185-FS|1809193-FS|1809195-FS|1809221-FS|1809229-FS|1809230-FS|1809231-FS|1809233-FS|1809234-FS|1809235-FS|1809240-FS|1809241-FS|1884290-FS|1884301-FS|1884312-FS|1884313-FS|1884314-FS|1884315-FS|1884316-FS|1884317-FS|1884320-FS|1884324-FS|1884341-FS|1884342-FS|1884343-FS|1884344-FS|1884355-FS|1884356-FS|1884357-FS|1884359-FS|1884361-FS|1884362-FS|1884366-FS|1884368-FS|1884369-FS|1884371-FS|1884372-FS|1884373-FS|1884393-FS|1884399-FS|1884400-FS|1884401-FS|1884403-FS|1884404-FS|1884405-FS|1884411-FS|1884413-FS|1884414-FS|1884415-FS|1884418-FS|1884419-FS|1884420-FS|1884421-FS|1884422-FS|1884423-FS|1884424-FS|1884425-FS|1884430-FS|1884431-FS|1884432-FS|1884445-FS|1884447-FS|1884452-FS|1884453-FS|1884454-FS|1884455-FS|1884456-FS|1884457-FS|1884458-FS|1930428-FS|1930429-FS|1809194-FS|1809236-FS|1884291-FS|1884292-FS|1884293-FS|1884294-FS|1884295-FS|1884296-FS|1884297-FS|1884298-FS|1884299-FS|1884300-FS|1884321-FS|1884322-FS|1884323-FS|1884358-FS|1884370-FS|1884374-FS|1884375-FS|1884376-FS|1884377-FS|1884378-FS|1884379-FS|1884380-FS|1884381-FS|1884382-FS|1884383-FS|1884384-FS|1884385-FS|1884386-FS|1884387-FS|1884388-FS|1884389-FS|1884390-FS|1884391-FS|1884392-FS|1884394-FS|1884395-FS|1884406-FS|1884407-FS|1884408-FS|1884409-FS|1884410-FS|1884412-FS|1884416-FS|1884417-FS|1884433-FS|1884434-FS|1884435-FS|1884436-FS|1884437-FS|1884438-FS|1884439-FS|1884440-FS|1884441-FS|1884442-FS|1884396-FS|1884398-FS|1884397-FS"
            },
            {"text": "Fondo de microdatos", enlace: "002-MD"},{"text": "Objetos de memoria", enlace: "000-OBJ"},{"text": "Casos e informes", enlace: "119-CI"},
            {"text":"Agencia para la Reincorporación y la Normalización - ARN (Respuesta sobre reincorporación económica y social de las FARC)","enlace":"1000157-FSMB"},{"text":"Archivo General de la Nación - AGN (Inventario documental analítico del fondo de la Caja Agraria)","enlace":"1021916-FS"},{"text":"Archivo General de la Nación - AGN (Documentación de carácter histórico de las poblaciones de San Basilio de Palenque y al Archipiélago de San Andrés Providencia y Santa Catalina)","enlace":"1875181-FS"},{"text":"Autoridad Nacional de Licencias Ambientales - ANLA (Reporte de Licencias Ambientales)","enlace":"1000072-FSMB"},{"text":"Centro Nacional de Memoria Histórica - CNMH (Respuesta sobre avances del Museo Nacional de la Memoria)","enlace":"1000146-OEMB"},{"text":"Colectivo por la Recuperación de la Memoria de A Luchar (Catálogo archivo ¡A Luchar!)","enlace":"1000137-FSMB"},{"text":"Comisión Colombiana de Juristas - CCJ (Área de Tierras)","enlace":"1003673-FS|1003674-FS"},{"text":"Comisión Colombiana de Juristas - CCJ (Petición ante la Comisión Interamericana de Derechos Humanos caso de Nohora Cecilia Velásquez)","enlace":"1000116-OEMB"},{"text":"Consejo de Estado (Sentencias de demandas contra la Nación)","enlace":"1000125-OEMB"},{"text":"Consejo de Estado (Sentencias relacionadas con conflicto armado)","enlace":"81949-FS|81950-FS|81951-FS|81952-FS|81953-FS|81954-FS|81955-FS|81956-FS|81957-FS|81958-FS|81959-FS|81960-FS|81961-FS|81962-FS|81963-FS|81964-FS|81965-FS|81966-FS|81967-FS|81968-FS|81969-FS|81970-FS|81971-FS|81972-FS|81973-FS|81974-FS|81975-FS|81976-FS|81977-FS|81978-FS|81979-FS|81980-FS|81981-FS|81982-FS|81983-FS|81984-FS|81985-FS|81986-FS|81987-FS|81988-FS|81989-FS|81990-FS|81991-FS|81992-FS|81993-FS|81994-FS|81995-FS|81996-FS|81997-FS|81998-FS|81999-FS|82000-FS|82001-FS|82002-FS|82003-FS|82004-FS|82005-FS|82006-FS|82007-FS|82008-FS|82009-FS|82010-FS|82011-FS|82012-FS|82013-FS|82014-FS|82015-FS|82016-FS|82017-FS|82018-FS|82019-FS|82020-FS|82021-FS|82022-FS|82023-FS|82024-FS|82025-FS|82026-FS|82027-FS|82028-FS|82029-FS|82030-FS|82031-FS|82032-FS|82033-FS|82034-FS|82035-FS|82036-FS|82037-FS|82038-FS|82039-FS|82040-FS|82041-FS|82042-FS|82043-FS|82044-FS|82045-FS|82046-FS|82047-FS|82048-FS|82049-FS|82050-FS|82051-FS|82052-FS|82053-FS|82054-FS|82055-FS|82056-FS|82057-FS|82058-FS|82059-FS|82060-FS|82061-FS|82062-FS|82063-FS|82064-FS|82065-FS|82066-FS|82067-FS|82068-FS|82069-FS|82070-FS|82071-FS|82072-FS|82073-FS|82074-FS|82075-FS|82076-FS|82077-FS|82078-FS|82079-FS|82080-FS|82081-FS|82082-FS|82083-FS|82084-FS|82085-FS|82086-FS|82087-FS|82088-FS|82089-FS|82090-FS|82091-FS|82092-FS|82093-FS|82094-FS|82095-FS|82096-FS|82097-FS|82098-FS|82099-FS|82100-FS|82101-FS|82102-FS|82103-FS|82104-FS|82105-FS|82106-FS|82107-FS|82108-FS|82109-FS|82110-FS|82111-FS|82112-FS|82113-FS|82114-FS|82115-FS|82116-FS|82117-FS|82118-FS|82119-FS|82120-FS|82121-FS|82122-FS|82123-FS|82124-FS|82125-FS|82126-FS|82127-FS|82128-FS|82129-FS|82130-FS|82131-FS|82132-FS|82133-FS|82134-FS|82135-FS|82136-FS|82137-FS|82138-FS|82139-FS|82140-FS|82141-FS|82142-FS|82143-FS|82144-FS|82145-FS|82146-FS|82147-FS|82148-FS|82149-FS|82150-FS|82151-FS|82152-FS|82153-FS|82154-FS|82155-FS|82156-FS|82157-FS|82158-FS|82159-FS|82160-FS|82161-FS|82162-FS|82163-FS|82164-FS|82165-FS|82166-FS|82167-FS|82168-FS|82169-FS|82170-FS|82171-FS|82172-FS|82173-FS|82174-FS|82175-FS|82176-FS|82177-FS|82178-FS|82179-FS|82180-FS|82181-FS|82182-FS|82183-FS|82184-FS|82185-FS|82186-FS|82187-FS|82188-FS|82189-FS|82190-FS|82191-FS|82192-FS|82193-FS|82194-FS|82195-FS|82196-FS|82197-FS|82198-FS|82199-FS|82200-FS|82201-FS|82202-FS|82203-FS|82204-FS|82205-FS|82206-FS|82207-FS|82208-FS|82209-FS|82210-FS|82211-FS|82212-FS|82213-FS|82214-FS|82215-FS|82216-FS|82217-FS|82218-FS|82219-FS|82220-FS|82221-FS|82222-FS|82223-FS|82224-FS|82225-FS|82226-FS|82227-FS|82228-FS|82229-FS|82230-FS|82231-FS|82232-FS|82233-FS|82234-FS|82235-FS|82236-FS|82237-FS|82238-FS|82239-FS|82240-FS|82241-FS|82242-FS|82243-FS|82244-FS|82245-FS|82246-FS|82247-FS|82248-FS|82249-FS|82250-FS|82251-FS|82252-FS|82253-FS|82254-FS|82255-FS|82256-FS|82257-FS|82258-FS|82259-FS|82260-FS|82261-FS|82262-FS|82263-FS|82264-FS|82265-FS|82266-FS|82267-FS|82268-FS|82269-FS|82270-FS|82271-FS|82272-FS|82273-FS|82274-FS|82275-FS|82276-FS|82277-FS|82278-FS|82279-FS|82280-FS"},{"text":"Consejo de Estado (Sentencias y Autos sobre aspersión aérea con glifosato)","enlace":"17959-OE"},{"text":"Consejo Nacional Electoral - CNE (Respuesta sobre promoción de la participación electoral, Reformadel Régimen y de la organización electoral, y otros)","enlace":"1000165-FSMB"},{"text":"Consejo Superior de la Judicatura - CSJ (Número de jueces de la Rama Judicial)","enlace":"1000126-FSMB"},{"text":"Corporación para la Defensa y Promoción de los Derechos Humanos Reiniciar (Litigio internacional del caso Unión Patriótica)","enlace":"1004023-FS"},{"text":"Corte Constitucional (Recopilación CJU Justicia Penal Militar)","enlace":"1000136-OEMB"},{"text":"Corte Constitucional (Sentencias de Aspersión y Reparación)","enlace":"35415-OE"},{"text":"Corte Interamericana de Derechos Humanos - CORTE IDH (Procesos Judiciales Internacionales)","enlace":"1000073-FSMB|1021972-FS|1021973-FS|1021974-FS|1021975-FS|1021976-FS|1021977-FS"},{"text":"Corte Suprema de Justicia (Sentencias Justicia y Paz)","enlace":"35421-OE"},{"text":"Defensoría del Pueblo (Relación de Alertas Tempranas e Informes de Riesgo que advierten riesgo de reclutamiento y utilización de Niños, Niñas y Adolescentes)","enlace":"1853043-FS|1853044-FS|1853045-FS|1853046-FS|1853047-FS"},{"text":"Departamento Nacional de Planeación - DNP (Planes de Desarrollo 1961-2022)","enlace":"17960-OE|17940-OE|17941-OE|17942-OE|17943-OE|17944-OE|17945-OE|17947-OE|17948-OE|17949-OE|17950-OE|17951-OE|17952-OE|17953-OE|17954-OE|17955-OE|17946-OE|17946-OE|17946-OE|17946-OE|17946-OE"},{"text":"Familia directa de Jorge Eliécer Gaitán (Archivo Fondo Jorge Eliecer Gaitán)","enlace":"1000158-FSMB|1875118-FS|1875119-FS|1875120-FS|1875121-FS|1875122-FS|1875123-FS|1875124-FS|1875125-FS|1875126-FS|1875127-FS|1875128-FS|1875129-FS|1875130-FS"},{"text":"Familia directa de Jorge Eliécer Gaitán (Correspondencia)","enlace":"1000172-FSMB"},{"text":"Fiscalía General de la Nación - FGN (Caso de homicidio contra Miladis Salgado Reyes en el municipio de Cerrito, Santander)","enlace":"1875177-FS"},{"text":"Fondo para el Financiamiento del Sector Agropecuario - FINAGRO (Inventarios de resoluciones y actas)","enlace":"1000074-FSMB"},{"text":"Gustavo Gallón Giraldo (Consejos Verbales de Guerra en 1979)","enlace":"82284-FS"},{"text":"Instituto Colombiano de Bienestar Familiar - ICBF (Respuesta sobre menores de edad desvinculados/as de grupos al margen de la ley con datos diferenciales)","enlace":"1000156-FSMB"},{"text":"Jurisdicción Especial para la Paz - JEP (Acción de tutela promovida por el Centro Nacional de Memoria Histórica contra la Sección de Primera Instancia para Casos de Ausencia de Reconocimiento de Verdad y Responsabilidad de la JEP)","enlace":"1000120-FSMB"},{"text":"Jurisdicción Especial para la Paz - JEP (Políticas y Lineamientos)","enlace":"1853619-FS"},{"text":"Jurisdicción Especial para la Paz - JEP (Resoluciones y autos)","enlace":"18239-OE|17814-OE|17815-OE|78275-OE|1809158-FS|1809161-FS|1809163-FS|1809165-FS|1809167-FS|1809169-FS|1809171-FS|1809173-FS|1809175-FS|1809177-FS|1809179-FS|1853573-FS|1853625-FS|1854081-FS|1854083-FS|1854085-FS|1854087-FS|1854133-FS|1884508-FS|1884510-FS"},{"text":"Ministerio de Agricultura y Desarrollo Rural - MADR (Inventario de Alianza Fiduciaria)","enlace":"1000128-FSMB"},{"text":"Ministerio de Agricultura y Desarrollo Rural - MADR (Respuesta sobre Planes Nacionales Sectoriales)","enlace":"1000147-FSMB"},{"text":"Ministerio de Ambiente y Desarrollo Sostenible - MINAMBIENTE (Cultivos ilícitos y glifosato)","enlace":"17961-OE"},{"text":"Ministerio de Defensa Nacional - MINDEFENSA (Impacto del conflicto en el sistema de salud de la Fuerza Pública)","enlace":"79355-OE"},{"text":"Ministerio de Defensa Nacional - MINDEFENSA (Plan de Operaciones Lazo)","enlace":"1000071-OEMB"},{"text":"Programa Somos Defensores - Programa No Gubernamental de Protección a Defensores de Derechos Humanos - PNGPDDH (Informes del Sistema de Información sobre Agresiones contra Defensores y Defensoras de Derechos Humanos en Colombia-SIADDHH)","enlace":"35406-OE|35407-OE|35408-OE|35409-OE"},{"text":"Programar Televisión S.A. (Material Toma del Palacio de Justicia)","enlace":"1875109-FS"},{"text":"Unidad Administrativa Especial de Aeronáutica Civil - AEROCIVIL (Actas del Consejo Superior Aeronáutico)","enlace":"81946-FS"},{"text":"Unidad de Búsqueda de Personas Dadas por Desaparecidas en contexto y razón del conflicto armado - UBPD (Inventario de activos de información)","enlace":"1000080-FSMB"},{"text":"Unidad de Restitución de Tierras - URT (Documentos de análisis de contexto)","enlace":"78565-OE|18501-OE|78566-OE|78586-OE|18502-OE|18510-OE|18525-OE|18542-OE|18558-OE|18577-OE|18597-OE|78567-OE|78569-OE|78570-OE|78571-OE|78572-OE|78574-OE|78575-OE|78576-OE|78577-OE|78578-OE|78579-OE|78580-OE|78581-OE|78582-OE|78583-OE|78584-OE|78585-OE|78587-OE|18502-OE|18503-OE|18510-OE|18511-OE|18525-OE|18526-OE|18527-OE|18528-OE|18529-OE|18530-OE|18531-OE|18532-OE|18533-OE|18534-OE|18535-OE|18536-OE|18537-OE|18538-OE|18539-OE|18540-OE|18541-OE|18542-OE|18543-OE|18544-OE|18545-OE|18546-OE|18547-OE|18548-OE|18549-OE|18550-OE|18551-OE|18552-OE|18553-OE|18554-OE|18555-OE|18556-OE|18557-OE|18558-OE|18559-OE|18577-OE|18578-OE|18579-OE|18580-OE|18581-OE|18582-OE|18583-OE|18584-OE|18585-OE|18586-OE|18587-OE|18588-OE|18589-OE|18590-OE|18591-OE|18592-OE|18593-OE|18594-OE|18595-OE|18596-OE|18597-OE|18598-OE|18599-OE|18600-OE|18601-OE|18604-OE|18607-OE|18608-OE|18609-OE|18610-OE|18611-OE|18612-OE|18613-OE|18619-OE|18620-OE|18621-OE|18622-OE|18623-OE|18624-OE|18625-OE|18626-OE|78567-OE|78568-OE|78569-OE|78570-OE|78571-OE|78572-OE|78573-OE|78574-OE|78575-OE|78576-OE|78577-OE|78578-OE|78579-OE|78580-OE|78581-OE|78582-OE|78583-OE|78584-OE|78585-OE|78587-OE|18502-OE|18503-OE|18504-OE|18505-OE|18506-OE|18507-OE|18508-OE|18509-OE|18510-OE|18511-OE|18512-OE|18513-OE|18514-OE|18515-OE|18516-OE|18517-OE|18518-OE|18519-OE|18520-OE|18521-OE|18522-OE|18523-OE|18524-OE|18525-OE|18526-OE|18527-OE|18528-OE|18529-OE|18530-OE|18531-OE|18532-OE|18533-OE|18534-OE|18535-OE|18536-OE|18537-OE|18538-OE|18539-OE|18540-OE|18541-OE|18542-OE|18543-OE|18544-OE|18545-OE|18546-OE|18547-OE|18548-OE|18549-OE|18550-OE|18551-OE|18552-OE|18553-OE|18554-OE|18555-OE|18556-OE|18557-OE|18558-OE|18559-OE|18560-OE|18561-OE|18562-OE|18563-OE|18565-OE|18566-OE|18567-OE|18568-OE|18569-OE|18570-OE|18571-OE|18572-OE|18573-OE|18574-OE|18575-OE|18576-OE|18577-OE|18578-OE|18579-OE|18580-OE|18581-OE|18582-OE|18583-OE|18584-OE|18585-OE|18586-OE|18587-OE|18588-OE|18589-OE|18590-OE|18591-OE|18592-OE|18593-OE|18594-OE|18595-OE|18596-OE|18597-OE|18598-OE|18599-OE|18600-OE|18601-OE|18602-OE|18603-OE|18604-OE|18605-OE|18606-OE|18607-OE|18608-OE|18609-OE|18610-OE|18611-OE|18612-OE|18613-OE|18614-OE|18615-OE|18616-OE|18619-OE|18620-OE|18621-OE|18622-OE|18623-OE|18624-OE|18625-OE|18626-OE|18627-OE|18628-OE|78567-OE|78568-OE|78569-OE|78570-OE|78571-OE|78572-OE|78573-OE|78574-OE|78575-OE|78576-OE|78577-OE|78578-OE|78579-OE|78580-OE|78581-OE|78582-OE|78583-OE|78584-OE|78585-OE|78587-OE|1033392-FS|1033393-FS|1033394-FS|1033395-FS|1033399-FS|18502-OE|18503-OE|18504-OE|18505-OE|18506-OE|18507-OE|18508-OE|18509-OE|18510-OE|18511-OE|18512-OE|18513-OE|18514-OE|18515-OE|18516-OE|18517-OE|18518-OE|18519-OE|18520-OE|18521-OE|18522-OE|18523-OE|18524-OE|18525-OE|18526-OE|18527-OE|18528-OE|18529-OE|18530-OE|18531-OE|18532-OE|18533-OE|18534-OE|18535-OE|18536-OE|18537-OE|18538-OE|18539-OE|18540-OE|18541-OE|18542-OE|18543-OE|18544-OE|18545-OE|18546-OE|18547-OE|18548-OE|18549-OE|18550-OE|18551-OE|18552-OE|18553-OE|18554-OE|18555-OE|18556-OE|18557-OE|18558-OE|18559-OE|18560-OE|18561-OE|18562-OE|18563-OE|18564-OE|18565-OE|18566-OE|18567-OE|18568-OE|18569-OE|18570-OE|18571-OE|18572-OE|18573-OE|18574-OE|18575-OE|18576-OE|18577-OE|18578-OE|18579-OE|18580-OE|18581-OE|18582-OE|18583-OE|18584-OE|18585-OE|18586-OE|18587-OE|18588-OE|18589-OE|18590-OE|18591-OE|18592-OE|18593-OE|18594-OE|18595-OE|18596-OE|18597-OE|18598-OE|18599-OE|18600-OE|18601-OE|18602-OE|18603-OE|18604-OE|18605-OE|18606-OE|18607-OE|18608-OE|18609-OE|18610-OE|18611-OE|18612-OE|18613-OE|18614-OE|18615-OE|18616-OE|18617-OE|18618-OE|18619-OE|18620-OE|18621-OE|18622-OE|18623-OE|18624-OE|18625-OE|18626-OE|18627-OE|18628-OE|78567-OE|78568-OE|78569-OE|78570-OE|78571-OE|78572-OE|78573-OE|78574-OE|78575-OE|78576-OE|78577-OE|78578-OE|78579-OE|78580-OE|78581-OE|78582-OE|78583-OE|78584-OE|78585-OE|78587-OE|1033370-FS|1033371-FS|1033372-FS|1033392-FS|1033393-FS|1033394-FS|1033395-FS|1033399-FS|18502-OE|18503-OE|18504-OE|18505-OE|18506-OE|18507-OE|18508-OE|18509-OE|18510-OE|18511-OE|18512-OE|18513-OE|18514-OE|18515-OE|18516-OE|18517-OE|18518-OE|18519-OE|18520-OE|18521-OE|18522-OE|18523-OE|18524-OE|18525-OE|18526-OE|18527-OE|18528-OE|18529-OE|18530-OE|18531-OE|18532-OE|18533-OE|18534-OE|18535-OE|18536-OE|18537-OE|18538-OE|18539-OE|18540-OE|18541-OE|18542-OE|18543-OE|18544-OE|18545-OE|18546-OE|18547-OE|18548-OE|18549-OE|18550-OE|18551-OE|18552-OE|18553-OE|18554-OE|18555-OE|18556-OE|18557-OE|18558-OE|18559-OE|18560-OE|18561-OE|18562-OE|18563-OE|18564-OE|18565-OE|18566-OE|18567-OE|18568-OE|18569-OE|18570-OE|18571-OE|18572-OE|18573-OE|18574-OE|18575-OE|18576-OE|18577-OE|18578-OE|18579-OE|18580-OE|18581-OE|18582-OE|18583-OE|18584-OE|18585-OE|18586-OE|18587-OE|18588-OE|18589-OE|18590-OE|18591-OE|18592-OE|18593-OE|18594-OE|18595-OE|18596-OE|18597-OE|18598-OE|18599-OE|18600-OE|18601-OE|18602-OE|18603-OE|18604-OE|18605-OE|18606-OE|18607-OE|18608-OE|18609-OE|18610-OE|18611-OE|18612-OE|18613-OE|18614-OE|18615-OE|18616-OE|18617-OE|18618-OE|18619-OE|18620-OE|18621-OE|18622-OE|18623-OE|18624-OE|18625-OE|18626-OE|18627-OE|18628-OE|78567-OE|78568-OE|78569-OE|78570-OE|78571-OE|78572-OE|78573-OE|78574-OE|78575-OE|78576-OE|78577-OE|78578-OE|78579-OE|78580-OE|78581-OE|78582-OE|78583-OE|78584-OE|78585-OE|78587-OE|1033370-FS|1033371-FS|1033372-FS|1033392-FS|1033393-FS|1033394-FS|1033395-FS|1033399-FS"},{"text":"Unidad de Restitución de Tierras - URT (Sentencias restitución y formalización de tierras)","enlace":"1000015-FSMB|78276-OE|78305-OE|78310-OE|78321-OE|78324-OE|78326-OE|78343-OE|78362-OE|78368-OE|78377-OE|78392-OE|78402-OE|78404-OE|78406-OE|78423-OE|78444-OE|78458-OE|78468-OE|78481-OE|78488-OE|78503-OE|78504-OE|78515-OE|78540-OE|78277-OE|78278-OE|78279-OE|78280-OE|78281-OE|78282-OE|78283-OE|78284-OE|78285-OE|78286-OE|78287-OE|78288-OE|78289-OE|78290-OE|78291-OE|78292-OE|78293-OE|78294-OE|78295-OE|78296-OE|78297-OE|78298-OE|78299-OE|78300-OE|78301-OE|78302-OE|78303-OE|78304-OE|78306-OE|78307-OE|78308-OE|78309-OE|78311-OE|78312-OE|78313-OE|78314-OE|78315-OE|78316-OE|78317-OE|78318-OE|78319-OE|78320-OE|78322-OE|78323-OE|78325-OE|78327-OE|78328-OE|78329-OE|78330-OE|78331-OE|78332-OE|78333-OE|78334-OE|78335-OE|78336-OE|78337-OE|78338-OE|78339-OE|78340-OE|78341-OE|78342-OE|78344-OE|78345-OE|78346-OE|78347-OE|78348-OE|78349-OE|78350-OE|78351-OE|78352-OE|78353-OE|78354-OE|78355-OE|78356-OE|78357-OE|78358-OE|78359-OE|78360-OE|78361-OE|78363-OE|78364-OE|78365-OE|78366-OE|78367-OE|78369-OE|78371-OE|78372-OE|78373-OE|78374-OE|78375-OE|78376-OE|78378-OE|78379-OE|78380-OE|78381-OE|78382-OE|78383-OE|78384-OE|78385-OE|78386-OE|78387-OE|78388-OE|78389-OE|78390-OE|78391-OE|78393-OE|78394-OE|78395-OE|78396-OE|78397-OE|78398-OE|78399-OE|78400-OE|78401-OE|78403-OE|78405-OE|78407-OE|78408-OE|78409-OE|78410-OE|78411-OE|78412-OE|78413-OE|78414-OE|78415-OE|78416-OE|78417-OE|78418-OE|78419-OE|78420-OE|78421-OE|78422-OE|78424-OE|78425-OE|78426-OE|78427-OE|78428-OE|78429-OE|78430-OE|78431-OE|78432-OE|78433-OE|78434-OE|78435-OE|78436-OE|78437-OE|78438-OE|78439-OE|78440-OE|78441-OE|78442-OE|78443-OE|78445-OE|78446-OE|78447-OE|78448-OE|78449-OE|78450-OE|78451-OE|78452-OE|78454-OE|78455-OE|78456-OE|78457-OE|78459-OE|78460-OE|78461-OE|78462-OE|78463-OE|78464-OE|78465-OE|78466-OE|78467-OE|78469-OE|78470-OE|78471-OE|78472-OE|78473-OE|78474-OE|78475-OE|78476-OE|78477-OE|78478-OE|78479-OE|78480-OE|78482-OE|78483-OE|78484-OE|78485-OE|78486-OE|78487-OE|78489-OE|78490-OE|78491-OE|78492-OE|78493-OE|78494-OE|78495-OE|78496-OE|78497-OE|78498-OE|78499-OE|78500-OE|78501-OE|78502-OE|78505-OE|78506-OE|78507-OE|78508-OE|78509-OE|78510-OE|78511-OE|78512-OE|78513-OE|78514-OE|78516-OE|78517-OE|78519-OE|78520-OE|78521-OE|78523-OE|78524-OE|78525-OE|78526-OE|78527-OE|78528-OE|78529-OE|78530-OE|78531-OE|78532-OE|78533-OE|78534-OE|78535-OE|78536-OE|78537-OE|78538-OE|78539-OE|78541-OE|78542-OE|78543-OE|78544-OE|78545-OE|78546-OE|78547-OE|78548-OE|78549-OE|78550-OE|78551-OE|78552-OE|78553-OE|78554-OE|78555-OE|78556-OE|78557-OE|78558-OE|78559-OE|78560-OE|78561-OE|78562-OE|78563-OE|78564-OE|78277-OE|78278-OE|78279-OE|78280-OE|78281-OE|78282-OE|78283-OE|78284-OE|78285-OE|78286-OE|78287-OE|78288-OE|78289-OE|78290-OE|78291-OE|78292-OE|78293-OE|78294-OE|78295-OE|78296-OE|78297-OE|78298-OE|78299-OE|78300-OE|78301-OE|78302-OE|78303-OE|78304-OE|78306-OE|78307-OE|78308-OE|78309-OE|78311-OE|78312-OE|78313-OE|78314-OE|78315-OE|78316-OE|78317-OE|78318-OE|78319-OE|78320-OE|78322-OE|78323-OE|78325-OE|78327-OE|78328-OE|78329-OE|78330-OE|78331-OE|78332-OE|78333-OE|78334-OE|78335-OE|78336-OE|78337-OE|78338-OE|78339-OE|78340-OE|78341-OE|78342-OE|78344-OE|78345-OE|78346-OE|78347-OE|78348-OE|78349-OE|78350-OE|78351-OE|78352-OE|78353-OE|78354-OE|78355-OE|78356-OE|78357-OE|78358-OE|78359-OE|78360-OE|78361-OE|78363-OE|78364-OE|78365-OE|78366-OE|78367-OE|78369-OE|78370-OE|78371-OE|78372-OE|78373-OE|78374-OE|78375-OE|78376-OE|78378-OE|78379-OE|78380-OE|78381-OE|78382-OE|78383-OE|78384-OE|78385-OE|78386-OE|78387-OE|78388-OE|78389-OE|78390-OE|78391-OE|78393-OE|78394-OE|78395-OE|78396-OE|78397-OE|78398-OE|78399-OE|78400-OE|78401-OE|78403-OE|78405-OE|78407-OE|78408-OE|78409-OE|78410-OE|78411-OE|78412-OE|78413-OE|78414-OE|78415-OE|78416-OE|78417-OE|78418-OE|78419-OE|78420-OE|78421-OE|78422-OE|78424-OE|78425-OE|78426-OE|78427-OE|78428-OE|78429-OE|78430-OE|78431-OE|78432-OE|78433-OE|78434-OE|78435-OE|78436-OE|78437-OE|78438-OE|78439-OE|78440-OE|78441-OE|78442-OE|78443-OE|78445-OE|78446-OE|78447-OE|78448-OE|78449-OE|78450-OE|78451-OE|78452-OE|78453-OE|78454-OE|78455-OE|78456-OE|78457-OE|78459-OE|78460-OE|78461-OE|78462-OE|78463-OE|78464-OE|78465-OE|78466-OE|78467-OE|78469-OE|78470-OE|78471-OE|78472-OE|78473-OE|78474-OE|78475-OE|78476-OE|78477-OE|78478-OE|78479-OE|78480-OE|78482-OE|78483-OE|78484-OE|78485-OE|78486-OE|78487-OE|78489-OE|78490-OE|78491-OE|78492-OE|78493-OE|78494-OE|78495-OE|78496-OE|78497-OE|78498-OE|78499-OE|78500-OE|78501-OE|78502-OE|78505-OE|78506-OE|78507-OE|78508-OE|78509-OE|78510-OE|78511-OE|78512-OE|78513-OE|78514-OE|78516-OE|78517-OE|78518-OE|78519-OE|78520-OE|78521-OE|78522-OE|78523-OE|78524-OE|78525-OE|78526-OE|78527-OE|78528-OE|78529-OE|78530-OE|78531-OE|78532-OE|78533-OE|78534-OE|78535-OE|78536-OE|78537-OE|78538-OE|78539-OE|78541-OE|78542-OE|78543-OE|78544-OE|78545-OE|78546-OE|78547-OE|78548-OE|78549-OE|78550-OE|78551-OE|78552-OE|78553-OE|78554-OE|78555-OE|78556-OE|78557-OE|78558-OE|78559-OE|78560-OE|78561-OE|78562-OE|78563-OE|78564-OE|78277-OE|78278-OE|78279-OE|78280-OE|78281-OE|78282-OE|78283-OE|78284-OE|78285-OE|78286-OE|78287-OE|78288-OE|78289-OE|78290-OE|78291-OE|78292-OE|78293-OE|78294-OE|78295-OE|78296-OE|78297-OE|78298-OE|78299-OE|78300-OE|78301-OE|78302-OE|78303-OE|78304-OE|78306-OE|78307-OE|78308-OE|78309-OE|78311-OE|78312-OE|78313-OE|78314-OE|78315-OE|78316-OE|78317-OE|78318-OE|78319-OE|78320-OE|78322-OE|78323-OE|78325-OE|78327-OE|78328-OE|78329-OE|78330-OE|78331-OE|78332-OE|78333-OE|78334-OE|78335-OE|78336-OE|78337-OE|78338-OE|78339-OE|78340-OE|78341-OE|78342-OE|78344-OE|78345-OE|78346-OE|78347-OE|78348-OE|78349-OE|78350-OE|78351-OE|78352-OE|78353-OE|78354-OE|78355-OE|78356-OE|78357-OE|78358-OE|78359-OE|78360-OE|78361-OE|78363-OE|78364-OE|78365-OE|78366-OE|78367-OE|78369-OE|78370-OE|78371-OE|78372-OE|78373-OE|78374-OE|78375-OE|78376-OE|78378-OE|78379-OE|78380-OE|78381-OE|78382-OE|78383-OE|78384-OE|78385-OE|78386-OE|78387-OE|78388-OE|78389-OE|78390-OE|78391-OE|78393-OE|78394-OE|78395-OE|78396-OE|78397-OE|78398-OE|78399-OE|78400-OE|78401-OE|78403-OE|78405-OE|78407-OE|78408-OE|78409-OE|78410-OE|78411-OE|78412-OE|78413-OE|78414-OE|78415-OE|78416-OE|78417-OE|78418-OE|78419-OE|78420-OE|78421-OE|78422-OE|78424-OE|78425-OE|78426-OE|78427-OE|78428-OE|78429-OE|78430-OE|78431-OE|78432-OE|78433-OE|78434-OE|78435-OE|78436-OE|78437-OE|78438-OE|78439-OE|78440-OE|78441-OE|78442-OE|78443-OE|78445-OE|78446-OE|78447-OE|78448-OE|78449-OE|78450-OE|78451-OE|78452-OE|78453-OE|78454-OE|78455-OE|78456-OE|78457-OE|78459-OE|78460-OE|78461-OE|78462-OE|78463-OE|78464-OE|78465-OE|78466-OE|78467-OE|78469-OE|78470-OE|78471-OE|78472-OE|78473-OE|78474-OE|78475-OE|78476-OE|78477-OE|78478-OE|78479-OE|78480-OE|78482-OE|78483-OE|78484-OE|78485-OE|78486-OE|78487-OE|78489-OE|78490-OE|78491-OE|78492-OE|78493-OE|78494-OE|78495-OE|78496-OE|78497-OE|78498-OE|78499-OE|78500-OE|78501-OE|78502-OE|78505-OE|78506-OE|78507-OE|78508-OE|78509-OE|78510-OE|78511-OE|78512-OE|78513-OE|78514-OE|78516-OE|78517-OE|78518-OE|78519-OE|78520-OE|78521-OE|78522-OE|78523-OE|78524-OE|78525-OE|78526-OE|78527-OE|78528-OE|78529-OE|78530-OE|78531-OE|78532-OE|78533-OE|78534-OE|78535-OE|78536-OE|78537-OE|78538-OE|78539-OE|78541-OE|78542-OE|78543-OE|78544-OE|78545-OE|78546-OE|78547-OE|78548-OE|78549-OE|78550-OE|78551-OE|78552-OE|78553-OE|78554-OE|78555-OE|78556-OE|78557-OE|78558-OE|78559-OE|78560-OE|78561-OE|78562-OE|78563-OE|78564-OE|78277-OE|78278-OE|78279-OE|78280-OE|78281-OE|78282-OE|78283-OE|78284-OE|78285-OE|78286-OE|78287-OE|78288-OE|78289-OE|78290-OE|78291-OE|78292-OE|78293-OE|78294-OE|78295-OE|78296-OE|78297-OE|78298-OE|78299-OE|78300-OE|78301-OE|78302-OE|78303-OE|78304-OE|78306-OE|78307-OE|78308-OE|78309-OE|78311-OE|78312-OE|78313-OE|78314-OE|78315-OE|78316-OE|78317-OE|78318-OE|78319-OE|78320-OE|78322-OE|78323-OE|78325-OE|78327-OE|78328-OE|78329-OE|78330-OE|78331-OE|78332-OE|78333-OE|78334-OE|78335-OE|78336-OE|78337-OE|78338-OE|78339-OE|78340-OE|78341-OE|78342-OE|78344-OE|78345-OE|78346-OE|78347-OE|78348-OE|78349-OE|78350-OE|78351-OE|78352-OE|78353-OE|78354-OE|78355-OE|78356-OE|78357-OE|78358-OE|78359-OE|78360-OE|78361-OE|78363-OE|78364-OE|78365-OE|78366-OE|78367-OE|78369-OE|78370-OE|78371-OE|78372-OE|78373-OE|78374-OE|78375-OE|78376-OE|78378-OE|78379-OE|78380-OE|78381-OE|78382-OE|78383-OE|78384-OE|78385-OE|78386-OE|78387-OE|78388-OE|78389-OE|78390-OE|78391-OE|78393-OE|78394-OE|78395-OE|78396-OE|78397-OE|78398-OE|78399-OE|78400-OE|78401-OE|78403-OE|78405-OE|78407-OE|78408-OE|78409-OE|78410-OE|78411-OE|78412-OE|78413-OE|78414-OE|78415-OE|78416-OE|78417-OE|78418-OE|78419-OE|78420-OE|78421-OE|78422-OE|78424-OE|78425-OE|78426-OE|78427-OE|78428-OE|78429-OE|78430-OE|78431-OE|78432-OE|78433-OE|78434-OE|78435-OE|78436-OE|78437-OE|78438-OE|78439-OE|78440-OE|78441-OE|78442-OE|78443-OE|78445-OE|78446-OE|78447-OE|78448-OE|78449-OE|78450-OE|78451-OE|78452-OE|78453-OE|78454-OE|78455-OE|78456-OE|78457-OE|78459-OE|78460-OE|78461-OE|78462-OE|78463-OE|78464-OE|78465-OE|78466-OE|78467-OE|78469-OE|78470-OE|78471-OE|78472-OE|78473-OE|78474-OE|78475-OE|78476-OE|78477-OE|78478-OE|78479-OE|78480-OE|78482-OE|78483-OE|78484-OE|78485-OE|78486-OE|78487-OE|78489-OE|78490-OE|78491-OE|78492-OE|78493-OE|78494-OE|78495-OE|78496-OE|78497-OE|78498-OE|78499-OE|78500-OE|78501-OE|78502-OE|78505-OE|78506-OE|78507-OE|78508-OE|78509-OE|78510-OE|78511-OE|78512-OE|78513-OE|78514-OE|78516-OE|78517-OE|78518-OE|78519-OE|78520-OE|78521-OE|78522-OE|78523-OE|78524-OE|78525-OE|78526-OE|78527-OE|78528-OE|78529-OE|78530-OE|78531-OE|78532-OE|78533-OE|78534-OE|78535-OE|78536-OE|78537-OE|78538-OE|78539-OE|78541-OE|78542-OE|78543-OE|78544-OE|78545-OE|78546-OE|78547-OE|78548-OE|78549-OE|78550-OE|78551-OE|78552-OE|78553-OE|78554-OE|78555-OE|78556-OE|78557-OE|78558-OE|78559-OE|78560-OE|78561-OE|78562-OE|78563-OE|78564-OE|78277-OE|78278-OE|78279-OE|78280-OE|78281-OE|78282-OE|78283-OE|78284-OE|78285-OE|78286-OE|78287-OE|78288-OE|78289-OE|78290-OE|78291-OE|78292-OE|78293-OE|78294-OE|78295-OE|78296-OE|78297-OE|78298-OE|78299-OE|78300-OE|78301-OE|78302-OE|78303-OE|78304-OE|78306-OE|78307-OE|78308-OE|78309-OE|78311-OE|78312-OE|78313-OE|78314-OE|78315-OE|78316-OE|78317-OE|78318-OE|78319-OE|78320-OE|78322-OE|78323-OE|78325-OE|78327-OE|78328-OE|78329-OE|78330-OE|78331-OE|78332-OE|78333-OE|78334-OE|78335-OE|78336-OE|78337-OE|78338-OE|78339-OE|78340-OE|78341-OE|78342-OE|78344-OE|78345-OE|78346-OE|78347-OE|78348-OE|78349-OE|78350-OE|78351-OE|78352-OE|78353-OE|78354-OE|78355-OE|78356-OE|78357-OE|78358-OE|78359-OE|78360-OE|78361-OE|78363-OE|78364-OE|78365-OE|78366-OE|78367-OE|78369-OE|78370-OE|78371-OE|78372-OE|78373-OE|78374-OE|78375-OE|78376-OE|78378-OE|78379-OE|78380-OE|78381-OE|78382-OE|78383-OE|78384-OE|78385-OE|78386-OE|78387-OE|78388-OE|78389-OE|78390-OE|78391-OE|78393-OE|78394-OE|78395-OE|78396-OE|78397-OE|78398-OE|78399-OE|78400-OE|78401-OE|78403-OE|78405-OE|78407-OE|78408-OE|78409-OE|78410-OE|78411-OE|78412-OE|78413-OE|78414-OE|78415-OE|78416-OE|78417-OE|78418-OE|78419-OE|78420-OE|78421-OE|78422-OE|78424-OE|78425-OE|78426-OE|78427-OE|78428-OE|78429-OE|78430-OE|78431-OE|78432-OE|78433-OE|78434-OE|78435-OE|78436-OE|78437-OE|78438-OE|78439-OE|78440-OE|78441-OE|78442-OE|78443-OE|78445-OE|78446-OE|78447-OE|78448-OE|78449-OE|78450-OE|78451-OE|78452-OE|78453-OE|78454-OE|78455-OE|78456-OE|78457-OE|78459-OE|78460-OE|78461-OE|78462-OE|78463-OE|78464-OE|78465-OE|78466-OE|78467-OE|78469-OE|78470-OE|78471-OE|78472-OE|78473-OE|78474-OE|78475-OE|78476-OE|78477-OE|78478-OE|78479-OE|78480-OE|78482-OE|78483-OE|78484-OE|78485-OE|78486-OE|78487-OE|78489-OE|78490-OE|78491-OE|78492-OE|78493-OE|78494-OE|78495-OE|78496-OE|78497-OE|78498-OE|78499-OE|78500-OE|78501-OE|78502-OE|78505-OE|78506-OE|78507-OE|78508-OE|78509-OE|78510-OE|78511-OE|78512-OE|78513-OE|78514-OE|78516-OE|78517-OE|78518-OE|78519-OE|78520-OE|78521-OE|78522-OE|78523-OE|78524-OE|78525-OE|78526-OE|78527-OE|78528-OE|78529-OE|78530-OE|78531-OE|78532-OE|78533-OE|78534-OE|78535-OE|78536-OE|78537-OE|78538-OE|78539-OE|78541-OE|78542-OE|78543-OE|78544-OE|78545-OE|78546-OE|78547-OE|78548-OE|78549-OE|78550-OE|78551-OE|78552-OE|78553-OE|78554-OE|78555-OE|78556-OE|78557-OE|78558-OE|78559-OE|78560-OE|78561-OE|78562-OE|78563-OE|78564-OE"},{"text":"Unidad para la Atención y Reparación Integral a las Víctimas - UARIV (Respuesta sobre medidas de reparación integral)","enlace":"1000149-OEMB"}
          ].map(r => {
            return (<>
              <Card
                style={{
                  width: '100%',
                  marginBottom: 10
                }}
              >
                <CardHeader
                  title={<>
                    <Toolbar
                      style={{
                        padding: 0,
                        justifyContent: 'space-between'
                      }}
                    >
                      <Typography
                        style={{
                          fontSize: 16
                        }}
                        variant="h6"
                      >{r.text}</Typography>
                      <Box
                        style={{
                          width: 150,
                          display: 'flex',
                          justifyContent: 'flex-end'
                        }}
                      >
                        {r.dataset &&
                          <a href={"https://api.archivo.comisiondelaverdad.co/api/records/inventarios/" + r.dataset}>
                            <IconButton
                              size="small"
                              style={{
                                border: '1px solid #7a8da4',
                                background: '#7a8da4',
                                color: 'white',
                                padding: 5,
                                marginLeft: 10
                              }}
                            >
                              <StorageIcon />
                            </IconButton>
                          </a>
                        }
                        {r.backup &&
                          <a href={"https://api.archivo.comisiondelaverdad.co/api/records/backup/" + r.backup}>
                            <IconButton
                              size="small"
                              style={{
                                border: '1px solid #7a8da4',
                                background: '#7a8da4',
                                color: 'white',
                                padding: 5,
                                marginLeft: 15
                              }}
                            >
                              <CloudDownloadOutlinedIcon />
                            </IconButton>
                          </a>
                        }
                        {r.enlace &&
                          <Link to={"/explora/buscador?fondos=" + r.enlace}>
                            <IconButton
                              size="small"
                              style={{
                                border: '1px solid #7a8da4',
                                background: '#7a8da4',
                                color: 'white',
                                padding: 5,
                                marginLeft: 10
                              }}
                            >
                              <LocalLibraryOutlinedIcon />
                            </IconButton>
                          </Link>
                        }



                      </Box>

                    </Toolbar>

                  </>}
                  style={{
                    padding: 5,
                    paddingLeft: 20,
                    borderBottom: '1px dotted #dcdcdc'
                  }}
                >

                </CardHeader>
              </Card>
            </>)
          })}
          {/* <FondosArbol
            fondo={fondos}
            setFondo={setNewFondo}
            root={root}
            setLoading={(e) => {
              setLoading(e);
            }}
          />

          {loading && (
            <Box className={classes.loadingViz}>
              <Lottie
                height={150}
                width={150}
                options={{
                  loop: true,
                  autoplay: true,
                  title: "Cargando...",
                  animationData: animationData,
                  rendererSettings: {
                    preserveAspectRatio: "xMidYMid slice",
                  },
                }}
              />
            </Box>
          )}

          {fondos.length > 0 && (
            <Link
              to={`/explora/buscador?fondos=${fondos
                .map((e) => e.id)
                .join("|")}`}
            >
              <Button
                variant="contained"
                color="success"
                className={classes.hoverButton}
              >
                Explorar los fondos seleccionados
              </Button>
            </Link>
          )} */}
        </Box>
      </Box>
    </MainLayout>
  );
};

export default Fondos;
