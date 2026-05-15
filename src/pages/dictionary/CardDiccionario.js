import { useEffect, useState } from "react";
import * as React from "react";
import Grid from "@material-ui/core/Grid";
import MainLayout from "../../sim-ui/layout/MainLayout";
import Container from "@material-ui/core/Container";
import { Link, Button, Typography } from "@material-ui/core/";
import { connect } from "react-redux";
import * as museo from "../../store/ducks/museo.duck";
import * as SemanticService from "../../services/SemanticService";
import * as TermService from "../../services/TermService";
import Icon from "@material-ui/core/Icon";
import AbcDiccionario from "../../sim-ui/organisms/diccionario/AbcDiccionario";

import { makeStyles } from "@material-ui/core/styles";

const panelFondo = {
  padding: "4% 0 0 0",
  backgroundColor: "#2A5080",
  height: "50%",
  minHeight: "450px",
};

const panelFondo2 = {
  backgroundColor: "#ffffff",
  borderRadius: "30px",
  padding: "2% 2% 0 2%",
};

const panelNavegacion = {
  padding: "1% 13% 0 13%",
};

const panelAcd = {
  textAlign: "center",
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

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  tabs: {
    "& button": {
      fontSize: "8px",
      minWidth: "0",
      minHeight: "35",
    },
  },
  buttonspan: {
    "& span": {
      display: "contents",
    },
  },
});

const CardDiccionario = (props) => {
  const like = props.match.params.like;
  const id = props.match.params.id;
  const [termino, setTermino] = React.useState(null);
  const [objurl, setObjurl] = React.useState(null);
  const [carga, setCarga] = React.useState(false);
  const [carga2, setCarga2] = React.useState(false);
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  const [value, setValue] = React.useState(0);
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
      <Grid container item xs={12} sm={12} md={12} style={panelFondo}>
        <Container>
          <Grid item xs={12} sm={12} md={12} style={panelAcd}>
            <AbcDiccionario
              titulo="Diccionario"
              ocultartitulo={true}
              enviarurl="/diccionario/campos"
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
            /{" "}
            <Link style={linkRuta} href={"/diccionario/terminos/" + like}>
              {like}
            </Link>{" "}
            / <Link style={linkRuta}>{termino && termino.name}</Link>
          </Grid>
          <Container style={panelNavegacion}>
            <Grid container xs={12} sm={12} md={12} style={panelFondo2}></Grid>
          </Container>
        </Container>
      </Grid>
    </MainLayout>
  );
};

const mapStateToProps = (store) => ({
  openLienzoCrea: store.museo.openLienzoCrea,
});

export default connect(mapStateToProps, museo.actions)(CardDiccionario);
