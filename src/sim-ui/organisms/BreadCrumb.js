import React, { useEffect } from "react";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core";
import withWidth, { isWidthDown } from "@material-ui/core/withWidth";
import NavigateBefore from "@material-ui/icons/NavigateBefore";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import { Link, useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "50px",
    // backgroundColor: theme.palette.primary.main,
    display: "flex",
    // justifyContent: "start",
    alignItems: "center",
    paddingLeft: "55px",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "12px",
      paddingLeft: "12px",
    },

    marginTop: "3%",
  },
  ul: {
    display: "flex",
    listStyleType: "none",
    gap: "5px",
    // fontSize: "large",
    color: theme.palette.primary.main,
    marginBottom: "0px",
    alignItems: "center",
    fontSize: "initial",
    fontWeight: "500",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "0px",
    },
  },
  link: {
    color: theme.palette.primary.main,
  },
  icon: {
    marginTop: "5px",
  },
}));

const MainLayout = (props) => {
  const classes = useStyles();
  const [listUrl, setListUrl] = React.useState([]);
  const [previusUrl, setPreviusUrl] = React.useState("Previus-url");
  const [currentUrl, setCurrentUrl] = React.useState("Current-url");
  let history = useNavigate();

  useEffect(() => {}, []);

  return (
    <div className={classes.root}>
      {props.previusUrl && props.previusUrlLabel ? (
        <ul className={classes.ul}>
          <li style={{ width: "25px", marginTop: "5px" }}>
            <Link className={classes.link} to="/museo/explora/buscador">
              <ArrowLeftIcon style={{ marginTop: "5px"}} fontSize="large" />
            </Link>
          </li>

          <li>
            <a className={classes.link} href={props.previusUrl}>
              {props.previusUrlLabel}
            </a>
          </li>
          <li>/</li>

          <li>
            <a className={classes.link} href="#">
              {props.title ? props.title : currentUrl}
            </a>
          </li>
        </ul>
      ) : (
        <ul className={classes.ul}>
          <li style={{ width: "25px" }}>
            <Link className={classes.link} to="/museo/explora/buscador">
              <ArrowLeftIcon style={{ marginTop: "5px"}} fontSize="large" />
            </Link>
          </li>

          <li>
            <a className={classes.link} href="#">
              {props.title ? props.title : currentUrl}
            </a>
          </li>
        </ul>
      )}
    </div>
  );
};

export default withWidth()(MainLayout);
