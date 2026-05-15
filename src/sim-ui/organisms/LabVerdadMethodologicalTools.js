import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  containerMethodologicalTools: {
    backgroundColor: "#FEB358",
    width: "100%",
    padding: "6% 13% 8%",
    color: "#295080",
    marginBottom: "100px",
    textAlign: "justify",
    position: "relative",
  },

  containerToolsH2: {
    width: "50%",
    fontSize: "60px",
    fontWeight: "bold",
  },

  containerMethodologicalH2: {
    position: "absolute",
    top: "0",
    right: "0",
    left: "0",
    width: "100%",
    fontSize: "110px",
    fontWeight: "bold",
    marginLeft: "218px",
    opacity: "0.2",
  },

  containerMethodologicalToolsP: {
    width: "40%",
    fontSize: "18px",
    marginBottom: "30px",
  },

  containerMethodologicalToolsButton: {
    backgroundColor: "#295080",
    color: "white",
    fontSize: "25px",
    padding: "8px 35px",
    borderRadius: "30px",
    border: "0px",
    "&:hover": {
      color: "white",
    },
  },

  containerCatalogue: {
    position: "absolute",
    top: "220px",
    right: "440px",
    backgroundColor: "white",
    width: "260px",
    height: "300px",
    display: "flex",
    alignItems: "flex-end",
  },

  containerCollections: {
    position: "absolute",
    top: "220px",
    right: "70px",
    backgroundColor: "white",
    width: "260px",
    height: "300px",
    display: "flex",
    alignItems: "flex-end",
  },

  containerCatalogueInside: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "rgb(78, 54, 46, 0.6)",
    color: "white",
    width: "100%",
    height: "55%",
  },

  containerCollectionsInside: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "rgb(78, 54, 46, 0.6)",
    color: "white",
    width: "100%",
    height: "55%",
  },

  containerCatalogueBorder: {
    backgroundColor: "#E55353",
    width: "6%",
    height: "23%",
  },

  containerCatalogueTitle: {
    fontSize: "20px",
    fontWeight: "bold",
    margin: "5px 0px 0px 10px",
    height: "15%",
  },

  containerCatalogueDescription: {
    fontSize: "11px",
    margin: "0px 26px",
    height: "85%",
  },

  containerCollectionsBorder: {
    backgroundColor: "#295080",
    width: "6%",
    height: "23%",
  },

  containerCollectionsTitle: {
    fontSize: "20px",
    fontWeight: "bold",
    margin: "5px 0px 0px 10px",
    height: "15%",
  },

  containerCollectionsDescription: {
    fontSize: "11px",
    margin: "0px 26px",
    height: "85%",
  },
}));

const LabVerdadMethodologicalTools = (props) => {
  const [t, i18n] = useTranslation("common");
  const classes = useStyles();

  return (
    <div className={classes.containerMethodologicalTools}>
      <h2 className={classes.containerToolsH2}>
        {t("crea.labVerdad.toolsTitle")}
      </h2>
      <h2 className={classes.containerMethodologicalH2}>
        {t("crea.labVerdad.methodologicalTitle")}
      </h2>
      <p className={classes.containerMethodologicalToolsP}>
        {t("crea.labVerdad.toolsAndMethodologiesDescription")}
      </p>
      <Link to="/" className={classes.containerMethodologicalToolsButton}>
        {t("crea.labVerdad.bottonSeeAll")}
      </Link>
      <div className={classes.containerCatalogue}>
        <div className={classes.containerCatalogueInside}>
          <div className={classes.containerCatalogueBorder}></div>
          <h3 className={classes.containerCatalogueTitle}>Catálogo</h3>
          <p className={classes.containerCatalogueDescription}>
            {t("crea.labVerdad.catalogueDescription")}
          </p>
        </div>
      </div>
      <div className={classes.containerCollections}>
        <div className={classes.containerCollectionsInside}>
          <div className={classes.containerCollectionsBorder}></div>
          <h3 className={classes.containerCollectionsTitle}>Colecciones</h3>
          <p className={classes.containerCollectionsDescription}>
            {t("crea.labVerdad.collectionsDescription")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LabVerdadMethodologicalTools;
