import React from "react";
import { Box, makeStyles } from "@material-ui/core";
import withWidth, { isWidthDown } from "@material-ui/core/withWidth";
import img1 from "../assets/imgs/Logo_MEN.png";
import img2 from "../assets/imgs/Logo_govco.png";

const useStyles = makeStyles((theme) => ({
  logo: {
    width: "140px",
    padding: "10px",
    [theme.breakpoints.down('sm')]: {
        width: theme.spacing(10),
      },
  },
  logo2: {
    width: "200px",
    padding: "10px",
    [theme.breakpoints.down('sm')]: {
        width: theme.spacing(17),
      },
  },
  logo3: {
    width: "220px",
    padding: "10px",
    [theme.breakpoints.down('sm')]: {
        width: theme.spacing(17),
      },
  },
  logo4: {
    width: "260px",
    padding: "10px",
    [theme.breakpoints.down('sm')]: {
        width: theme.spacing(15),
      },
  },
  footerContainer: {
    height: "70px",
    backgroundColor: "#E6E6E6",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    borderTop: "1px solid",
    borderColor: "#917D26",
    alignItems: "center",
    paddingTop: "10px",
    paddingBottom: "10px",
  },
  separator: {
    height: "40px",
    borderLeft: "2px solid",
    borderColor: theme.palette.primary.main,
  },
  subFooter: {
    backgroundColor: "#293171",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "40px",
    borderBottom: "2px solid",
    borderBottomColor: "#917D26",
  },
  span1: {
    color: "#917D26",
  },
  span2: {
    color: "white",
  },
}));

const NewFooter = (props) => {
  const classes = useStyles();

  return (
    <>
      <div>
        <div className={classes.footerContainer}>
          <img className={classes.logo} src={img1} alt="logo1" />
          <div className={classes.separator}></div>
          <img className={classes.logo2} src={img2} alt="logo1" />
          {/*<div className={classes.separator}></div>
          <img className={classes.logo3} src={img3} alt="logo1" />
          <div className={classes.separator}></div>
          <img className={classes.logo4} src={img4} alt="logo1" /> */}
        </div>
        
      </div>
    </>
  );
};

export default withWidth()(NewFooter);
