import { Box } from "@material-ui/core";
import React from "react";
import { useTesauro } from "../context/tesauroContext";
import BreadCrumb from "./BreadCrumb";
import Letters from "./Letters";
import ListConcepts from "./ListConcepts";
import Term from "./Term";
import { makeStyles } from "@material-ui/core";
import Search from "./Search";
const useStyles = makeStyles((theme) => ({}));

const Main = () => {
  const useStyles = makeStyles((theme) => ({
    root: {
      paddingLeft: "100px",
      paddingRight: "100px",
      [theme.breakpoints.down("sm")]: {
        paddingLeft: "10px",
        paddingRight: "10px",
      },
    },
  }));

  const { letter, text } = useTesauro();
  const classes = useStyles();

  return (
    <Box >
      <Letters />
      <Box className={classes.root}>
        <BreadCrumb />
        {letter  || text? <Term /> : ""}
        <ListConcepts />
      </Box>
    </Box>
  );
};

export default Main;
