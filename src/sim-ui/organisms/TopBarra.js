import React from "react";

import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import InputBase from "@material-ui/core/InputBase";
import { makeStyles } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import FolderOpenTwoToneIcon from "@material-ui/icons/FolderOpenTwoTone";
import SortByAlphaTwoToneIcon from "@mui/icons-material/SortByAlphaTwoTone";
import CodeTwoToneIcon from "@mui/icons-material/CodeTwoTone";
import AssessmentIcon from "@mui/icons-material/Assessment";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import Search from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  topBar: {
    background: theme.palette.primary.dark,
    display: "flex",
    justifyContent: "flex-end",
    padding: theme.spacing(1),
    position: "sticky",
    top: 0,
    borderBottom: "1px solid white",
    zIndex: 10,
  },
  inside: {
    display: "flex",
    maxWidth: 600,
    minWidth: 300,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(4),
    alignItems: "center",
  },
  navContainer: {
    paddingRight: theme.spacing(4),
  },
  navIcon: {
    color: "white",
  },
  searchForm: {
    border: "1px solid white",
    borderRadius: 50,
    marginLeft: theme.spacing(6),
    paddingRight: theme.spacing(1),
    paddingLeft: theme.spacing(2),
  },
  searchIcon: {
    color: "white",
  },
  searchInput: {
    color: "white",
  },
  divider: {
    background: "white",
  },
}));

const TopBar = (props) => {
  const classes = useStyles();

  return (
    <Box className={classes.topBar}>
      <Box className={classes.inside}>
        <nav className={classes.navContainer}>
          <Tooltip title="Resultados" TransitionComponent={Zoom}>
            <IconButton size="large" className={classes.navIcon}>
              <FolderOpenTwoToneIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Metadatos" TransitionComponent={Zoom}>
            <IconButton size="large" className={classes.navIcon}>
              <AssessmentIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Mapa" TransitionComponent={Zoom}>
            <IconButton size="large" className={classes.navIcon}>
              <SortByAlphaTwoToneIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Linea del tiempo" TransitionComponent={Zoom}>
            <IconButton size="large" className={classes.navIcon}>
              <CodeTwoToneIcon />
            </IconButton>
          </Tooltip>
        </nav>

        <Divider className={classes.divider} orientation="vertical" flexItem />

        <Box>
          <form className={classes.searchForm}>
            <InputBase
              className={classes.searchInput}
              // placeholder={t("explora.busquedaInput")}
              // onChange={(e) => onChangeSearch(e)}
              inputProps={{ maxLength: 140 }}
              // defaultValue={props.keyword}
              // value={keyword}
            />
            <Search className={classes.searchIcon} />
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default TopBar;
