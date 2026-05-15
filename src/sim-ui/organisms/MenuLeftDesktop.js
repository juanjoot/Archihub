import { useState, useEffect } from "react";
import IconButton from "@material-ui/core/IconButton";
import Drawer from "@material-ui/core/Drawer";
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

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#ffffffe6",
    height: "150px",
    width: "100%",
    position: "fixed",
    zIndex: "401",
    marginTop: "64px",
  },
  rootNewLayout: {
    backgroundColor: "#ffffffe6",
    height: "150px",
    width: "100%",
    position: "fixed",
    zIndex: "401",
    // marginTop: "64px",
  },
  container: {
    display: "flex",
    justifyContent: "space-evenly",
  },
}));

const MenuLeftDesktop = (props) => {
  const [open, setOpen] = useState(props.open);
  const [elements, setElements] = useState([]);
  const [active, setActive] = useState();
  const [user, setUser] = useState(props.user);

  useEffect(() => {
    loadItems(props.section);
  }, []);

  useEffect(() => {
    setOpen(props.open);
  }, [props.open, open]);

  const getName = () => {
    if (user.name) {
      let name = user.name.split(" ");
      if (name.length == 2) return name[0] + " " + name[1];
      else if (name.length >= 3) return name[0] + " " + name[2];
      else return name[0];
    }
    return "Username";
  };

  const activate = (id) => setActive(id);

  const handleDrawerClose = () => {
    setOpen(false);
    props.handleDrawerClose(false);
  };
  const loadItems = async (section) => {
    let res = await MenusService.getBySection(section);
    if (res.elements) {
      setElements(res.elements);
    }
  };

  const classes = useStyles();
  const renderItems = elements.map((item, index) => (
    <ItemMenu
      desktop={true}
      activate={activate}
      active={active}
      key={item.id}
      item={item}
    />
  ));

  return (
    <>
      {props.open ? (
        <div className={props.newLayout ? classes.rootNewLayout : classes.root}>
          <div className={classes.container}>{renderItems}</div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default MenuLeftDesktop;

// export default MenuLeft;
