import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import experiences from "../../assets/imgs/experiencia.png";
import ramasHome from "../../assets/imgs/ramas_home.svg";

const useStyles = makeStyles((theme) => ({
  containerExperiences: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: "110px",
  },

  containerExperiencesLeft: {
    width: "100%",
    marginLeft: "50px",
  },

  containerExperiencesLeftImg: {
    width: "85%",
  },

  containerExperiencesRight: {
    width: "100%",
    textAlign: "justify",
  },

  containerExperiencesRightH2: {
    color: "#295080",
    fontSize: "70px",
    fontWeight: "bold",
    marginRight: "150px",
    marginBottom: "30px",
  },

  containerExperiencesRightP: {
    fontSize: "18px",
    marginBottom: "30px",
    marginRight: "150px",
  },

  containerExperiencesRightButton: {
    backgroundColor: "#295080",
    color: "white",
    fontSize: "10px",
    padding: "5px 10px",
    marginRight: "150px",
    borderRadius: "5px",
    '&:hover': {
      color: "white",
    },
    marginLeft: "59%"
  },

  containerExperiencesRamas: {
    position: "relative",
    width: "100%",
  },

  containerExperiencesRamasImg: {
    width: "200px",
    position: "absolute",
    right: "0",
    bottom:"0",
  },
}));

const LabVerdadExperiences = (props) => {
  const [t, i18n] = useTranslation("common");
  const classes = useStyles();

  return (
    <>
      <div className={classes.containerExperiences}>
        <div className={classes.containerExperiencesLeft}>
          <img
            src={experiences}
            className={classes.containerExperiencesLeftImg}
          />
        </div>

        <div className={classes.containerExperiencesRight}>
          <h2 className={classes.containerExperiencesRightH2}>
            {t("crea.labVerdad.experiencesTitle")}
          </h2>
          <p className={classes.containerExperiencesRightP}>
            {t("crea.labVerdad.experiencesDescription")}
          </p>
          <Link
            to="/crea/narrativas"
            className={classes.containerExperiencesRightButton}
          >
            {t("crea.labVerdad.bottonIWantToCreate")}
          </Link>
        </div>
      </div>

      <div className={classes.containerExperiencesRamas}>
        <img src={ramasHome} className={classes.containerExperiencesRamasImg} />
      </div>
    </>
  );
};

export default LabVerdadExperiences;
