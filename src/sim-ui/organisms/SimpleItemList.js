import { useEffect, useState } from "react";
import ListItem from "@material-ui/core/ListItem";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import FolderOpenIcon from "@material-ui/icons/FolderOpen";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  icon: {
    "& path": {
      fill: "rgba(255,255,255,.3)",
    },
  },
  separator: {
    borderTop: "1px solid",
    border: "0px",
    backgroundColor: theme.palette.primary.main,
    margin: 0,
    marginLeft: "50px",
    width: "93%",
    // marginTop: "-10px",
  },
  text: {
    textAlign: "justify",
    fontStyle: "italic",
    color: theme.palette.primary.main,
  },
  checkIcon: {
    color: theme.palette.primary.main,
  },
  activated: {
    border: "1px solid",
    borderRadius: "15px",
    backgroundColor: "#d4dae4",
    borderColor: "transparent",
    // marginTop: '2px'
  },
}));

const SimpleItemList = (props) => {
  const [selected, setSelected] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    if (props.fondo) {
      const f = props.fondo.find((r) => (r ? r.id === props.id : false));
      f ? setSelected(true) : setSelected(false);
    }
  }, [props.fondo]);

  return (
    <>
      <ListItem alignItems="flex-start" button className={selected ? classes.activated : ''}>
        <Checkbox
          className={classes.checkIcon}
          checked={selected}
          edge="start"
          //   style={{
          //       color: "white"
          //   }}
          onClick={() => {
            selected
              ? props.setFondo({ name: props.name, id: props.id })
              : props.setFondo({ name: props.name, id: props.id });
          }}
        />
        {/* <ListItemIcon>
          <FolderOpenIcon className={classes.icon} />
        </ListItemIcon> */}
        <ListItemText
          className={classes.text}
          //   style={}
          primary={`${props.name} (${props.subname})`}
        />
      </ListItem>
      <hr className={classes.separator} />
    </>
  );
};

export default SimpleItemList;
