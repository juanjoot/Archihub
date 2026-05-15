import React from "react";
import { useTranslation } from "react-i18next";
import leaveLabverdad2 from "../../assets/imgs/leave2_labverdad.svg";
import leaveLabverdad from "../../assets/imgs/leave_labverdad.svg";
import handLabverdad from "../../assets/imgs/hand_labverdad.png";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  containerHeader: {
    position: "relative",
    width: "100%",
  },

  containerHeaderTitle: {
    display: "flex",
    position: "relative",
    marginBottom: "100px",
    textAlign: "justify",
  },

  containerHeaderTitleLeft: {
    background: "#295080",
    color: "white",
    width: "100%",
  },

  containerHeaderTitleLeftImg: {
    position: "absolute",
    left: "0",
    top: "0",
    width: "10%",
  },

  containerHeaderTitleLeftH1: {
    fontSize: "65px",
    fontWeight: "bold",
    margin: "10% 15% 0% 25%",
  },

  containerHeaderTitleLeftP: {
    fontSize: "15px",
    margin: "0% 16% 16% 25%",
  },

  containerHeaderTitleRight: {
    width: "100%",
  },

  containerHeaderTitleRightImg: {
    position: "absolute",
    right: "0",
    width: "13%",
  },

  containerHeaderHand: {
    textAlign: "center",
    position: "absolute",
    top: "0",
    left: "70px",
    width: "100%",
  },

  containerHeaderHandImg: {
    width: "30%",
    marginTop: "-57px",
  },
}));

const LabVerdadHeader = (props) => {
  const [t, i18n] = useTranslation("common");
  const classes = useStyles();

  return (
    <div className={classes.containerHeader}>
      <div className={classes.containerHeaderTitle}>
        <div className={classes.containerHeaderTitleLeft}>
          <img
            src={leaveLabverdad2}
            className={classes.containerHeaderTitleLeftImg}
          />
          <h1 className={classes.containerHeaderTitleLeftH1}>
            {t("crea.labVerdadTitle")}
          </h1>
          <p className={classes.containerHeaderTitleLeftP}>
            {t("crea.labVerdadDescription")}
          </p>
        </div>
        <div className={classes.containerHeaderTitleRight}>
          <img
            src={leaveLabverdad}
            className={classes.containerHeaderTitleRightImg}
          />
        </div>
      </div>

      <div className={classes.containerHeaderHand}>
        <img src={handLabverdad} className={classes.containerHeaderHandImg} />
      </div>
    </div>
  );
};

export default LabVerdadHeader;
