import { Box } from "@material-ui/core";
import React from "react";
import { useTesauro } from "../context/tesauroContext";

import { makeStyles } from "@material-ui/core";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import Info from "./Info";
import Search from "./Search";

const useStyles = makeStyles((theme) => ({
  root: {
    cursor: "pointer",
    height: "100px",
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    alignContent: "end",
    color: theme.palette.primary.main,
    // paddingLeft: '10%'
  },
}));

const BreadCrumb = () => {
  const { letter, updateLetter, text } = useTesauro();
  const classes = useStyles();

  const reset = () => {
    updateLetter(false);
  };

  return (
    <Box>
      {letter || text ? (
        <Box display='flex' justifyContent=' space-between' alignItems='center'>
          <Box className={classes.root}>
            {/* <ArrowLeftIcon onClick={reset} />
            <span>Tesauro</span>
            <span>/</span>
            <span>{letter}</span> */}
          </Box>
          <Search />
        </Box>
      ) : (
        <Info />
      )}
    </Box>
  );
};

export default BreadCrumb;
