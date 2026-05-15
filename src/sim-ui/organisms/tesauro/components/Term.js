import { Box, Card, CardContent } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import ForumTwoToneIcon from "@material-ui/icons/ForumTwoTone";
import { useTesauro } from "../context/tesauroContext";
import * as TesauroService from "../../../../services/TesauroService";
import TesauroTabs from "./TesauroTabs";
import ItemList from "./ItemList";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: 200,
    // width: "50%",
    marginBottom: 50,
  },
  header: {
    display: "flex",
    height: "60px",
    backgroundColor: "#f7f7f7",
  },
  iconContainer: {
    height: "100%",
    backgroundColor: theme.palette.primary.main,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "70px",
  },

  letter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "50px",
    color: theme.palette.primary.main,
    fontWeight: "bold",
    paddingLeft: "15px",
  },

  ul: {
    listStyleType: "none",
    paddingLeft: "90px",
    fontStyle: "italic",
    color: theme.palette.primary.main,
  },
  list: {
    width: "50%",
    maxHeight: "400px",
    minHeight: "400px",
    overflowX: "hidden",
    overflowY: "auto",
    "&::-webkit-scrollbar": { width: "15px" },
    "&::-webkit-scrollbar-track": {
      borderRadius: "6px",
      height: "300px",
    },
    "&::-webkit-scrollbar-thumb": {
      background: theme.palette.primary.main,
      backgroundClip: "content-box",
      border: "0.2em solid rgba(0, 0, 0, 0)",
    },
  },
  subContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  tesauroTabs: {
    marginTop: "-50px",
    width: "50%",
  },
  separator: {
    display: "flex",
    width: "1px",
    height: "320px",
    backgroundColor: theme.palette.primary.main,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "2%",
    marginBottom: "2%",
    marginLeft: "-8px",
  },
  term: {
    cursor: "pointer",
  },
  childrenTerm: {
    cursor: "pointer",
    fontWeight: "200",
    listStyleType: "none",
  },
  masterTerm: {
    cursor: "pointer",
    fontWeight: "bold",
    // display: "flex",
    // justifyContent: "start",
    // alignItems: "center",
  },
}));

const Term = () => {
  const classes = useStyles();
  const { letter, updateTerms, terms, updateTerm, text } = useTesauro();

  // const [terms, setTerms] = useState([]);
  const [loading, SetLoading] = useState(false);
  const [terminos, setTerminos] = useState([]);


  useEffect(() => {
    if (letter) {
      getTerms(letter);
    }
  }, [letter]);

  useEffect(() => {
    setTerminos([])
    if (terms.length) {
      setTerminos(terms);
    }
  }, [terms]);

  const getTerms = async (letter) => {
    try {
      SetLoading(true);
      let resp = await TesauroService.getTermsByLetter(letter);
      SetLoading(false);

      if (resp && resp.hits && resp.hits.hits && resp.hits.hits.length) {
        resp = resp.hits.hits.map((item) => item?._source);
        updateTerms(resp);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getTerm = async (term) => {
    try {
      SetLoading(true);
      updateTerm(term);

      let resp = await TesauroService.getTermById(term.id);
      SetLoading(false);

      if (resp && resp.hits && resp.hits.hits && resp.hits.hits.length) {
        resp = resp.hits.hits[0]._source;
        updateTerm(resp);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <Card className={classes.root}>
        <Box className={classes.header}>
          <Box className={classes.iconContainer}>
            <ForumTwoToneIcon fontSize="large" style={{ color: "white" }} />
          </Box>
          <Box className={classes.letter}>
            {letter ? letter : text ? text : ""}
          </Box>
        </Box>
        <Box className={classes.subContainer}>
          <Box className={classes.list}>
            <ul className={classes.ul}>
              {terminos.map((item) => {
                // if (item?.hijos?.length) {
                  return <ItemList parent= {item.id} item={item} />;
                // } 
                // else {
                //   return (
                //     <li className={classes.term} onClick={() => getTerm(item)}>
                //       {item.padre}
                //     </li>
                //   );
                // }
              })}
            </ul>
          </Box>
          <Box className={classes.separator}></Box>
          <Box className={classes.tesauroTabs}>
            <TesauroTabs />
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default Term;
