import { useState } from "react";
import { connect } from "react-redux";
import * as app from "../../store/ducks/app.duck";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Box from "@material-ui/core/Box";
import InputBase from "@material-ui/core/InputBase";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import MenuIcon from "@material-ui/icons/Menu";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Typography } from '@material-ui/core/';
import MenuLeft from "./MenuLeft";
import MenuLeftDesktop from "./MenuLeftDesktop";
import CEVLogo from "../assets/imgs/logo_comision.svg";
import * as SearchService from "../../services/SearchService";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import List from "@material-ui/core/List";
import { makeStyles } from "@material-ui/core";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  growLogo: {
    display: "flex",
    justifyContent: "end",
  },
  museoHeader:{
    fontSize: 20,
    fontWeight: 600
  },
  logo: {
    width: "200px",
    [theme.breakpoints.down(750)]: {
      width: "150px",                
    }
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
    backgroundColor: theme.palette.primary.main,
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
    color: "black",
  },
}));

const MenuSuperior = (props) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const [searchOpen, setsearchOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchValue, setsearchValue] = useState("");
  const [autocompleteOpts, setautocompleteOpts] = useState([]);

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleDrawerSwith = () => {
    setOpen(!open);
  };

  const onSearchSubmit = (e) => {
    e.preventDefault();
    setsearchOpen(false);
    searchValue === "" ? props.keyword("") : props.keyword(searchValue);
  };
  const onChangeSearch = (e) => {
    setsearchValue(e.target.value);
    SearchService.searchSuggestMuseo(e.target.value).then(
      (data) => {
        setautocompleteOpts(data.autocomplete[0].options);
      },
      (error) => {
        console.log(error);
      }
    );
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
            <>
              {!searchOpen ? (
                <>
                  <IconButton
                    onClick={handleDrawerSwith}
                    edge="start"
                    color="inherit"
                    aria-label="abrir menu"
                  >
                    <MenuIcon />
                  </IconButton>

                  <Box>
                    <Typography variant="h3" className={classes.museoHeader}>
                      Archivo
                    </Typography>
                  </Box>

                  <Box
                    className={classes.grow}
                    p={4}
                  />

                  <Box className={classes.growLogo}>
                    <img
                      className={classes.logo}
                      src={CEVLogo}
                      alt="CEV Logo"
                    />
                  </Box>
                </>
              ) : (
                <>
                  <IconButton
                    edge="start"
                    color="secondary"
                    aria-label="volver al menu"
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
        </Toolbar>

        {autocompleteOpts.length > 0 && searchOpen && (
          <Box>
            <List className={classes.listSuggest}>
              {autocompleteOpts.map((o) => {
                return (
                  <ListItem>
                    <ListItemText>{o.text}</ListItemText>
                  </ListItem>
                );
              })}
            </List>
          </Box>
        )}
      </AppBar>

      {matches ? (
        <MenuLeft
          section={2}
          handleDrawerClose={handleDrawerClose}
          open={open}
        ></MenuLeft>
      ) : (
        <MenuLeftDesktop
          section={2}          
          open={open}
        />
      )}
    </>
  );
};

const mapStateToProps = (store) => ({
  searchFilters: store.app.filters,
  searchKeyword: store.app.keyword,
  currentSection: store.museo.currentSection,
});

export default connect(mapStateToProps, app.actions)(MenuSuperior);
