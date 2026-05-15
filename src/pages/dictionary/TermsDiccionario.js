import { useEffect, useState } from "react";
import * as TermService from "../../services/TermService";
import * as SemanticService from "../../services/SemanticService";
import AbcDiccionario from "../../sim-ui/organisms/diccionario/AbcDiccionario";
import TerminoTitle from "../../sim-ui/organisms/diccionario/TerminoTitle";
import TabsDiccionario from "../../sim-ui/organisms/diccionario/TabsDiccionario";
import TermsList from "../../sim-ui/organisms/diccionario/TermsList";
import MainLayout from "../../sim-ui/layout/MainLayout";
import TopFilters from "../../sim-ui/organisms/bloqueBusqueda/TopFilters";
import quote from "../../sim-ui/assets/quote.svg";
import withWidth, { isWidthDown } from "@material-ui/core/withWidth";
import { makeStyles } from "@material-ui/core/styles";

import { connect } from "react-redux";
import * as museo from "../../store/ducks/museo.duck";

import {
  Link,
  Typography,
  Grid,
  Box,
  Container,
  Icon,
  Paper,
} from "@material-ui/core/";

const useStyles = makeStyles((theme) => ({
  panelFondo: {
    padding: "4% 0 0 0",
    backgroundColor: "#2A5080",
    height: "50%",
    minHeight: 450,
  },
  panelFondoMovilxs: {
    padding: "20% 0 0 0",
    backgroundColor: "#2A5080",
    height: "80%",
    minHeight: 250,
  },
  panelFondoMovilsm: {
    padding: "10% 0 0 0",
    backgroundColor: "#2A5080",
    height: "80%",
    minHeight: 250,
  },
  panelFondoMovilmd: {
    padding: "7% 0 0 0",
    backgroundColor: "#2A5080",
    height: "80%",
    minHeight: 250,
  },
  panelFondoMovillg: {
    padding: "4% 0 0 0",
    backgroundColor: "#2A5080",
    height: "80%",
    minHeight: 250,
  },
  abc: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

const panelFondo2 = {
  backgroundColor: "#ffffff",
  borderRadius: "30px",
  padding: "2% 2% 0 2%",
  height: "50%",
  minHeight: 450,
};

const panelNavegacion = {
  padding: "1% 13% 0 13%",
};

const panelAcd = {
  textAlign: "center",
};

const buttonAcd = {
  fontSize: "3rem",
  fontStyle: "italic",
  fontWeight: "bold",
  margin: "0 5px 0 5px",
  color: "#ffffff",
};

const panelRutaNavegacion = {
  padding: "1% 13% 0 13%",
};

const h4RutaNavegacion = {
  fontStyle: "italic",
  fontWeight: "bold",
  color: "#ffffff",
};

const iconColorAmarillo = {
  color: "#FFCF4D",
};

const panelRutaNavegeacion = {
  padding: "1% 13% 0 13%",
  color: "#ffffff",
};

const iconColorAmarilloRuta = {
  color: "#FFCF4D",
  fontSize: "12px",
};

const linkRuta = {
  color: "#ffffff",
};

const navegarItems = {
  borderLeftStyle: "solid",
  borderLeftSize: "1px",
  borderLeftColor: "#FFCF4D",
  margin: "2% 0 0 0",
  padding: "1% 0 0 0",
};

const letraTitulo = {
  fontSize: "10rem",
  fontWeight: "bold",
  textAlign: "center",
  color: "#2A5080",
  fontStyle: "italic",
};

const parrafoTitulo = {
  textAlign: "justify",
  color: "#2A5080",
  padding: "0 10% 0 10%",
};

const letraSubTitulo = {
  textAlign: "center",
  color: "#C9CCD3",
  fontWeight: "bold",
};

const listItems = {
  fontWeight: "bold",
  color: "#2A5080",
  listStyleType: "none",
  paddingLeft: "5%",
};

const listItem = {
  color: "#2A5080",
  fontStyle: "italic",
};

const TermsDiccionario = (props) => {
  const [type, setType] = useState(
    window.location.href.includes("terminos") ? "terminos" : "campos",
  );
  const like = props.match.params.id;
  const [termino, setTermino] = useState(null);
  const [terminos, setTerminos] = useState(null);
  const [carga, setCarga] = useState(false);
  const [carga2, setCarga2] = useState(false);
  const classes = useStyles();
  const [value, setValue] = useState(type === "terminos" ? 0 : 1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    setType(value === 0 ? "terminos" : "campos");
  }, [value]);

  useEffect(() => {
    if (window.location.pathname != `/diccionario/${type}/${like}`) {
      window.history.replaceState(null, null, `/diccionario/${type}/${like}`);
      setCarga(false);
      setCarga2(false);
    }
  }, [type]);

  // Creo el termino
  useEffect(() => {
    if (!carga && type === "terminos") {
      TermService.diccionarioAbcFind(like).then(
        (data) => {
          setTermino(data);
          setCarga(true);
        },
        (error) => {
          console.log(error);
        },
      );
    } else if (!carga && type === "campos") {
      SemanticService.diccionarioAbcFind(like).then(
        (data) => {
          setTermino(data);
          setCarga(true);
        },
        (error) => console.log(error),
      );
    }
  }, [carga]);

  useEffect(() => {
    if (!carga2 && type === "terminos") {
      TermService.diccionarioAbc(like).then(
        (data) => {
          setTerminos(data);
          setCarga2(true);
        },
        (error) => {
          console.log(error);
        },
      );
    } else if (!carga2 && type === "campos") {
      SemanticService.diccionarioAbc(like).then(
        (data) => {
          setTerminos(data);
          setCarga2(true);
        },
        (error) => console.log(error),
      );
    }
  }, [carga2]);

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
        <>
          <Box className={classes.abc}>
            <AbcDiccionario
              titulo="Diccionario"
              like=""
              ocultartitulo={true}
              enviarurl="/diccionario/terminos"
            ></AbcDiccionario>
          </Box>

          <TerminoTitle termino={termino} like={like} img={quote} />
          <TabsDiccionario
            like={like}
            value={value}
            handleChange={handleChange}
          />
          <TermsList items={terminos} like={like} type={"termino"} />
        </>
      ) : (
        <Grid
          container
          item
          xs={12}
          sm={12}
          md={12}
          className={
            isWidthDown("xs", props.width)
              ? classes.panelFondoMovilxs
              : isWidthDown("sm", props.width)
              ? classes.panelFondoMovilsm
              : isWidthDown("md", props.width)
              ? classes.panelFondoMovilmd
              : isWidthDown("lg", props.width)
              ? classes.panelFondoMovillg
              : classes.panelFondo
          }
        >
          <Container>
            <Grid item xs={12} sm={12} md={12} style={panelAcd}>
              <AbcDiccionario
                titulo="Diccionario"
                like={like}
                ocultartitulo={true}
                enviarurl="/diccionario/terminos"
              ></AbcDiccionario>
            </Grid>
            <Grid item xs={12} sm={12} md={12} style={panelRutaNavegacion}>
              <Typography variant="h4" style={h4RutaNavegacion}>
                <Icon style={iconColorAmarillo}>more</Icon> Diccionario
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={12} style={panelRutaNavegeacion}>
              <Icon style={iconColorAmarilloRuta}>arrow_forward_ios</Icon>{" "}
              <Link style={linkRuta} href="/diccionario">
                Home
              </Link>{" "}
              / <Link style={linkRuta}>Términos</Link> /
            </Grid>
            <Container style={panelNavegacion}>
              <Grid container xs={12} sm={12} md={12} style={panelFondo2}>
                <Grid item xs={6} sm={3}></Grid>
                <Grid item xs={6} sm={3}></Grid>
                <Grid item xs={6} sm={3}>
                  <Paper>
                    <Link
                      onClick={() => {
                        window.location.href = `/diccionario/términos/${like}`;
                      }}
                      button
                      component="button"
                    >
                      TÉRMINOS
                    </Link>
                  </Paper>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Paper>
                    <Link
                      onClick={() => {
                        window.location.href = `/diccionario/campos/${like}`;
                      }}
                      button
                      component="button"
                    >
                      CAMPOS SEMÁNTICOS
                    </Link>
                  </Paper>
                </Grid>
                <Grid
                  item
                  xs={6}
                  sm={6}
                  md={6}
                  style={{ padding: "2% 5% 0 0" }}
                >
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    className={classes.infoItems}
                  >
                    <Typography variant="h1" style={letraTitulo}>
                      {like}
                    </Typography>
                    <Typography variant="h5" style={letraSubTitulo}>
                      {termino && termino.name}
                    </Typography>
                    <Typography
                      component="p"
                      style={parrafoTitulo}
                      paragraph={true}
                    >
                      <div
                        dangerouslySetInnerHTML={{
                          __html: termino && termino.definition,
                        }}
                      />
                    </Typography>
                  </Grid>
                </Grid>

                <Grid item xs={6} sm={6} md={6} style={navegarItems}>
                  <ul style={listItems}>
                    {terminos &&
                      terminos.map((item, index) => (
                        <li>
                          <Link
                            style={listItem}
                            onClick={() => {
                              window.location.href = `/diccionario/termino/${like}/${item._id}`;
                            }}
                            button
                            component="button"
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                  </ul>
                </Grid>
              </Grid>
            </Container>
          </Container>
        </Grid>
      )}
    </MainLayout>
  );
};

const mapStateToProps = (store) => ({
  openLienzoCrea: store.museo.openLienzoCrea,
});

export default connect(
  mapStateToProps,
  museo.actions,
)(withWidth()(TermsDiccionario));
