import { Box, Button } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core";

import { useTesauro } from "../context/tesauroContext";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "50%",
  },
  button: {
    width: "100%",
    borderRadius: "0px",
    backgroundColor: "white",
    border: "1.5px solid " + theme.palette.primary.main,
    color: theme.palette.primary.main,
    fontWeight: "700",
    height: "35px",
  },
  buttonSelected: {
    width: "100%",
    borderRadius: "0px",
    border: "1.5px solid " + theme.palette.primary.main,
    fontWeight: "700",
    height: "35px",
    backgroundColor: theme.palette.primary.main,
    color: "white",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
    },
  },
  concept: {
    color: "#6F6E6C",
    marginTop: 5,
  },
}));

const Concept = (props) => {
  const classes = useStyles();

  const { conceptSelected, updateConceptSelected, updateText } = useTesauro();

  const updateSelected = () => {
    console.log(props.id);
    updateConceptSelected(props.id);
    updateText(props.title.slice(0, -1));
  };

  return (
    <Box className={classes.root}>
      <Button
        onClick={updateSelected}
        className={
          props.id == conceptSelected ? classes.buttonSelected : classes.button
        }
      >
        {props.title}
      </Button>
      <p className={classes.concept}>{props.text}</p>
    </Box>
  );
};

export default Concept;
