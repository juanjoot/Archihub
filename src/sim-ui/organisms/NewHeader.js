import React from "react";
import { Box, makeStyles, Typography } from "@material-ui/core";
import withWidth, { isWidthDown } from "@material-ui/core/withWidth";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import logo from "../assets/logo_ministerio.png";
import MenuLeft from "./MenuLeft";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import iconMenu from "../assets/icons/iconMenu.svg";
import Slide from "@material-ui/core/Slide";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#E6E6E6",
    zIndex: 1500,
  },
  icon: {
    fontSize: "35px",
    stroke: "#917D26",
    strokeWidth: "0.5px",
    color: "#917D26",
  },
  button: {
    padding: "0px",
  },
  container: {
    display: "flex",
    alignItems: "center",
    minHeight: "70px",
    color: "#444",
  },
  logo: {
    backgroundSize: "100%",
    display: "inline-block",
    width: "93%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },

    marginTop: "0",
    maxWidth: "800px",
    height: "70px"
  },

  iconMenu: {
    // backgroundImage: `url(${iconMenu})`
    backgroundImage: `url(${iconMenu})`,
    display: "inline-block",
    width: "30px",
    height: "30px",
    verticalAlign: "middle",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "100%",
  },
  iconS: {
    marginLeft: "-18px",
    [theme.breakpoints.down("sm")]: {
      marginLeft: "-12px",

    },
  },
  iconButton: {
    maxWidth: "45px",
    maxHeight: "50px",
    position: 'absolute',
    bottom: '0px',
    [theme.breakpoints.down("sm")]: {
      maxWidth: "45px"
    },
  },
  button: {
    position: "fixed",
    left: 0,
    top: "25vh",
    // backgroundColor: "#2A5080",
    zIndex: 5000,
    maxWidth: "45px",
    height: "130px",
    [theme.breakpoints.down("sm")]: {
      maxWidth: "45px"
    },
    backdropFilter: 'blur(10px) brightness(60%)',
    borderLeft: 'none',
    borderTopRightRadius: "10px",
    borderBottomRightRadius: "10px",
    border: "0.5px solid white",
    borderLeft: 'none',
    backgroundColor: 'rgba(255,255,255,0.35)',
    cursor: 'pointer',
  },
}));

const NewHeader = (props) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const containerRef = React.useRef(null);

  const handleDrawerSwith = () => {
    setOpen(!open);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <div>



        <AppBar className={classes.root} position="fixed">
          <Toolbar className={classes.container}>
            <div
              style={{
                background: '#E6E6E6',
                width: '120px',
                height: '100px',
                position: 'absolute',
                borderBottomLeftRadius: '10px',
                borderBottomRightRadius: '10px',
                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                backgroundImage: `url(${logo})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
              }}
            >

            </div>
            <Typography variant="h6" noWrap style={{
              marginLeft: '150px',
              fontSize: '1.2em',
              color: '#222',
            }}>
              RIVES <span style={{
                color: '#6E3092',
              }}>| Repositorio de Información VES</span>
            </Typography>
          </Toolbar>
        </AppBar>



        <div ref={containerRef}>
          <Slide direction="right" timeout={200} in={!open} container={containerRef.current}>
            <div className={classes.button} onClick={handleDrawerOpen}>
              <div
                style={{
                  width: '100px',
                  transform: 'rotate(270deg)',
                  marginLeft: '-27px',
                  marginTop: '10px',
                  color: 'white',
                }}
              >Menú</div>
              <IconButton className={classes.iconButton}>
                <ArrowRightIcon style={{ color: "white" }} fontSize="large" />
              </IconButton>
            </div>
          </Slide>
          <MenuLeft
            section={2}
            handleDrawerClose={handleDrawerClose}
            open={open}
          ></MenuLeft>
        </div >
        {/* {matches ? (
          <MenuLeft
            section={2}
            handleDrawerClose={handleDrawerClose}
            open={open}
          ></MenuLeft>
        ) : (
          // <MenuLeftDesktop
          //   section={2}          
          //   open={open}
          //   newLayout={true}

          // />
          
        )} */}
      </div >
    </>
  );
};

export default withWidth()(NewHeader);
