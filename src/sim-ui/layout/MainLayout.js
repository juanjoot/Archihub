import React from "react";
import Box from "@material-ui/core/Box";
import MenuSuperior from "../organisms/MenuSuperior";
import MenuInferior from "../organisms/MenuInferior";
import { Container, makeStyles } from "@material-ui/core";
import withWidth, { isWidthDown } from "@material-ui/core/withWidth";
import MenuFooter from "../organisms/MenuFooter";
import NewFooter from "../organisms/NewFooter";
import NewHeader from "../organisms/NewHeader";
import Logos from "../organisms/home/Logos"


const useStyles = makeStyles((theme) => ({
  bg: {
    backgroundColor: "white",
    overflow: "hidden",
    position: "relative",
    paddingTop: '54px',
    [theme.breakpoints.up('md')]: {
      paddingTop: '64px',
    }
  },
  newBg: {
    minHeight: "84vh",
    backgroundColor: "white",
    overflow: "auto",
    position: "relative",
  },

  footer: {
    position: "absolute",
    bottom: 0,
  },
}));

const MainLayout = (props) => {
  const classes = useStyles();

  const renderFooter = () =>
    isWidthDown("sm", props.width) ? (
      // <MenuInferior section={3} />
      <MenuFooter section={2} open={true} />
    ) : (
      <MenuFooter section={2} open={true} />
    );

  return (
    <>
      <NewHeader />
      <Box component="section" pt={8} className={classes.bg}>
        {props.children}
      </Box>
      <Logos />
      {/* {props.hideFooter !== true && !props.newLayout && renderFooter()} */}
    </>
  );
};

export default withWidth()(MainLayout);
