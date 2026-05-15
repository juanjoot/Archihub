import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";

import IconButton from "@material-ui/core/IconButton";

import SearchIcon from "@material-ui/icons/Search";

import { useTesauro } from "../context/tesauroContext";
import * as TesauroService from "../../../../services/TesauroService";
import { useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

const Search = () => {
  const { updateTerms, updateText, text } = useTesauro();

  useEffect(() => {
    searchWord(text);
  }, [text]);

  const classes = useStyles();
  const searchWord = async (text) => {
    // e.preventDefault();
    if (text) {
      try {
        updateText(text);

        let resp = await TesauroService.searchByWord(text);
        console.log(resp);
        if (resp && resp.hits && resp.hits.hits && resp.hits.hits.length) {
          resp = resp.hits.hits.map((item) => item?._source);
          console.log("entra", resp);
          updateTerms(resp);
        } else {
          updateTerms([]);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <Paper component="form" className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="Buscar por palabra"
        inputProps={{ "aria-label": "Buscar por palabra" }}
        onChange={(e) => searchWord(e.target.value)}
      />
      <IconButton
        type="button"
        className={classes.iconButton}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
      {/* <Divider className={classes.divider} orientation="vertical" />
      <IconButton
        color="primary"
        className={classes.iconButton}
        aria-label="directions"
      >
        <DirectionsIcon />
      </IconButton> */}
    </Paper>
  );
};

export default Search;
