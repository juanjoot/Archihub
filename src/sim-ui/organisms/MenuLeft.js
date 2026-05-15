import { useState, useEffect } from "react";
import IconButton from "@material-ui/core/IconButton";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Drawer from "@material-ui/core/Drawer";
import Slide from "@material-ui/core/Slide";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import { makeStyles } from "@material-ui/core";
import * as MenusService from "../../services/MenusService";
import ListSubheader from "@material-ui/core/ListSubheader";
import ItemMenu from "./ItemMenu";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import { connect } from "react-redux";
import { FlashOffTwoTone } from "@material-ui/icons";
import * as authDuck from "../../store/ducks/auth.duck";
import { useNavigate } from "react-router-dom";

const menuJson = {
  _id: { $oid: "626013358d54b911aafc6220" },
  elements: [
    {
      tag: "Inicio",
      route: "/",
      tab: false,
      id: "d05fbe5a-8674-4ad9-b4fa-60e529b35216",
      img: "",
      material_icon: "HomeTwoTone",
      clases: "separador",
      only: false,
      orden: 1,
    },
    {
      tag: "Explora todos los documentos",
      route: "explora/buscador",
      tab: false,
      id: "d05fbe5a-8674-4ad9-b4fa-60e529b35217",
      img: "",
      material_icon: "ExploreTwoTone",
      only: false,
      orden: 2,
    },
    // {
    //   tag: "Explora por áreas",
    //   route: "explora/buscador",
    //   tab: false,
    //   id: "d05fbe5a-8674-4ad9-b4fa-60e529b35218",
    //   img: "",
    //   material_icon: "DashboardTwoTone",
    //   only: false,
    //   orden: 3,
    // },
    // {
    //   tag: "Explora por estrategias",
    //   route: "explora/buscador",
    //   tab: false,
    //   id: "143a41b1-100f-4ee7-ac87-bcbc608e75a8",
    //   img: "",
    //   only: false,
    //   material_icon: "TimelineTwoTone",
    //   clases: "",
    //   orden: 4,
    //   children: [],
    // },
  ],
  nombreMenu: "Menú de archivo",
  estado: 1,
  section: 2,
  __v: 0,
};

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  cardMenu: {
    backgroundColor: "#6E3092",
    borderRadius: "unset",
    height: "56px",
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    // justifyContent: "flex-end",
    justifyContent: "space-between",
    color: "white",
  },
  divider: {
    backgroundColor: "#917d26",
    height: "4px",
  },
  profileName: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-start",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    // backdropFilter: 'blur(20px)',
    background: 'none !important',
  },
  drawerPaper: {
    width: drawerWidth,
    zIndex: 1491,
    // background: 'none !important',
    backdropFilter: 'blur(15px) brightness(60%)',
    borderRight: '1px solid white',
    backgroundColor: '#6E3092'
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
    left: drawerWidth,
    top: "25vh",
    // backgroundColor: "#2A5080",
    zIndex: 5000,
    maxWidth: "45px",
    height: "130px",
    backdropFilter: 'brightness(60%)',
    [theme.breakpoints.down("sm")]: {
      maxWidth: "45px"
    },
    border: "0.5px solid white",
    borderTopRightRadius: "10px",
    borderBottomRightRadius: "10px",
    borderLeft: 'none',
    backgroundColor: '#6E3092',
    cursor: 'pointer',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  root: {
    width: "100%",
    maxWidth: 300,
    // backgroundColor: theme.palette.background.paper,
    background: 'none !important',

    '& .separador': {
      marginTop: theme.spacing(4),
      paddingTop: theme.spacing(4),
      borderTop: '1px dashed rgba(255,255,255,0.1)'
    }
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  media: {
    height: 140,
  },
  titleProfile: { marginLeft: "8px", marginBottom: "0px" },
}));

const MenuLeft = (props) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [elements, setElements] = useState([]);
  const [active, setActive] = useState();
  const [user, setUser] = useState(props.user);
  const navigate = useNavigate();

  useEffect(() => {
    // loadItems(props.section);
    LoadItemJson();
  }, []);

  useEffect(() => {
    LoadItemJson();
  }, [props.isAuthenticated]);

  useEffect(() => {

  }, [props.open]);



  const getName = () => {
    if (props.authUser && props.authUser.name) {
      let name = props.authUser.name.split(" ");
      if (name.length == 2) return name[0] + " " + name[1];
      else if (name.length >= 3) return name[0] + " " + name[2];
      else return name[0];
    }
    if (props.authUser && props.authUser.username) {
      return props.authUser.username;
    }
    if (user && user.name) {
      let name = user.name.split(" ");
      if (name.length == 2) return name[0] + " " + name[1];
      else if (name.length >= 3) return name[0] + " " + name[2];
      else return name[0];
    }
    return "Usuario";
  };

  const activate = (id) => setActive(id);

  const handleDrawerClose = () => {
    if (openDrawer) {
      props.handleDrawerClose(false);
      setOpenDrawer(false);
    } else {
      setOpenDrawer(true)
    }
  };

  const handleLogout = () => {
    props.logout();
    navigate("/");
    if (props.handleDrawerClose) {
      props.handleDrawerClose(false);
    }
  };

  const LoadItemJson = () => {
    let menuElements = [...menuJson.elements];
    
    // Add Login or Logout option based on authentication
    if (props.isAuthenticated) {
      menuElements.push({
        tag: "Cerrar Sesión",
        route: "#",
        tab: false,
        id: "logout-item",
        img: "",
        material_icon: "ExitToAppTwoTone",
        clases: "separador",
        only: false,
        orden: 99,
        onClick: handleLogout,
      });
    } else {
      menuElements.push({
        tag: "Iniciar Sesión",
        route: "login",
        tab: false,
        id: "login-item",
        img: "",
        material_icon: "AccountCircleTwoTone",
        clases: "separador",
        only: false,
        orden: 99,
      });
    }
    
    setElements(menuElements);
  };

  const classes = useStyles();
  const renderItems = elements.map((item, index) => (
    <ItemMenu activate={activate} active={active} key={index} item={item} />
  ));

  return (
    <>
      {
        <>
          <Slide direction="right" in={props.open} mountOnEnter unmountOnExit>
            <div className={classes.button}>
              <div
                style={{
                  width: '100px',
                  transform: 'rotate(270deg)',
                  marginLeft: '-27px',
                  marginTop: '10px',
                  color: 'white',
                }}
              >Cerrar</div>
              <IconButton className={classes.iconButton}>
                <ArrowLeftIcon style={{ color: "white" }} fontSize="large" />
              </IconButton>
            </div>
          </Slide>
          <ClickAwayListener touchEvent="false" onClickAway={handleDrawerClose}>
            <Drawer
              className={classes.drawer}
              variant="persistent"
              anchor="left"
              open={props.open}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              <div>
                <Card className={classes.cardMenu}>
                  <div className={classes.drawerHeader}>
                    <Typography
                      className={classes.titleProfile}
                      gutterBottom
                      variant="h6"
                      component="h2"
                    >
                      {props.isAuthenticated ? getName() : "Menú"}
                    </Typography>
                    {/*<IconButton
                  // style={{ marginBottom: "0px" }}
                  onClick={handleDrawerClose}
                >
                  <ArrowLeftIcon style={{ color: "white" }} fontSize="large" />
        </IconButton>*/}
                  </div>
                </Card>
              </div>
              <Divider className={classes.divider} />

              <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                  <ListSubheader
                    component="div"
                    id="nested-list-subheader"
                  ></ListSubheader>
                }
                className={classes.root}
              >
                {renderItems}
              </List>
            </Drawer>
          </ClickAwayListener>
        </>
      }
    </>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth?.isAuthenticated || false,
  authUser: state.auth?.user || null,
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(authDuck.actions.logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MenuLeft);

// export default MenuLeft;
