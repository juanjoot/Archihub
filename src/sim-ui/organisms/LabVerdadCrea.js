import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import CreateTwoToneIcon from "@material-ui/icons/CreateTwoTone";
import frameCrea from "../../assets/imgs/frame.png";

const useStyles = makeStyles((theme) => ({
  containerCrea: {
    position: "relative",
    backgroundColor: "#FEB358",
    display: "flex",
    justifyContent: "space-between",
    padding: "30px 0px 30px 200px",
  },

  containerCreaLeft: {
    width: "25%",
    textAlign: "justify",
  },

  containerCreaLeftH2: {
    color: "white",
    fontSize: "60px",
    fontWeight: "bold",
  },

  containerCreaLeftP: {
    fontSize: "13px",
  },

  containerCreaLeftButton: {
    backgroundColor: "#295080",
    display: "flex",
    justifyContent: "right",
    color: "white",
    fontSize: "10px",
    marginLeft: "78%",
    padding: "3px 10px",
    borderRadius: "5px",
    "&:hover": {
      color: "white",
    },
  },

  iconPen: {
    position: "absolute",
    left: "-20px",
    top: "60px",
    color: "white",
    fontSize: "160px",
    opacity: "0.3",
  },

  imageMultimedia: {
    position: "absolute",
    right: "-50px",
    bottom: "0",
    width: "600px",
  },
}));

const LabVerdadCrea = (props) => {
  const [t, i18n] = useTranslation("common");
  const classes = useStyles();

  return (
    <div className={classes.containerCrea}>
      <div className={classes.containerCreaLeft}>
        <h2 className={classes.containerCreaLeftH2}>
          {t("crea.labVerdad.createTitle")}
        </h2>
        <p className={classes.containerCreaLeftP}>
          {t("crea.labVerdad.createDescription")}
        </p>
        <Link
          to="/crea/narrativas"
          className={classes.containerCreaLeftButton}
        >
          {t("crea.labVerdad.bottonCreate")}
        </Link>
      </div>

      <img src={frameCrea} className={classes.imageMultimedia} />

      <CreateTwoToneIcon className={classes.iconPen} />
    </div>
  );
};

export default LabVerdadCrea;
