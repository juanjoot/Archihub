import { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import GeneralGallery from "./GeneralGallery";
import { useTranslation } from "react-i18next";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
     
    >
      {value === index && (
        <Box p={0}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
  },
  label: {
    textTransform: "capitalize",
    marginTop: "0px",
    color:  theme.palette.primary.main,
    fontSize: '18px'
    
  },
  separator: {
    margin: "0px",
    borderTop: "2px solid rgba(0, 0, 0, 0.1)",
  },
  contenedorTitulo: {
    backgroundColor: 'white'
  },
  tabs:{
    height: '48px',
    },
  tabResult:{
    overflowX: "hidden"
  }
}));

const TabsGalleryCrea = (props) => {
  const [value, setValue] = useState(0);
  const [t, i18n] = useTranslation("common");
  const classes = useStyles();
  const theme = useTheme();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  const handleChangeIndex = (index) => {
    setValue(index);
  };
  return (
    <>
      <Paper square>
        <Tabs
          value={value}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
          aria-label="disabled tabs example"
          scrollButtons={false}
          className={classes.tabs}
        >
          <Tab className={classes.label} label={t("crea.narrativeManager.titlePage.tabSuggest")}/>
        </Tabs>
      </Paper>
      <hr className={classes.separator} />
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
       
      >
        <TabPanel  className={classes.tabResult} value={value} index={0} dir={theme.direction}>
          {<GeneralGallery updateDataGallery={props.updateDataGallery}/>}
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}></TabPanel>
      </SwipeableViews>
    </>
  );
};

export default TabsGalleryCrea;
