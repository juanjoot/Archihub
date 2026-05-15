import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import MenuImagen from "../sim-ui/organisms/MenuImagen";
import Container from "@material-ui/core/Container";
import MainLayout from "../sim-ui/layout/MainLayout";
import GestorNarrativas from "../sim-ui/assets/gestor_narrativas.PNG";
import MiBiblioteca from "../sim-ui/assets/mi_biblioteca.PNG";
import LabVerdad from "../sim-ui/assets/lab_verdad.PNG";
import { Navigate } from "react-router";
import * as museo from "../store/ducks/museo.duck";
import { useTranslation } from "react-i18next";
import TopFilters from "../sim-ui/organisms/bloqueBusqueda/TopFilters";
import withWidth, { isWidthDown } from "@material-ui/core/withWidth";
import EditOutlined from "@material-ui/icons/EditOutlined";
import { col_crea } from "../sim-ui/organisms/HomeDesktop";
import IntroSection from "../sim-ui/organisms/IntroSection";
import GoToSection from "../sim-ui/organisms/GoToSection";
import IntroCrea from "../sim-ui/assets/intro_crea.png";
import IntroLab from "../sim-ui/assets/intro_lab.png";
import IntroBiblio from "../sim-ui/assets/intro_biblio.png";
import IntroGestor from "../sim-ui/assets/intro_gestor.png";

const useStyles = makeStyles((theme) => ({
  resume: {
    margin: "1rem",
  },
  icon: {
    color: col_crea.main,
    fontSize: "60px",
    Height: "45px",
    padding: "0 10px",
  },
  sectionsContainer: {
    marginBottom: "calc(72px + 5vh)",
  },
}));

const Crea = (props) => {
  const { openLienzoCrea } = props;
  const classes = useStyles();

  const [t, i18n] = useTranslation("common");

  if (openLienzoCrea) {
    return <Navigate to="/crea/narrativas/lienzo" />;
  }

  return (
    <MainLayout>
      <TopFilters
        place={"crea"}
        keyword={null}
        temporalRange=""
        setTemporalRange=""
        dpto=""
        setDpto=""
        setKeyword=""
        total=""
      />
      {isWidthDown("sm", props.width) ? (
        <div className={classes.sectionsContainer}>
          <IntroSection
            title={t("crea.introTitle")}
            description={t("crea.introDescription")}
            img={IntroCrea}
            icon={<EditOutlined className={classes.icon} />}
          />
          <GoToSection
            title={t("crea.narrativeManagerTitle")}
            description={t("crea.narrativeManagerDescription")}
            img={IntroGestor}
            direction={"right"}
            path={"/crea/narrativas"}
          />
          <GoToSection
            title={t("crea.labVerdadTitle")}
            description={t("crea.labVerdadDescription")}
            img={IntroLab}
            direction={"left"}
            path={"/crea/lab-verdad"}
          />
          <GoToSection
            title={t("crea.myLibraryTitle")}
            description={t("crea.myLibraryDescription")}
            img={IntroBiblio}
            direction={"right"}
            path={"/crea/mi-biblioteca"}
          />
        </div>
      ) : (
        <Container>
          <div className={classes.resume}>
            <Link to="/crea/narrativas">
              <MenuImagen
                imagen={GestorNarrativas}
                titulo={t("crea.narrativeManagerTitle")}
                descripcion={t("crea.narrativeManagerDescription")}
              />
            </Link>

            <Link to="/crea/mi-biblioteca">
              <MenuImagen
                imagen={MiBiblioteca}
                titulo={t("crea.myLibraryTitle")}
                descripcion={t("crea.myLibraryDescription")}
              />
            </Link>

            <Link to="/crea/lab-verdad">
              <MenuImagen
                imagen={LabVerdad}
                titulo={t("crea.labVerdadTitle")}
                descripcion={t("crea.labVerdadDescription")}
              />
            </Link>
          </div>
        </Container>
      )}
    </MainLayout>
  );
};

const mapStateToProps = (store) => ({
  openLienzoCrea: store.museo.openLienzoCrea,
});

export default connect(mapStateToProps, museo.actions)(withWidth()(Crea));
