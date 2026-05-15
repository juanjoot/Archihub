import { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import MainLayout from "../../sim-ui/layout/MainLayout";
import Container from "@material-ui/core/Container";
import { Link, Typography } from "@material-ui/core/";
import * as TermService from "../../services/TermService";
import Icon from "@material-ui/core/Icon";
import AbcDiccionario from "../../sim-ui/organisms/diccionario/AbcDiccionario";

import { makeStyles } from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import ReactPlayer from "react-player";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import StarIcon from "@material-ui/icons/ArrowRight";

import withWidth, { isWidthDown } from "@material-ui/core/withWidth";

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
  buttonspanN: {
    "& span": {
      display: "contents",
    },
  },
  alinearTexto: {
    wordWrap: "break-word",
  },
});

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
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const TermsDiccionario = (props) => {
  const like = props.match.params.like;
  const id = props.match.params.id;
  const [termino, setTermino] = useState(null);
  const [objurl, setObjurl] = useState(null);
  const [carga, setCarga] = useState(false);
  const [carga2, setCarga2] = useState(false);
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //Creo el termino

  useEffect(() => {
    if (!carga) {
      TermService.diccionarioTermino(id).then(
        (data) => {
          console.log(data);
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
      TermService.audio(id).then(
        (data) => {
          console.log(data);
          setObjurl(URL.createObjectURL(data));
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
            <a
              className={classes.linkRuta}
              onClick={() => {
                like.length > 1
                  ? (window.location.href = "/diccionario/busqueda/" + like)
                  : (window.location.href = "/diccionario/terminos/" + like);
              }}
            >
              {like}
            </a>{" "}
            /{" "}
            <Link className={classes.linkRuta}>{termino && termino.name} </Link>
          </Grid>
          <Container className={classes.panelNavegacion}>
            <Card className={classes.root}>
              <CardActionArea>
                <Grid container xs={12} sm={12} md={12}>
                  {termino && typeof termino.img !== "undefined" > 0 && (
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
                        src={termino.img}
                        title={termino.name}
                      />
                    </Grid>
                  )}
                  <Grid
                    item
                    xs={termino && typeof termino.img === "undefined" ? 12 : 8}
                    sm={termino && typeof termino.img === "undefined" ? 12 : 8}
                    md={termino && typeof termino.img === "undefined" ? 12 : 8}
                  >
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h4"
                        component="h1"
                        className={classes.tituloTerm}
                      >
                        {termino && termino.name}
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
                            __html: termino && termino.definition,
                          }}
                        />
                      </Typography>
                    </CardContent>
                  </Grid>
                </Grid>
              </CardActionArea>
            </Card>
            <AppBar position="static" color="default">
              <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                className={classes.tabs}
              >
                <Tab
                  className={classes.buttonspan}
                  label="Términos relacionados"
                  icon={<Icon>text_fields</Icon>}
                  {...a11yProps(0)}
                />
                <Tab
                  className={classes.buttonspan}
                  label="Escucha la definición"
                  icon={<Icon>volume_up</Icon>}
                  {...a11yProps(1)}
                />
                <Tab
                  className={classes.buttonspan}
                  label="Contexto"
                  icon={<Icon>public</Icon>}
                  {...a11yProps(2)}
                />
                <Tab
                  className={classes.buttonspan}
                  label="Caso ilustrativo"
                  icon={<Icon>person_pin</Icon>}
                  {...a11yProps(3)}
                />
              </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
              <List
                component="nav"
                className={classes.root}
                aria-label="contacts"
              >
                {termino &&
                  termino.terms.map((item, index) => (
                    <ListItem
                      onClick={() => {
                        window.location.href =
                          "/diccionario/termino/" + like + "/" + item._id;
                      }}
                      button
                    >
                      <ListItemIcon>
                        <StarIcon />
                      </ListItemIcon>
                      <ListItemText primary={item.name} />
                    </ListItem>
                  ))}
              </List>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <ReactPlayer
                style={{ margin: "0 auto" }}
                url={termino && termino.record && objurl}
                height="50px"
                playing={false}
                controls={true}
              />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <div
                dangerouslySetInnerHTML={{ __html: termino && termino.context }}
              />
            </TabPanel>
            <TabPanel value={value} index={3}>
              <Grid container xs={12} sm={12} md={12}>
                <Grid item xs={6} sm={6} md={6}>
                  <b>Término equivalente:</b>
                </Grid>
                <Grid
                  className={classes.alinearTexto}
                  item
                  xs={6}
                  sm={6}
                  md={6}
                >
                  {termino && termino.equivalent}
                </Grid>
                <Grid item xs={6} sm={6} md={6}>
                  <b>Fuente de la definición:</b>
                </Grid>
                <Grid
                  className={classes.alinearTexto}
                  item
                  xs={6}
                  sm={6}
                  md={6}
                >
                  {termino && termino.source_definition}
                </Grid>

                <Grid item xs={6} sm={6} md={6}>
                  <b>Fuente del contexto:</b>
                </Grid>
                <Grid
                  className={classes.alinearTexto}
                  item
                  xs={6}
                  sm={6}
                  md={6}
                >
                  {termino && termino.source_context}
                </Grid>

                <Grid item xs={6} sm={6} md={6}>
                  <b>Entrevista N°:</b>
                </Grid>
                <Grid
                  className={classes.alinearTexto}
                  item
                  xs={6}
                  sm={6}
                  md={6}
                >
                  {termino && termino.interview}
                </Grid>

                <Grid item xs={6} sm={6} md={6}>
                  <b>Fecha de la entrevista:</b>
                </Grid>
                <Grid
                  className={classes.alinearTexto}
                  item
                  xs={6}
                  sm={6}
                  md={6}
                >
                  {termino && termino.interview_date}
                </Grid>
                <Grid item xs={6} sm={6} md={6}>
                  <b>Pertenencia étnica:</b>
                </Grid>
                <Grid
                  className={classes.alinearTexto}
                  item
                  xs={6}
                  sm={6}
                  md={6}
                >
                  {termino && termino.etnia}
                </Grid>

                <Grid item xs={6} sm={6} md={6}>
                  <b>Sexo (asignado al nacer) de la persona entrevistada:</b>
                </Grid>
                <Grid
                  className={classes.alinearTexto}
                  item
                  xs={6}
                  sm={6}
                  md={6}
                >
                  {termino && termino.sexo}
                </Grid>

                <Grid item xs={6} sm={6} md={6}>
                  <b>
                    Orientación sexual de la persona entrevistada (se siente
                    atraído por):
                  </b>
                </Grid>
                <Grid
                  className={classes.alinearTexto}
                  item
                  xs={6}
                  sm={6}
                  md={6}
                >
                  {termino && termino.sexual_orientation}
                </Grid>

                <Grid item xs={6} sm={6} md={6}>
                  <b>Otros:</b>
                </Grid>
                <Grid
                  className={classes.alinearTexto}
                  item
                  xs={6}
                  sm={6}
                  md={6}
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: termino && termino.others,
                    }}
                  />
                </Grid>

                <Grid item xs={6} sm={6} md={6}>
                  <b>Edad:</b>
                </Grid>
                <Grid
                  className={classes.alinearTexto}
                  item
                  xs={6}
                  sm={6}
                  md={6}
                >
                  {termino && termino.age}
                </Grid>

                <Grid item xs={6} sm={6} md={6}>
                  <b>Fragmento de la entrevista:</b>
                </Grid>
                <Grid
                  className={classes.alinearTexto}
                  item
                  xs={6}
                  sm={6}
                  md={6}
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: termino && termino.fragment,
                    }}
                  />
                </Grid>

                <Grid item xs={6} sm={6} md={6}>
                  <b>Lugar de la entrevista - Departamento:</b>
                </Grid>
                <Grid
                  className={classes.alinearTexto}
                  item
                  xs={6}
                  sm={6}
                  md={6}
                >
                  {termino && termino.interview_dep}
                </Grid>

                <Grid item xs={6} sm={6} md={6}>
                  <b>Lugar de la entrevista - Municipio:</b>
                </Grid>
                <Grid
                  className={classes.alinearTexto}
                  item
                  xs={6}
                  sm={6}
                  md={6}
                >
                  {termino && termino.interview_mun}
                </Grid>
              </Grid>
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

export default withWidth()(TermsDiccionario);
