import { createElement, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ExpandLess from "@material-ui/icons/ExpandLess";
import IconButton from "@material-ui/core/IconButton";
import * as Icons from "@material-ui/icons";
import { Route, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Icon as Icono } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  subItemsDesktop: {
    display: "flex",
    flexDirection: "column",
    // alignItems: "center",
    marginLeft: "50px",
  },
  subItemsDesktopNoIcon: {
    display: "flex",
    flexDirection: "column",
    // alignItems: "center",
    marginLeft: "55px",
  },
  itemMenu: {
    display: "flex",
    flexDirection: "column",
    color: 'white',
    alignItems: "flex-start",
  },
  subItem: {
    color: "white",
    marginBottom: "5px",
  },
  subItemWhite: {
    color: "#ffffffbf",
    marginBottom: "5px",
  },
  itemPrincipal: {
    fontWeight: "600",
  },
  listItemIcon: {
    display: "inline",
    minWidth: "40px",
  },
  icon: {
    '& path, & polygon': {
      fill: 'white'
    }
  }
}));

const Icon = (props) => {
  const classes = useStyles();
  const [image, setImage] = useState(false);

  const importer = async (name) => {
    const image = await import("../assets/icons/" + name);
    setImage(image.default);
  };

  useEffect(() => {
    importer(props.name);
  }, []);
  return (
    <Icono className={classes.icon} color="primary">
      {image}
    </Icono>
  );
};
const MakeIcon = (item, section) => {
  item.tag = item.tag.trim();
  if (item.icon) return <Icon name={item.icon} />;
  else if (item.material_icon) {
    let color = "primary";
    if (item.tag == "Crea" || item.tag == "crea" || item.tag == "CREA")
      color = "#E09934";
    else if (
      item.tag == "Conoce" ||
      item.tag == "conoce" ||
      item.tag == "CONOCE"
    )
      color = "#0E8489";
    else if (
      item.tag == "Explora" ||
      item.tag == "explora" ||
      item.tag == "EXPLORA"
    )
      color = "#C73131";

    if (section == "footer") color = "white";
    let my_style = {
      fontSize: "28",
      color: color,
    };

    if (
      Icons[item.material_icon.trim()] &&
      createElement(Icons[item.material_icon.trim()])
    ) {
      if (section == "footer")
        return createElement(
          Icons[item.material_icon.replace("TwoTone", "Outlined").trim()],
          {
            style: my_style,
            color: "primary",
          },
        );

      return createElement(Icons[item.material_icon.trim()], {
        style: my_style,
        color: "primary",
      });
    }
    return (
      <FiberManualRecordIcon
        fontSize="large"
        style={{ color: "rgb(255, 255, 255)" }}
      />
    );
  }
};

const ItemMenu = (props) => {
  const classes = useStyles();
  const history = useNavigate();
  const [open, setOpen] = useState(false);
  const [padding, setPadding] = useState(props.padding ? props.padding : 25);

  useEffect(() => {
    if (props.padding) setPadding(props.padding + 5);
  }, []);

  const handleClick = () => {
    setOpen(!open);
  };

  const arrow = () => {
    if (props.item.children && props.item.children.length) {
      if (open)
        return (
          <IconButton onClick={handleClick}>
            <ExpandLess />
          </IconButton>
        );
      else
        return (
          <IconButton onClick={handleClick}>
            <ExpandMore />
          </IconButton>
        );
    }
  };
  const route = (route, out = false) => {
    if (route === "/") return "/";
    else if (out) return { pathname: route }
    else if (route === "") return "#";
    else return "/" + route;
  };

  const collapsingDesktop = () => {
    return props.item.children.map((item) => (
      <Link
        className={
          props.section == "footer" ? classes.subItemWhite : classes.subItem
        }
        to={`/${item.route}`}
      >
        {item.tag}
      </Link>
    ));
  };

  const collapsing = () => {
    return (
      <Collapse
        // style={{ backgroundColor: "rgb(218, 218, 218)" }}
        in={open}
        timeout="auto"
        unmountOnExit
      >
        <List component="div" disablePadding>
          {props.item.children &&
            props.item.children.length &&
            props.item.children.map((item) => {
              return (
                <ItemMenu
                  key={item.id}
                  child={true}
                  padding={padding}
                  item={item}
                  activate={props.activate}
                  active={props.active}
                />
              );
            })}
        </List>
      </Collapse>
    );
  };

  return (
    <>
      {!props.desktop ? (
        <div className={props.item.clases}>
          <ListItem
            style={{
              paddingLeft: padding + "px",
              paddingBottom: "3px",
              paddingTop: "3px",
              // backgroundColor: (props.active == props.item.id)? '':''
            }}
            onClick={() => {
              props.activate(props.item.id);
              // Handle custom onClick if provided (for logout)
              if (props.item.onClick) {
                props.item.onClick();
              } else {
                typeof route(props.item.route, props.item.out) === 'string' ? window.location.href = route(props.item.route, props.item.out) : window.location.href = route(props.item.route,props.item.out).pathname
              }
            }}
          button
          exact
            // component={Link}
          to={props.item.onClick ? "#" : route(props.item.route, props.item.out)}
          target={props.item.tab ? "_blank" : ""}
          >
          <ListItemIcon className={classes.listItemIcon}>
            {props.item.icon || props.item.material_icon ? (
              MakeIcon(props.item, props.section)
            ) : (
              <FiberManualRecordIcon
                fontSize="large"
                style={{ color: "rgb(218, 218, 218)" }}
              />
            )}
          </ListItemIcon>
          <ListItem
            style={{
              color: "white",
              paddingLeft: "0px",
              paddingBottom: "3px",
              paddingTop: "3px",
            }}
          >
            <ListItemText primary={props.item.tag} />
          </ListItem>
          {arrow()}
        </ListItem>
          {props.item.children && props.item.children.length
        ? collapsing()
        : ""}
    </div >
      ) : (
  <div className={classes.itemMenu}>
    <ListItem
      style={{
        paddingBottom: "3px",
        paddingTop: "3px",
      }}
      onClick={() => {
        props.activate(props.item.id);
        // Handle custom onClick if provided (for logout)
        if (props.item.onClick) {
          props.item.onClick();
        } else {
          history(route(props.item.route));
        }
      }}
      button
      exact
      component={props.item.onClick ? "div" : Link}
      to={props.item.onClick ? "#" : route(props.item.route)}
      target={props.item.tab ? "_blank" : ""}
    >
      <ListItemIcon style={{ minWidth: "unset", marginRight: "5px" }}>
        {props.item.icon || props.item.material_icon ? (
          MakeIcon(props.item, props.section)
        ) : (
          <FiberManualRecordIcon
            fontSize="large"
            style={{ color: "rgb(218, 218, 218)" }}
          />
        )}
      </ListItemIcon>
      <ListItem
        style={
          props.section == "footer"
            ? {
              color: "white",
              paddingLeft: "0px",
              paddingBottom: "3px",
              paddingTop: "3px",
            }
            : {
              color: "white",
              paddingLeft: "0px",
              paddingBottom: "3px",
              paddingTop: "3px",
            }
        }
      >
        <ListItemText
          primaryTypographyProps={{ style: { fontWeight: "600" } }}
          className={classes.itemPrincipal}
          primary={props.item.tag}
        />
      </ListItem>
    </ListItem>
    <div
      className={
        props.item.icon || props.item.material_icon
          ? classes.subItemsDesktop
          : classes.subItemsDesktopNoIcon
      }
    >
      {props.item.children && props.item.children.length
        ? collapsingDesktop()
        : ""}
    </div>
  </div>
)}
    </>
  );
};
export default ItemMenu;
