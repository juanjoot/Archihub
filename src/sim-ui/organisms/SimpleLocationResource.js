import React, { useEffect } from "react";
import Slider from "@material-ui/core/Slider";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import MapaColombia from "../organisms/extraCard/MapaColombia";

const useStyles = makeStyles((theme) => ({
  root: {},
 time:{
    marginTop:"30px",
    marginRight:"10px",
    marginLeft:"16px"}
}));

const SimpleLocationResource = (props) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  useEffect(() => {}, []);

  return (
    <div className={classes.root}>
      {props.resource.metadata.firstLevel.temporalCoverage &&
        props.resource.metadata.firstLevel.temporalCoverage.start &&
        props.resource.metadata.firstLevel.temporalCoverage.end && (
          <div className={classes.time}>
         
            <Slider
              value={[
                parseInt(
                  props.resource.metadata.firstLevel.temporalCoverage.start.split(
                    "-"
                  )[0]
                ),
                parseInt(
                  props.resource.metadata.firstLevel.temporalCoverage.end.split(
                    "-"
                  )[0]
                ),
              ]}
              min={1900}
              color="secondary"
              marks
              // disabled={true}
              size="small"
              max={2021}
              // onChange={() => {}}
              valueLabelDisplay="on"
              aria-labelledby="range-slider"
            />
         
          </div>
        )}
      {/* <MapaColombia className={classes.mapaInfo} geo={props.geo} /> */}
      {props.resource.metadata.firstLevel.geographicCoverage && (
        <>
          {props.resource.metadata.firstLevel.geographicCoverage.length > 1 && (
            <MapaColombia
              // className={classes.mapaInfo}
              geo={props.resource.metadata.firstLevel.geographicCoverage}
            />
          )}
          {props.resource.metadata.firstLevel.geographicCoverage.length === 1 &&
            props.resource.metadata.firstLevel.geographicCoverage[0].code ===
              "CO" && (
              <MapaColombia
                // className={classes.mapaInfo}
                geo={props.resource.metadata.firstLevel.geographicCoverage}
              />
            )}
        </>
      )}
    </div>
  );
};

export default SimpleLocationResource;
