import { connect } from "react-redux";
import * as museo from "../store/ducks/museo.duck";
import HomeLayout from "../sim-ui/organisms/home/HomeLayout";
import withWidth, { isWidthDown } from "@material-ui/core/withWidth";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100%",
    padding: "40px 16px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  link: {
    width: "100%",
  },
}));

const Intro = (props) => {
  const { setOpenLienzoCrea } = props;
  setOpenLienzoCrea(false);
  const classes = useStyles();

  return <HomeLayout></HomeLayout>;
};

const mapStateToProps = (store) => ({
  openLienzoCrea: store.museo.openLienzoCrea,
});

export default connect(mapStateToProps, museo.actions)(withWidth()(Intro));
