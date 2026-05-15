import { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import MainLayout from "../../sim-ui/layout/MainLayout";
import Container from "@material-ui/core/Container";
import { Link, Typography } from "@material-ui/core/";
import { connect } from "react-redux";
import * as museo from "../../store/ducks/museo.duck";
import * as TermService from "../../services/TermService";
import Icon from "@material-ui/core/Icon";
import AbcDiccionario from "../../sim-ui/organisms/diccionario/AbcDiccionario";

import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";

import { makeStyles } from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import * as SemanticService from "../../services/SemanticService";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    margin: "0 0 2% 0",
  },
  panelFondo: {
    padding: "4% 0 0 0",
    backgroundColor: "#2A5080",
    height: "50%",
    minHeight: "450px",
  },
  panelNavegacion: {
    padding: "1% 13% 0 13%",
  },
  panelAcd: {
    textAlign: "center",
  },
  panelRutaNavegacion: {
    padding: "1% 13% 0 13%",
  },
  h4RutaNavegacion: {
    fontStyle: "italic",
    fontWeight: "bold",
    color: "#ffffff",
  },
  iconColorAmarillo: {
    color: "#FFCF4D",
  },
  panelRutaNavegeacion: {
    padding: "1% 13% 0 13%",
    color: "#ffffff",
  },
  iconColorAmarilloRuta: {
    color: "#FFCF4D",
    fontSize: "12px",
  },
  linkRuta: {
    color: "#ffffff",
  },
  tituloTerm: {
    fontWeight: "bold",
    color: "#2A5080",
  },
  tituloTermSub: {
    color: "#2A5080",
  },
  media: {
    width: "75%",
    margin: "0 auto",
  },
  imagenTerm: {
    textAlign: "center",
  },
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const BusquedaDiccionario = (props) => {
  const like = props.match.params.id;
  const [terminos, setTerminos] = useState(null);
  const [campos, setCampos] = useState(null);
  const [carga, setCarga] = useState(false);
  const [carga2, setCarga2] = useState(false);
  const [value, setValue] = useState(0);

  const classes = useStyles();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //Creo el termino

  useEffect(() => {
    if (!carga) {
      SemanticService.diccionarioLike(like).then(
        (data) => {
          setCampos(data);
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
      TermService.diccionarioLike(like).then(
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
      <Grid
        container
        item
        xs={12}
        sm={12}
        md={12}
        className={classes.panelFondo}
      >
        <Container>
          <Grid item xs={12} sm={12} md={12} className={classes.panelAcd}>
            <AbcDiccionario
              titulo="Diccionario"
              like={like}
              ocultartitulo={true}
              enviarurl="/diccionario/terminos"
            ></AbcDiccionario>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            className={classes.panelRutaNavegacion}
          >
            <Typography variant="h4" className={classes.h4RutaNavegacion}>
              <Icon className={classes.iconColorAmarillo}>more</Icon>{" "}
              Diccionario
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            className={classes.panelRutaNavegeacion}
          >
            <Icon className={classes.iconColorAmarilloRuta}>
              arrow_forward_ios
            </Icon>{" "}
            <Link className={classes.linkRuta} href="/diccionario">
              Home
            </Link>{" "}
            / <Link className={classes.linkRuta}>Términos</Link> /{" "}
            <Link className={classes.linkRuta}>{like}</Link>
          </Grid>
          <Container className={classes.panelNavegacion}>
            <AppBar position="static" color="default" className={classes.root}>
              <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                centered
              >
                <Tab label="TÉRMINOS" />
                <Tab label="CAMPOS SEMÁNTICOS" />
              </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
              {terminos &&
                terminos.map((item, index) => (
                  <Card
                    className={classes.root}
                    onClick={() => {
                      window.location.href =
                        "/diccionario/termino/" + like + "/" + item._id;
                    }}
                  >
                    <CardActionArea>
                      <Grid container xs={12} sm={12} md={12}>
                        {typeof item.img !== "undefined" > 0 && (
                          <Grid
                            item
                            xs={4}
                            sm={4}
                            md={4}
                            className={classes.imagenTerm}
                          >
                            <CardMedia
                              className={classes.media}
                              component="img"
                              src={item.img}
                              title={item.name}
                            />
                          </Grid>
                        )}
                        <Grid
                          item
                          xs={typeof item.img === "undefined" ? 12 : 8}
                          sm={typeof item.img === "undefined" ? 12 : 8}
                          md={typeof item.img === "undefined" ? 12 : 8}
                        >
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h4"
                              component="h1"
                              className={classes.tituloTerm}
                            >
                              {item.name}
                            </Typography>
                            <Typography
                              variant="span"
                              className={classes.tituloTermSub}
                            >
                              Término
                            </Typography>
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              component="p"
                            >
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: item.definition,
                                }}
                              />
                            </Typography>
                          </CardContent>
                        </Grid>
                      </Grid>
                    </CardActionArea>
                  </Card>
                ))}
            </TabPanel>
            <TabPanel value={value} index={1}>
              {campos &&
                campos.map((item, index) => (
                  <Card
                    className={classes.root}
                    onClick={() => {
                      window.location.href =
                        "/diccionario/campo/" + like + "/" + item._id;
                    }}
                  >
                    <CardActionArea>
                      <Grid container xs={12} sm={12} md={12}>
                        {typeof item.img !== "undefined" > 0 && (
                          <Grid
                            item
                            xs={4}
                            sm={4}
                            md={4}
                            className={classes.imagenTerm}
                          >
                            <CardMedia
                              className={classes.media}
                              component="img"
                              src={item.img}
                              title={item.name}
                            />
                          </Grid>
                        )}
                        <Grid
                          item
                          xs={typeof item.img === "undefined" ? 12 : 8}
                          sm={typeof item.img === "undefined" ? 12 : 8}
                          md={typeof item.img === "undefined" ? 12 : 8}
                        >
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h4"
                              component="h1"
                              className={classes.tituloTerm}
                            >
                              {item.name}
                            </Typography>
                            <Typography
                              variant="span"
                              className={classes.tituloTermSub}
                            >
                              Campo semántico
                            </Typography>
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              component="p"
                            >
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: item.definition,
                                }}
                              />
                            </Typography>
                          </CardContent>
                        </Grid>
                      </Grid>
                    </CardActionArea>
                  </Card>
                ))}
            </TabPanel>
          </Container>
        </Container>
      </Grid>
    </MainLayout>
  );
};

const mapStateToProps = (store) => ({
  openLienzoCrea: store.museo.openLienzoCrea,
});

export default connect(mapStateToProps, museo.actions)(BusquedaDiccionario);
