import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as museo from "../../store/ducks/museo.duck";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import DescriptionTwoTone from "@material-ui/icons/DescriptionTwoTone";
import LocationOnTwoTone from "@material-ui/icons/LocationOnTwoTone";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import MetadataCard from "./MetadataCard";
import SimpleLocationResource from "./SimpleLocationResource";
import DetailResourceRecords from "./DetailResourceRecords";
import { METADA_INFO } from "../../config/const";
import _ from "lodash";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import { useNavigate, useLocation } from "react-router-dom";
import HeaderResourceView from "./HeaderResourceView";

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
    flexGrow: 1,
    backgroundColor: "white",
  },
  tabs: {
    color: theme.palette.primary.main,
    height: "50px",
  },
  labelIcon: {
    width: "auto",
    padding: 0,
  },
  iconLabelWrapper: {
    flexDirection: "row",
    justifyContent: "left",
    marginBottom: "0px",
    textTransform: "capitalize",
  },
  icon: {
    marginRight: "5px",
  },
  subContainer: {
    display: "flex",
  },
  generalDetails: {
    width: "100%",
  },
  root: {
    margin: "25px 110px 2% 110px",
    [theme.breakpoints.down("sm")]: {
      margin: "10px 5% 2% 5%",
    },
  },
  tabPanel: {
    padding: "0",
    maxHeight: "800px",
  },
  linkContainer: {
    display: "flex",
    border: "1px solid",
    width: "210px",
    borderRadius: "4px",
    borderColor: theme.palette.primary.main,
    alignItems: "center",
  },
  link: {
    color: theme.palette.primary.main,
    fontSize: "15px",
  },
  file: {
    width: "60%",
  },
  document: {
    maxHeight: "500px",
  },
  title: {
    marginBottom: "15px",
    fontWeight: "bold",
    // [theme.breakpoints.up('lg')]: {
    //   padding: "0 8%"
    // },
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

  textDescription: {
    color: "black",
    fontSize: "initial",
    maxHeight: "800px",
  },
  divider: {
    // Theme Color, or use css color in quote
    background: theme.palette.primary.main,
  },
  tabRoot: {
    width: 125,
    minWidth: 125,
  },
  tabRootTecnic: {
    width: 190,
    minWidth: 190,
  },
}));

const DetailResource = (props) => {
  const [record, setRecord] = React.useState(null);
  const [resource, setResource] = React.useState(props.resource);
  const [fields, setFields] = React.useState(null);
  const [fieldsRecord, setFieldsRecord] = React.useState(null);

  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [type, setType] = React.useState(null);
  const [idRecord, setIdRecord] = React.useState(null);
  const [previusUrl, setPreviusUrl] = React.useState(null);
  const [previusUrlLabel, setPreviusUrlLabel] = React.useState(null);
  const [hasCoverage, setHasCoverage] = React.useState(true);

  const location = useLocation();
  const history = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    // getMetaData();
    const list = getMetaData(resource);
    if (list.length) setFields(list);
    getRecord();
  }, [resource]);

  const getParams = () => {
    const queryParams = new URLSearchParams(location.search);

    if (queryParams.has("type")) {
      setType(queryParams.get("type"));
      queryParams.delete("type");
    }
    if (queryParams.has("id_record")) {
      setIdRecord(queryParams.get("id_record"));
      queryParams.delete("id_record");
    }
    if (queryParams.has("previus_url")) {
      props.setPreviusUrl(queryParams.get("previus_url"));
      queryParams.delete("previus_url");
    }
    if (queryParams.has("previus_url_label")) {
      props.setPreviusUrlLabel(queryParams.get("previus_url_label"));
      queryParams.delete("previus_url_label");
    }
    // history.replace({
    //   search: queryParams.toString(),
    // });
  };

  useEffect(() => {
    getParams();
    porcessoCoverage();
  }, []);

  useEffect(() => {}, [record]);

  const getRecord = async () => {
    const recordLocal = props.resource.filesObj
    if (recordLocal.length) {
      setRecord(recordLocal[0]);
    }
  };

  const porcessoCoverage = async () => {
    setHasCoverage(
      props.resource.metadata.firstLevel.temporalCoverage &&
        props.resource.metadata.firstLevel.geographicCoverage,
    );
  };

  const getMetaData = (object) => {
    let aux_resource = JSON.parse(JSON.stringify(object));
    if (aux_resource.records) {
      delete aux_resource.records;
    }
    if (aux_resource._id) {
      delete aux_resource._id;
    }
    if (aux_resource.identifier) {
      delete aux_resource.identifier;
    }
    if (aux_resource.ResourceGroupId) {
      delete aux_resource.ResourceGroupId;
    }
    if (aux_resource.metadata._id) {
      delete aux_resource.metadata._id;
    }
    if (aux_resource.metadata.firstLevel.description) {
      delete aux_resource.metadata.firstLevel.description;
    }

    if (aux_resource.origin) {
      delete aux_resource.origin;
    }

    let i = 0;

    return aux_resource['fields']
      .map(field => ({
        name: field.label,
        description: field.value,
        type: field.type 
      }));
  };

  const flattenKeys = (obj, path = []) =>
    !_.isObject(obj)
      ? { [path.join(".")]: obj }
      : _.reduce(
          obj,
          (cum, next, key) => _.merge(cum, flattenKeys(next, [...path, key])),
          {},
        );

  const viewAllResource = async (e) => {
    e.preventDefault();
    setType(null);
    setIdRecord(null);
  };

  return (
    <div>
      <HeaderResourceView
        autor={props.resource.metadata.firstLevel.authors || null}
        title={props.resource.metadata.firstLevel.title}
      />

      <div className={classes.root}>
        {/* <h3 className={classes.title}>
        {props.resource.metadata.firstLevel.title}
      </h3> */}
        {/* {props.resource.metadata.simpleident ? (
        <div>
          <h5> {props.resource.metadata.simpleident}</h5>
        </div>
      ) : null} */}

        {/* {props.resource.metadata.firstLevel.authors ? (
        <div>
          <h5> Autor: {props.resource.metadata.firstLevel.authors}</h5>
        </div>
      ) : null} */}
        <Grid container direction="row" justifyContent="center">
          {/* <Grid item xs={12} sm={6} lg={idRecord && idRecord !== "" ? 5:4}> */}
          <Grid style={{ display: "flex" }} item xs={12} sm={6} lg={6}>
            <div className={classes.generalDetails}>
              <div className="tabs">
                <AppBar
                  elevation={0}
                  position="static"
                  className={classes.appbar}
                >
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="simple tabs example"
                    className={classes.tabs}
                    indicatorColor="primary"
                    variant="scrollable"
                  >
                    {/* <Tab
                      icon={
                        <DescriptionTwoTone
                          className={classes.icon}
                          color="primary"
                        />
                      }
                      classes={{
                        wrapper: classes.iconLabelWrapper,
                        labelIcon: classes.labelIcon,
                        root: classes.tabRoot,
                      }}
                      label="Descripción"
                      {...a11yProps(0)}
                    /> */}
                    <Tab
                      icon={
                        <DescriptionTwoTone
                          className={classes.icon}
                          color="primary"
                        />
                      }
                      classes={{
                        wrapper: classes.iconLabelWrapper,
                        labelIcon: classes.labelIcon,
                        root: classes.tabRoot,
                      }}
                      label="Metadatos"
                      {...a11yProps(1)}
                    />
                    {idRecord ? (
                      <Tab
                        icon={
                          <DescriptionTwoTone
                            className={classes.icon}
                            color="primary"
                          />
                        }
                        classes={{
                          wrapper: classes.iconLabelWrapper,
                          labelIcon: classes.labelIcon,
                          root: classes.tabRootTecnic,
                        }}
                        label="Metadatos técnicos"
                        {...a11yProps(2)}
                      />
                    ) : null}

                    {hasCoverage ? (
                      <Tab
                        icon={
                          <LocationOnTwoTone
                            className={classes.icon}
                            color="primary"
                          />
                        }
                        classes={{
                          wrapper: classes.iconLabelWrapper,
                          labelIcon: classes.labelIcon,
                          root: classes.tabRoot,
                        }}
                        label="Cobertura"
                        {...a11yProps(3)}
                      />
                    ) : null}
                  </Tabs>
                </AppBar>
                <TabPanel
                  className={`${classes.tabPanel} ${classes.scrollModify}`}
                  value={value}
                  index={0}
                >
                  <MetadataCard fields={fields} />
                </TabPanel>
                <TabPanel
                  className={`${classes.tabPanel} ${classes.scrollModify}`}
                  value={value}
                  index={2}
                >
                  <MetadataCard fields={fieldsRecord} />
                </TabPanel>
              </div>
              <br />

              
            </div>
            <Divider
              classes={{ root: classes.divider }}
              orientation="vertical"
              light
              flexItem
            />
          </Grid>
          {record && record != null && (
            <Grid item xs={12} sm={6} lg={6}>
              <DetailResourceRecords
                records={props.resource.filesObj}
                openRecord={type === 'record'}
              />
            </Grid>
          )}
          
        </Grid>
      </div>
    </div>
  );
};

const mapStateToProps = (store) => ({
  place: store.museo.currentSection,
});

export default connect(mapStateToProps, museo.actions)(DetailResource);
