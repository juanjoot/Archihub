import { forwardRef, useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import withWidth, { isWidthDown } from "@material-ui/core/withWidth";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Divider from "@material-ui/core/Divider";

import Slide from "@material-ui/core/Slide";
import ResumenColeccion from "../sim-ui/organisms/ResumenColeccion";
import Container from "@material-ui/core/Container";
import MainLayout from "../sim-ui/layout/MainLayout";

import * as museo from "../store/ducks/museo.duck";
import * as CollectionService from "../services/CollectionService";

import Multimedia from "../sim-ui/assets/gestorNarrativas/Multimedia.png";
import imgLeft from "../sim-ui/assets/gestorNarrativas/hoja_roja.png";
import imgRight from "../sim-ui/assets/gestorNarrativas/hoja_verde.png";
import IntroSection from "../sim-ui/organisms/IntroSection";
import TopFilters from "../sim-ui/organisms/bloqueBusqueda/TopFilters";
import { useTranslation } from "react-i18next";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <>{children}</>}
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  containerColecciones: {
    marginBottom: "120px",
  },
  resumenColecciones: {
    marginTop: "0px",
  },
  textResumenColecciones: {
    fontWeight: "bold",
    color: theme.palette.primary.main,
    letterSpacing: 2,
  },
  contenedorTab: {
    borderBottom: `1px solid ${theme.palette.primary.main}`,
    marginBottom: "30px",
  },
  contenedorTabPanelMobile: {
    width: "100%",
    paddingTop: "20px",
  },
  contenedorTabPanel: {
    width: "100%",
    paddingTop: "30px",
  },
  tab: {
    fontSize: 16,
    letterSpacing: 1.35,
    color: theme.palette.primary.main,
  },
  divider: {
    backgroundColor: theme.palette.primary.main,
    marginBottom: 5,
  },
}));

const CustomTab = withStyles({
  root: {
    textTransform: "none",
  },
})(Tab);

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const GestorNarrativasIntro = (props) => {
  const { openLienzoCrea, setActiveCollection, setActiveStepCrea } = props;
  const [colecciones, setColecciones] = useState([]);
  const [abrirDialogoBorrar, setAbrirDialogoBorrar] = useState(false);
  const [carga, setCarga] = useState(true);
  const [idBorrar, setIdBorrar] = useState(null);
  const classes = useStyles();
  const history = useNavigate();
  const [value, setValue] = useState(0);
  if (openLienzoCrea) {
    history("/crea/narrativas/lienzo");
  }

  const [t, i18n] = useTranslation("common");

  useEffect(() => {
    if (carga) {
      setCarga(false);
      cargarColecciones();
    }
  });

  const cargarColecciones = () => {
    CollectionService.getResumeCollectionByUser().then(
      (data) => setColecciones(data),
      (error) => console.log(error),
    );
  };

  const editarColeccion = (id) => {
    if (typeof id !== "undefined") {
      CollectionService.getCollectionById(id).then(
        (data) => {
          setActiveStepCrea(0);
          setActiveCollection(data);
          history("/crea/narrativas/lienzo");
        },
        (error) => {
          console.log(error);
        },
      );
    }
  };

  const borrarColeccion = () => {
    if (typeof idBorrar !== "undefined") {
      CollectionService.deleteCollection(idBorrar).then(
        (data) => {
          cargarColecciones();
        },
        (error) => {
          console.log(error);
        },
      );
    }
    handleCerrarDialogoBorrar();
  };

  const handlerTarjetaResumenColeccion = (tipo, id) => {
    let ruta = "/crea/narrativas";
    if (tipo === "nueva") {
      setActiveCollection(null);
      setActiveStepCrea(0);
      ruta = "/crea/narrativas/lienzo";
      history(ruta);
    } else if (tipo === "ver") {
      ruta = "/" + id;
      history(ruta);
    } else if (tipo === "editar") {
      editarColeccion(id);
    } else if (tipo === "borrar") {
      setIdBorrar(id);
      handleAbrirDialogoBorrar();
    }
  };

  const handleAbrirDialogoBorrar = () => {
    setAbrirDialogoBorrar(true);
  };

  const handleCerrarDialogoBorrar = () => {
    setAbrirDialogoBorrar(false);
  };

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <MainLayout className={classes.root}>
      <TopFilters
        place={"crea"}
        keyword={null}
        temporalRange=""
        setTemporalRange=""
        dpto=""
        setDpto=""
        setKeyword=""
        total=""
      />
      <IntroSection
        title={t("crea.narrativeManager.intro.title")}
        description={t("crea.narrativeManager.intro.text")}
        img={Multimedia}
        bigImg={true}
        sideImgs={[
          { img: imgLeft, style: { top: 0, left: 0 } },
          { img: imgRight, style: { top: 0, right: 0 } },
        ]}
      />

      <Container
        maxWidth="xl"
        className={
          isWidthDown("md", props.width)
            ? classes.contenedorTabPanelMobile
            : classes.contenedorTabPanel
        }
      >
        <div className={classes.contenedorTab}>
          <Tabs
            centered={true}
            value={value}
            onChange={handleChangeTab}
            indicatorColor="primary"
            aria-label="basic tabs example"
          >
            <CustomTab className={classes.tab} label="Biblioteca" />
          </Tabs>
        </div>
      </Container>

      <Container maxWidth="lg" className={classes.containerColecciones}>
        <TabPanel value={value} index={0}>
          <div className={classes.resumenColecciones}>
            <Typography variant="h4" className={classes.textResumenColecciones}>
              Colecciones
            </Typography>

            <Divider className={classes.divider} />

            <ResumenColeccion
              handlerTarjetaResumen={handlerTarjetaResumenColeccion}
              colecciones={colecciones}
              nueva={true}
            />
          </div>
        </TabPanel>

        <Dialog
          open={abrirDialogoBorrar}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleCerrarDialogoBorrar}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogContent>
            <DialogContentText
              id="alert-dialog-slide-description"
              color="primary"
            >
              Esta acción borrará la colección seleccionada, ¿está seguro que
              desea continuar?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleCerrarDialogoBorrar}
              variant="contained"
              color="primary"
            >
              Cancelar
            </Button>
            <Button
              onClick={borrarColeccion}
              variant="contained"
              color="primary"
            >
              Si
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </MainLayout>
  );
};

const mapStateToProps = (store) => ({
  openLienzoCrea: store.museo.openLienzoCrea,
  activeCollection: store.museo.activeCollection,
});

export default connect(
  mapStateToProps,
  museo.actions,
)(withWidth()(GestorNarrativasIntro));
