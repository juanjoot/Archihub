import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import { getBySection } from "../../services/MenusService";
import ItemMenu from "./ItemMenu";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#2a5080",
    height: "auto",
    width: "100%",
    zIndex: "401",
    paddingTop: "20px",
    paddingBottom: "20px",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    marginLeft: '4%',
    marginRight: '4%'
  },
  img: {
    width: "15%",
    marginBottom: '20px',
    marginLeft: '10%'
  },
}));

const MenuFooter = (props) => {
  const [open, setOpen] = useState(props.open);
  const [elements, setElements] = useState([]);
  const [active, setActive] = useState();
  const [user, setUser] = useState(props.user);
  const [image, setImage] = useState(
    "/media/cev/pic/logos/logoMuseo.svg"
  );

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
    let res = await getBySection(section);
    if (res.elements) {
      setElements(res.elements);
    }
  };

  const classes = useStyles();
  const renderItems = elements.map((item, index) => (
    <ItemMenu
      desktop={true}
      section={"footer"}
      activate={activate}
      active={active}
      key={item.id}
      item={item}
    />
  ));

  return (
    <>
      {props.open && props.currentSection != 'crea' ? (
        <div className={classes.root}>
          <div className={classes.container}>
            {renderItems}
            <img className={classes.img} src={image} alt="" />
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};
const mapStateToProps = store => ({
  currentSection: store.museo.currentSection,
  

});

export default connect(mapStateToProps)(MenuFooter)
