import { useEffect, useState } from "react";
import * as SemanticService from "../../services/SemanticService";
import AbcDiccionario from "../../sim-ui/organisms/diccionario/AbcDiccionario";
import { makeStyles } from "@material-ui/core/styles";
import withWidth, { isWidthDown } from "@material-ui/core/withWidth";
import { connect } from "react-redux";
import * as app from "../../store/ducks/app.duck";
import { useTranslation } from "react-i18next";
import MainLayout from "../../sim-ui/layout/MainLayout";
import TopFilters from "../../sim-ui/organisms/bloqueBusqueda/TopFilters";
import IntroSection from "../../sim-ui/organisms/IntroSection";
import IntroDicc from "../../sim-ui/assets/intro_dicc.png";
import imgLeft from "../../sim-ui/assets/gestorNarrativas/hoja_roja.png";
import imgRight from "../../sim-ui/assets/gestorNarrativas/hoja_verde.png";
import { Container, Typography, Box, Tab, Tabs } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  tituloHome: {
    fontSize: "7vw",
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  parrafoHome: {
    color: "#FFFFFF",
    padding: "0 50% 0 0",
  },
  parrafoHomexs: {
    color: "#FFFFFF",
    padding: "0 0 0 0",
  },
  parrafoHomesm: {
    color: "#FFFFFF",
    padding: "0 10% 0 0",
  },
  parrafoHomemd: {
    color: "#FFFFFF",
    padding: "0 20% 0 0",
  },
  parrafoHomelg: {
    color: "#FFFFFF",
    padding: "0 50% 0 0",
  },
  panelFondo: {
    padding: "4% 0 0 0",
    backgroundColor: "#2A5080",
    height: "50%",
    minHeight: "450px",
  },
  panelFondoMovilxs: {
    padding: "20% 0 0 0",
    backgroundColor: "#2A5080",
    height: "80%",
    minHeight: "250px",
  },
  panelFondoMovilsm: {
    padding: "10% 0 0 0",
    backgroundColor: "#2A5080",
    height: "80%",
    minHeight: "250px",
  },
  panelFondoMovilmd: {
    padding: "7% 0 0 0",
    backgroundColor: "#2A5080",
    height: "80%",
    minHeight: "250px",
  },
  panelFondoMovillg: {
    padding: "4% 0 0 0",
    backgroundColor: "#2A5080",
    height: "80%",
    minHeight: "250px",
  },
  panelNavegacion: {
    width: "80%",
  },
  panelAcd: {
    width: "80%",
    textAlign: "center",
  },
  sectionsContainer: {
    marginBottom: "calc(72px + 5vh)",
  },
  abc: {
    backgroundColor: theme.palette.secondary.main,
  },
  contenedorTab: {
    borderBottom: `1px solid ${theme.palette.secondary.main}`,
    marginBottom: "30px",
    marginTop: "10px",
  },
  tab: {
    fontSize: 16,
    letterSpacing: 1.35,
    color: theme.palette.primary.main,
    textTransform: "none",
    opacity: 1,
  },
  txt: {
    color: theme.palette.primary.main,
  },
}));

const HomeDiccionario = (props) => {
  const [value, setValue] = useState(0);
  const like = props.match
    ? props.match.params
      ? props.match.params.id
      : null
    : null;
  const [termino, setTermino] = useState(null);
  const [terminos, setTerminos] = useState(null);
  const [carga, setCarga] = useState(false);
  const [carga2, setCarga2] = useState(false);
  const classes = useStyles();
  const [t, i18n] = useTranslation("common");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //Creo el termino
  useEffect(() => {
    if (!carga) {
      SemanticService.diccionarioAbcFind(like).then(
        (data) => {
          setTermino(data);
          setCarga(true);
        },
        (error) => {
          console.log(error);
        },
      );
    }
  }, []);

  useEffect(() => {
    if (!carga2) {
      SemanticService.diccionarioAbc(like).then(
        (data) => {
          setTerminos(data);
          setCarga2(true);
        },
        (error) => {
          console.log(error);
        },
      );
    }
  }, []);

  return (
    <MainLayout>
      <TopFilters
        place={"Explora"}
        filtros={false}
        keyword={null}
        temporalRange=""
        setTemporalRange=""
        dpto=""
        setDpto=""
        setKeyword=""
        total=""
      />

      {isWidthDown("sm", props.width) ? (
        <div className={classes.sectionsContainer}>
          <IntroSection
            title={t("dictionary.title")}
            description={t("dictionary.home")}
            img={IntroDicc}
          />
          <Box className={classes.abc}>
            <AbcDiccionario
              titulo="Diccionario"
              like=""
              ocultartitulo={true}
              enviarurl="/diccionario/terminos"
            ></AbcDiccionario>
          </Box>

          <Container>
            <Tabs
              centered={true}
              className={classes.contenedorTab}
              value={value}
              onChange={handleChange}
            >
              <Tab className={classes.tab} label="Términos" value={0} />
              <Tab className={classes.tab} label="Campo Semántico" value={1} />
            </Tabs>

            <Typography variant="body1" className={classes.txt}>
              {value === 0
                ? t("dictionary.terminos")
                : value === 1
                ? t("dictionary.campoSemantico")
                : ""}
            </Typography>
          </Container>
        </div>
      ) : (
        <>
          <div className={classes.abc}>
            <Container>
              <AbcDiccionario
                titulo="Diccionario"
                like=""
                ocultartitulo={true}
                enviarurl="/diccionario/terminos"
              />
            </Container>
          </div>
          <IntroSection
            title={t("dictionary.title")}
            description={t("dictionary.home")}
            img={IntroDicc}
            longText={true}
            sideImgs={[
              { img: imgLeft, style: { top: 0, left: 0 } },
              { img: imgRight, style: { top: 0, right: 0 } },
            ]}
          />
        </>
      )}
    </MainLayout>
  );
};

const mapStateToProps = (store) => ({
  openLienzoCrea: store.museo.openLienzoCrea,
});

export default connect(mapStateToProps, app.actions)(HomeDiccionario);
