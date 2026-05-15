import { Box } from "@material-ui/core";
import React from "react";

const Info = () => {
  return (
    <Box  pt={12} pb={12}>
      {/* <Box p={0} m={0} component="h1" color="primary.main">
        Tesauro
      </Box> */}
      <Box fontSize="18px" color="#6F6E6C" component="span">
        Bienvenido al Etiquetario, puedes elegir en el menú superior por orden
        alfabético los términos que quieres visualizar o puedes elegir en el
        listado de Directorios, Términos y Dominios
      </Box>
    </Box>
  );
};

export default Info;
