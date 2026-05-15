import { Box } from "@material-ui/core";
import React from "react";
import Concept from "./Concept";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    gap: "10px",
    justifyContent: "space-between",
  },
}));

const ListConcepts = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      {/* <Concept
        title="Directorios"
        id="1"
        text="
        Contienen etiquetas complementarias que emergieron del procesamiento de
        datos durante las tareas de investigación que adelantó la Comisión de la
        Verdad, y que permiten una mejor clasificación y organización de la
        información relacionada con el conflicto armado colombiano. Estos
        directorios o librerías reúnen datos como nombres de organizaciones,
        tipos de poblaciones, clases de estructuras armadas, entre otros.
      "
      ></Concept> */}
      <Concept
        id="2"
        title="Dominios"
        text="
        Es el conjunto de etiquetas transversales asociadas a los contextos e impactos, y que complementan la identificación y organización de la información en relación con los componentes investigativos de la Comisión de la Verdad. Algunas de estas etiquetas se relacionan con los hechos victimizantes, las consecuencias de la guerra y las diferentes formas de afrontamiento y resistencia de las victimas en el conflicto armado colombiano."
      ></Concept>
      <Concept
        id="3"
        title="Núcleos"
        text="
        Es el conjunto de etiquetas que permite la organización de la información a partir de los componentes investigativos centrales de la Comisión de la Verdad. Estas se interesan por categorizar e indexar información asociada a lo actores o participantes en el conflicto, las causas de este, asi como las dinámicas socioculturales, politicas y económicas que están involucradas con el conflicto armado colombiano."
      ></Concept>
    </Box>
  );
};

export default ListConcepts;
