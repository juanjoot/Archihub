import React, { useState } from "react";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { useTesauro } from "../context/tesauroContext";
import img1 from "../../../assets/imgs/Diccionario.png";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const list = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

const useStyles = makeStyles((theme) => ({
  letter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    // height: "90px",
    // backgroundColor: theme.palette.primary.main,
    fontWeight: "bold",
    fontStyle: "italic",
    fontSize: "40px",
    cursor: "pointer",
    letterSpacing: "5px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "15px",
      marginTop: "15px",
      letterSpacing: "1px",
    },
  },
  titleTesauro: {
    margin: "0px",
    padding: "0px",
    fontSize: "20px",
    letterSpacing: "3px",
    paddingTop: "20px",
  },
  activate: {
    width: "45px",
    height: "45px",
    borderRadius: "50%",
    MozBorderRadius: "50%",
    backgroundColor: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    letterSpacing: "normal",
    color: theme.palette.primary.main,
    paddingTop: "1px",
    paddingRight: "1px",
    [theme.breakpoints.down("sm")]: {
      width: "25px",
      height: "25px",
    },

    // padding: "10px"
  },
  header: {
    color: "white",
    cursor: "pointer",
    height: "100px",
    display: "flex",
    alignItems: "center",
    fontWeight: "bold",
    justifyContent: "start",
    backgroundColor: "#2a5080",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
  },
  subContainer: {
    display: "flex",
    flexDirection: "column",
  },
  logo: {
    width: "140px",
    height: "110px",
    marginLeft: "70px",
    [theme.breakpoints.down("sm")]: {
      width: "100px",
      height: "100px",
      marginLeft: "40px",
    },
  },
}));

const Letters = () => {
  const classes = useStyles();
  //   const [localLetter, setLetter] = useState(null);
  const [listLetters, setListLetters] = useState(list);
  const { letter, updateLetter, updateTerms } = useTesauro();
  const theme = useTheme();

  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  const activateLetter = (letterInput) => {
    if (letterInput != letter) {
      updateLetter(letterInput);
      updateTerms([]);
    }
  };

  return (
    <Box className={classes.header}>
      <img className={classes.logo} src={img1} alt="" />
      {/* {matches ? "" : <img className={classes.logo} src={img1} alt="" />} */}
      <div className={classes.subContainer}>
        {!letter ? <span className={classes.titleTesauro}>Etiquetario</span> : ""}

        <div className={classes.letter}>
          {listLetters.map((l) => (
            <Box
              key={l}
              onClick={() => {
                activateLetter(l);
              }}
              mr={0.6}
              pt={0}
              className={l == letter ? classes.activate : ""}
            >
              {l}
            </Box>
          ))}
        </div>
      </div>
    </Box>
  );
};

export default Letters;
