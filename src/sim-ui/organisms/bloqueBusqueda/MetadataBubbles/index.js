import { useEffect, useState } from "react";
import { Chip, Container, Typography } from "@material-ui/core";
import { aggregateMetadataBy } from "../../../../services/VizService";
import { FIELDS_MAP } from "./constants";
import useDatavizStyles, { useWindowDimensions } from "./useDatavizStyles";
import BubbleChart from "./BubbleChart";
import Subtitle from "../../../atoms/Subtitle";

const MAX_VIZ_WIDTH = 500;

const MetadataBubbles = (props) => {
  const classes = useDatavizStyles();
  const [selectedOptions, setSelectedOptions] = useState({
    aggregationField: Object.keys(FIELDS_MAP)[0],
  });

  const handleOptionChange = (name, value) =>
    setSelectedOptions((prevState) => ({
      ...prevState,
      [name]: value === "" ? null : value,
    }));

  return (
    <Container disableGutters className={classes.container}>
      <DatavizSection
        aggregationField={selectedOptions.aggregationField}
        handleOptionChange={handleOptionChange}
        filters={props}
      />
    </Container>
  );
};

const DatavizSection = ({ aggregationField, filters, handleOptionChange }) => {
  const classes = useDatavizStyles();
  const [buckets, setBuckets] = useState([]);
  const [loading, setLoading] = useState(true);
  const { width } = useWindowDimensions();
  const getPeriodObject = (periodString) => {
    const periodArray = periodString.split("-");
    return { start: periodArray[0], end: periodArray[1] };
  };
  const getFilters = () => {
    const { dpto, fondo, idents, keyword, temporalRange, tipo } = filters;
    return {
      ...(dpto && { dpto }),
      ...(fondo && fondo.length !== 0 && { fondo }),
      ...(idents && { idents }),
      ...(keyword && { keyword }),
      ...(temporalRange && { periodo: getPeriodObject(temporalRange) }),
      ...(tipo && { tipo }),
    };
  };
  // some bucket names come with noisy texts that should be removed
  const getFixedBuckets = (aggregationField, buckets) => {
    switch (aggregationField) {
      case "actors":
      case "population":
      case "violenceType":
        buckets = buckets.map((item) => ({
          ...item,
          key: item.key.split(" - ").pop(),
        }));
        break;
    }
    return buckets;
  };

  useEffect(async () => {
    if (aggregationField) {
      // if there's something to aggregate
      setLoading(true);
      try {
        const response = await aggregateMetadataBy(
          FIELDS_MAP[aggregationField].query,
          getFilters(),
        );
        const fixedBuckets = response.aggregations
          ? getFixedBuckets(
              aggregationField,
              response.aggregations.tipo.buckets,
            )
          : [];
        setBuckets(fixedBuckets);
      } catch (error) {
        console.log(
          "Error calling aggregateMetadataBy in MetadataBubbles/index.js",
          error,
        );
        setBuckets([]);
      } finally {
        setLoading(false);
      }
    }
  }, [aggregationField, filters]);

  return (
    <section className={`${classes.datavizSection} ${classes.flexContainer}`}>
      <div className={`${classes.datavizLeftPane}`}>
        <OptionsMenu
          aggregationField={aggregationField}
          onOptionChange={handleOptionChange}
        />
        {FIELDS_MAP[aggregationField].description && (
          <Typography paragraph>
            {FIELDS_MAP[aggregationField].description}
          </Typography>
        )}
      </div>
      <div
        style={{
          width: width > MAX_VIZ_WIDTH ? MAX_VIZ_WIDTH : width - 20,
          margin: "auto",
          cursor: "pointer",
        }}
      >
        <BubbleChart
          width={width > MAX_VIZ_WIDTH ? MAX_VIZ_WIDTH : width - 20}
          height={width > MAX_VIZ_WIDTH ? MAX_VIZ_WIDTH - 50 : width - 20}
          colors={["#213A72", "#1FC0C8", "#756BEB", "#FFB558"]}
          buckets={buckets}
          options={{ aggregationField }}
          isLoading={loading}
        />
      </div>
    </section>
  );
};

const OptionsMenu = ({ aggregationField, onOptionChange }) => {
  const classes = useDatavizStyles();

  return (
    <section className={classes.optionsMenu}>
      <Subtitle>Agrupar por:</Subtitle>
      <div className={classes.metadataList}>
        {Object.keys(FIELDS_MAP).map((key) => (
          <Chip
            key={key}
            label={FIELDS_MAP[key].label}
            className={aggregationField === key ? "selected" : ""}
            onClick={() => onOptionChange("aggregationField", key)}
          />
        ))}
      </div>
    </section>
  );
};

export default MetadataBubbles;
