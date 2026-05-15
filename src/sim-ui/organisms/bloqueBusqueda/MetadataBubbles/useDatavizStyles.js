import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: "20px 0",
  },
  metadataList: {
    marginTop: "10px",
    "& > *": {
      margin: "0 5px 5px 0",
    },
    "& > .selected": {
      backgroundColor: "#213A72",
      color: "white",
    },
  },
  datavizSection: {
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column-reverse !important", // let paragraph be at the bottom
    },
  },
  datavizLeftPane: {
    marginRight: "3%",
    color: "#0C0B0B",
    fontSize: theme.typography.fontSize,
    maxWidth: "400px",
    width: "40%",
    [theme.breakpoints.down("xs")]: {
      margin: 0,
      width: "calc(100% - 40px)",
    },
  },
  optionsMenu: {
    alignItems: "center",
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column !important",
      alignItems: "flex-start",
      marginBottom: "15px",
    },
  },
  flexContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    [theme.breakpoints.down("xs")]: {
      "&:not(.avoid-column)": { flexDirection: "column" },
      "& > *": { marginBottom: "10px !important" },
    },
  },
}));

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions(),
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}

export default useStyles;
