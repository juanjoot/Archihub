import { AppBar, Box, Tab, Tabs } from "@material-ui/core";
import LocationOnTwoTone from "@material-ui/icons/LocationOnTwoTone";
import { DescriptionTwoTone } from "@mui/icons-material";
import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import CodeTwoToneIcon from "@mui/icons-material/CodeTwoTone";
import ArticleTwoToneIcon from "@mui/icons-material/ArticleTwoTone";
import TermDetail from "./TermDetail";
import { useTesauro } from "../context/tesauroContext";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box pt={4} mr={5}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  appbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-bettween",
    backgroundColor: "#f7f7f7",
  },
  tabs: {
    color: theme.palette.primary.main,
    height: "50px",
    width: "100%",
    borderBottom: "1px solid",
  },
  labelIcon: {
    width: "auto",
    padding: 0,
    fontSize: "20px",
  },
  iconLabelWrapper: {
    flexDirection: "row",
    justifyContent: "left",
    marginBottom: "0px",
    textTransform: "capitalize",
  },

  scrollModify: {
    overflowY: "scroll",
    "&::-webkit-scrollbar": { width: "17px" },
    "&::-webkit-scrollbar-track": {
      boxShadow: "inset 0 0 0px grey",
      borderRadius: "10px",
      marginBlock: "0 250px 0 0 ",
      background: "rgba(0, 0, 0, 0)",
    },

    "&::-webkit-scrollbar-thumb": {
      background: theme.palette.primary.main,
      borderRadius: "10px",
      backgroundClip: "content-box",
      border: "0.2em solid rgba(0, 0, 0, 0)",
    },
  },

  iconTab: {
    marginRight: "5px",
  },
}));
const TesauroTabs = () => {
  const { term } = useTesauro();
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    console.log(term);
  }, [term]);

  return (
    <div className="tabs">
      <AppBar elevation={0} position="static" className={classes.appbar}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
          className={classes.tabs}
          indicatorColor="primary"
          variant="scrollable"
        >
          <Tab
            icon={
              <ArticleTwoToneIcon
                className={classes.iconTab}
                fontSize="large"
              />
            }
            classes={{
              wrapper: classes.iconLabelWrapper,
              labelIcon: classes.labelIcon,
              root: classes.tabRoot,
            }}
            label="Término"
            {...a11yProps(0)}
          />
          {/* <Tab
            icon={<CodeTwoToneIcon fontSize="large" />}
            classes={{
              wrapper: classes.iconLabelWrapper,
              labelIcon: classes.labelIcon,
              root: classes.tabRoot,
            }}
            label="Metadatos"
            {...a11yProps(1)}
          /> */}
        </Tabs>
      </AppBar>
      <TabPanel
        className={`${classes.tabPanel} ${classes.scrollModify}`}
        value={value}
        index={0}
      >
        {term ? (
          <TermDetail term={term || false} title={term?.padre} description={term?.nota} />
        ) : (
          ""
        )}
      </TabPanel>
      {/* <TabPanel
        className={`${classes.tabPanel} ${classes.scrollModify}`}
        value={value}
        index={1}
      ></TabPanel> */}
    </div>
  );
};

export default TesauroTabs;
