import { Box } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core";
import ItemList from "./ItemList";

// import DOMPurify from "dompurify";
import LinkTwoToneIcon from "@mui/icons-material/LinkTwoTone";
const useStyles = makeStyles((theme) => ({
  root: {
    // display: "flex",
    // flexDirection: "column",
    // alignItems: "start",
    // justifyContent: "center",
    paddingRight: "30px",
    paddingLeft: "30px",
  },
  separator: {
    // margin: '0px',
    marginBottom: "15px",
    marginTop: "0px",
  },
  title: {
    color: theme.palette.primary.main,
    margin: "0px",
  },
  description: {
    color: "#141313",
  },
  link: {
    color: theme.palette.primary.main,
  },
  ul: {
    listStyleType: "none",
    // paddingLeft: "90px",
    padding: 0,
    fontStyle: "italic",
    color: theme.palette.primary.main,
  },
  list: {
    // width: "50%",
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
}));

const TermDetail = (props) => {
  const classes = useStyles();

  const sanitizedData = () => ({
    __html: props.description,
  });

  return (
    <Box className={classes.root}>
      <Box className={classes.title} component="h3">
        {props.title}
      </Box>
      <hr className={classes.separator} />
      <Box component="span" className={classes.description}>
        {/* {props.description} */}
        <div dangerouslySetInnerHTML={sanitizedData()} />
      </Box>
      <Box className={classes.link} display="flex" alignItems="center">
        <LinkTwoToneIcon />
        <a
          className={classes.link}
          href={"/explora/buscador?query=" + props.title}
        >
          {" "}
          Visitar término
        </a>
      </Box>
      <br />
      <Box className={classes.title} component="h4">
        Términos relacionados
      </Box>
      <hr className={classes.separator} />

      <Box className={classes.list}>
        <ul className={classes.ul}>
          {props.term && props.term.hijos && props.term.hijos.length
            ? props.term.hijos.map((item) => {
                return <ItemList parent={item.id} item={item} />;
              })
            : ""}
        </ul>
      </Box>
    </Box>
  );
};

export default TermDetail;
