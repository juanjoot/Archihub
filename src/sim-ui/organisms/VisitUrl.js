import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import OpenInNew from "@material-ui/icons/OpenInNew";
import InsertLinkTwoToneIcon from "@mui/icons-material/InsertLinkTwoTone";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "40px",
  },
  containerLink: {
    display: "flex",
    alignItems: "center",
    marginLeft: "25px",
    justifyContent: "center",
    border: "1.5px solid",
    borderRadius: "25px",
    padding: "5px",
  },
  title: {
    color: theme.palette.primary.main,
    fontWeight: "bold",
  },
  link: {
    textDecoration: "none",
    color: theme.palette.primary.main,
  },
}));

const VisitUrl = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <span className={classes.title}>Visita:</span>

      <div className={classes.containerLink}>
        <InsertLinkTwoToneIcon
          fontSize="large"
          style={{ marginRight: "10px" }}
        />
        <a className={classes.link} target="_blank" href={props.finalUrl}>
          {props.finalUrl}
        </a>
      </div>
    </div>
  );
};

export default VisitUrl;
