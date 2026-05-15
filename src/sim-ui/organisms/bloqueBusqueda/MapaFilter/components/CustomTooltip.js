import styled from "@emotion/styled";
import { Pane, Tooltip } from "react-leaflet";
import { Z_INDEX } from "../constants";

function CustomTooltip({ name, value }) {
  return (
    <Pane name="tooltip-pane" style={{ zIndex: Z_INDEX.tootlip }}>
      <StyledTooltip>
        <h4>{name}</h4>
        {value === 1 ? `${value} recurso` : `${value} recursos`}
      </StyledTooltip>
    </Pane>
  );
}

const StyledTooltip = styled(Tooltip)`
  font-size: 1.2em;
  h4 {
    margin: 0;
  }
`;

export default CustomTooltip;
