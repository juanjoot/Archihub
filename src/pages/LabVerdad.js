import { connect } from "react-redux";
import * as app from "../store/ducks/app.duck";
import MainLayout from "../sim-ui/layout/MainLayout";
import Container from "@material-ui/core/Container";
import { useTranslation } from "react-i18next";
import LabVerdadHeader from "../sim-ui/organisms/LabVerdadHeader";
import LabVerdadMethodologicalTools from "../sim-ui/organisms/LabVerdadMethodologicalTools";
import LabVerdadExperiences from "../sim-ui/organisms/LabVerdadExperiences";
import LabVerdadCrea from "../sim-ui/organisms/LabVerdadCrea";

const LabVerdad = (props) => {
  const [t, i18n] = useTranslation("common");

  return (
    <MainLayout>
      <Container>
        <LabVerdadHeader />
        <LabVerdadMethodologicalTools />
        <LabVerdadExperiences />
        <LabVerdadCrea />
      </Container>
    </MainLayout>
  );
};
const mapStateToProps = (store) => ({});

export default connect(mapStateToProps, app.actions)(LabVerdad);
