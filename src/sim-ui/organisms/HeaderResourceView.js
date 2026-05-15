import React from "react";
import { makeStyles } from "@material-ui/core";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import deco from '../assets/explora_img.png'

const useStyles = makeStyles((theme) => ({
  titleTesauro: {
    margin: "0px",
    padding: "0px",
    fontSize: "20px",
    letterSpacing: "3px",
    paddingTop: "20px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "13px",
      letterSpacing: "1px",
    },
  },
  subtitle: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "10px",
      // letterSpacing: "1px",
    },
  },

  header: {
    color: "white",
    cursor: "pointer",
    height: "100px",
    display: "flex",
    alignItems: "center",
    fontWeight: "bold",
    justifyContent: "center",
    backgroundColor: '#6E3092',
    padding: 0,
    color: "white",
    backgroundImage: `url(${deco})`,
    backgroundRepeat: 'no-repeat',
		backgroundSize: 'contain',
		backgroundPosition: 'left center',
  },

  subContainer: {
    backgroundColor: '#6E3092',
    [theme.breakpoints.down("sm")]: {
      //   marginLeft: "60px",
    },
  },

  logo: {
    width: "135px",
    height: "115px",
    marginLeft: "70px",
    [theme.breakpoints.down("sm")]: {
      width: "120px",
      height: "100px",
      marginLeft: "30px",
    },
  },
}));

const HeaderResourceView = (props) => {
  const classes = useStyles();
  const theme = useTheme();

  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div className={classes.header}>
      {/* {matches ? "" : <img className={classes.logo} src={img1} alt="" />} */}
      <div className={classes.subContainer}>
        <h3 className={classes.titleTesauro}>{props.title}</h3>
      </div>
    </div>
  );
};

export default HeaderResourceView;
