import { useState } from "react";
import { Accordion, AccordionSummary, AccordionDetails } from "@material-ui/core/";
import Box from "@material-ui/core/Box";
import { useTheme } from "@material-ui/core/styles";
import LineaTiempo from "../LineaTiempo";
import Subtitle from "../../../atoms/Subtitle";

const Temporal = (props) => {
  const theme = useTheme();

  return (
    <Accordion expanded={true}>
      <AccordionSummary>
        <Subtitle>Filtrar por años</Subtitle>
      </AccordionSummary>

      <AccordionDetails>
        <Box sx={{ minWidth: "100%" }}>
          <Box sx={{ margin: "5%" }}>
            <LineaTiempo
              temporalRange={props.temporalRange}
              setTemporalRange={props.setTemporalRange}
            />
          </Box>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default Temporal;
