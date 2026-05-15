import { useEffect } from "react";
import { connect } from "react-redux";
import * as app from "../store/ducks/museo.duck";
import ViewMicrosite from "../sim-ui/organisms/ViewMicrosite";

const Conoce = () => {
  useEffect(() => {}, []);

  return <ViewMicrosite section={"Conoce"} />;
};

const mapStateToProps = (store) => ({});

export default connect(mapStateToProps, app.actions)(Conoce);
