import React, { useEffect } from "react";
import { Box, makeStyles } from "@material-ui/core";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import * as TesauroService from "../../../../services/TesauroService";
import { useTesauro } from "../context/tesauroContext";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  childrenTerm: {
    cursor: "pointer",
    fontWeight: "200",
    listStyleType: "none",
  },
  masterTerm: {
    listStyleType: "none",
    cursor: "pointer",
    fontWeight: "bold",
    marginLeft: "-10px",
    // display: "flex",
    // justifyContent: "start",
    // alignItems: "center",
  },
}));

const ItemList = (props) => {
  const classes = useStyles();
  const { updateTerm } = useTesauro();
  const [show, setShow] = useState(false);
  const [localTerm, setlocalTerm] = useState(false);
  const [parent, setParent] = useState(props.parent);

  useEffect(() => {
    getTermApi(props.item.id);

    return () => {
      setShow(false);
    };
  }, [props.item]);

  const getTermApi = async (id) => {
    let resp = await TesauroService.getTermById(id);
    if (resp && resp.hits && resp.hits.hits && resp.hits.hits.length) {
      resp = resp.hits.hits[0]._source;
      setlocalTerm(resp);
    }
  };

  const getTerm = async (term) => {
    try {
      //   SetLoading(true);
      updateTerm(term);

      let resp = await TesauroService.getTermById(term.id);
      //   SetLoading(false);

      if (resp && resp.hits && resp.hits.hits && resp.hits.hits.length) {
        resp = resp.hits.hits[0]._source;
        updateTerm(resp);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateShow = () => {
    setShow(!show);
  };

  return (
    <div>
      {localTerm && localTerm.hijos && localTerm.hijos.length ? (
        <div>
          {localTerm.hijos.length == 1 && localTerm.hijos[0].id == parent ? (
            <div>
              <li className={classes.childrenTerm}>
                <Box display="flex" alignItems="center" justifyContent="start">
                  <span onClick={() => getTerm(props.item)}>
                    {props.item.padre}
                  </span>
                </Box>
              </li>
            </div>
          ) : (
            <div>
              <li className={classes.masterTerm}>
                <Box display="flex" alignItems="center" justifyContent="start">
                  <ArrowRightIcon onClick={() => updateShow()} />
                  <span onClick={() => getTerm(props.item)}>
                    {props.item.padre}
                  </span>
                </Box>
                {show ? (
                  <Box>
                    <ul>
                      {localTerm.hijos.map((item) => {
                        if (item.id != parent)
                          return <ItemList parent={localTerm.id} item={item} />;
                      })}
                    </ul>
                  </Box>
                ) : (
                  ""
                )}
              </li>
            </div>
          )}
        </div>
      ) : (
        <li className={classes.childrenTerm}>
          <Box display="flex" alignItems="center" justifyContent="start">
            <span onClick={() => getTerm(props.item)}>{props.item.padre}</span>
          </Box>
        </li>
      )}
    </div>
  );
};

export default ItemList;
