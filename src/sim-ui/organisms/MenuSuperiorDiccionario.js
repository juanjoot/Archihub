import { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as app from "../../../app/store/ducks/app.duck";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Box from "@material-ui/core/Box";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountBox from "@material-ui/icons/AccountBox";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Drawer from "@material-ui/core/Drawer";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronRight";
import Divider from "@material-ui/core/Divider";
import MenuLeft from "./MenuLeft";
import CEVLogo from '../assets/imgs/logo_comision.svg';
import * as SearchService from "../../../services/SearchService"

import List from "@material-ui/core/List";

import { makeStyles } from "@material-ui/core";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  growLogo: {
    display: 'flex',
    justifyContent: 'end'
  },
  logo: {
    width: '200px'
  },
  searchContainer: {
    flexGrow: 1,
  },
  searchInput: {
    width: "100%",
  },
  appbarSearch: {
    backgroundColor: "white",
    transition: "0.15s ease all",
  },
  appbar: {
    backgroundColor: theme.palette.secondary.main,
    transition: "0.15s ease all",
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  listSuggest: {
    color: 'black'
  }
}));

const MenuSuperiorDiccionario = (props) => {
  const [searchOpen, setsearchOpen] = useState(false)
  const [open, setOpen] = useState(false)
  const [searchValue, setsearchValue] = useState("")
  const [autocompleteOpts, setautocompleteOpts] = useState([])

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handlesearchOpen = () => {
    setsearchOpen(!searchOpen);
  };
  const onSearchSubmit = (e) => {
    e.preventDefault();  
    if(searchValue.length>=1)
    {
      window.location.href="/diccionario/busqueda/"+searchValue;
    }
    else
    {
      return false;
    }
  };
  const onChangeSearch = (e) => {
    setsearchValue(e.target.value)    
  };

  const classes = useStyles();

  return (
    <>
      <AppBar
        elevation={0}
        position="fixed"
        className={searchOpen ? classes.appbarSearch : classes.appbar}
      >
        <Toolbar>
          {props.match.path !== '/museo' ? (
            <>
              {!searchOpen ? (
                <>
                  <IconButton
                    onClick={handleDrawerOpen}
                    edge="start"
                    color="inherit"
                    aria-label="abrir menu"
                  >
                    <MenuIcon />
                  </IconButton>

                  <IconButton onClick={handlesearchOpen} color="inherit">
                    <Badge color="secondary">
                      <SearchIcon />
                    </Badge>
                  </IconButton>

                  <Box className={classes.grow} onClick={handlesearchOpen} p={4} />

                  <Box className={classes.growLogo}>
                    <img className={classes.logo} src={CEVLogo} alt="CEV Logo" />
                  </Box>
                  {/* <Box>
                    <IconButton color="inherit">
                      <Badge color="secondary">
                        <AccountBox />
                      </Badge>
                    </IconButton>
                  </Box> */}
                </>
              ) : (
                <>
                  <IconButton
                    edge="start"
                    color="secondary"
                    aria-label="volver al menu"
                    onClick={handlesearchOpen}
                  >
                    <ArrowBackIcon />
                  </IconButton>
                  <form
                    className={classes.searchContainer}
                    onSubmit={onSearchSubmit}
                  >                    
                    <InputBase
                      className={classes.searchInput}
                      placeholder="Buscar recursos por palabra clave"
                      onChange={onChangeSearch}
                      inputProps={{
                        "aria-label": "Buscar recursos por palabra clave",
                      }}
                      autoFocus={true}
                      defaultValue={props.searchKeyword}
                    />
                  </form>
                </>
              )}
            </>
          ) : (
            <>
              <IconButton
                onClick={handleDrawerOpen}
                edge="start"
                color="inherit"
                aria-label="abrir menu"
              >
                <MenuIcon />
              </IconButton>

              <Box className={classes.grow} p={4} />

              <Box className={classes.growLogo} onClick={handlesearchOpen}>
                <img className={classes.logo} src={CEVLogo} alt="CEV Logo" />
              </Box>
            </>
          )}

        </Toolbar>

        {autocompleteOpts.length > 0 && searchOpen &&
          <Box>
            <List className={classes.listSuggest}>
              {autocompleteOpts.map(o => {
                return (
                  <ListItem>
                    <ListItemText>{o.text}</ListItemText>
                  </ListItem>
                )
              })}

            </List>
          </Box>
        }

      </AppBar>
      <MenuLeft
        section={2}
        handleDrawerClose={handleDrawerClose}
        open={open}
      ></MenuLeft>
    </>
  );
};

const mapStateToProps = (store) => ({
  searchFilters: store.app.filters,
  searchKeyword: store.app.keyword,
});

export default connect(mapStateToProps, app.actions)(MenuSuperiorDiccionario);
