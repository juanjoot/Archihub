import styled from "@emotion/styled";
import { COLOR_LEGEND } from "../constants";
import { getScaleDomain } from "../utils";

function LegendControl({ maxValue }) {
  const scale = getScaleDomain(maxValue);
  const getLegendText = (index) =>
    index >= scale.length - 1
      ? `${scale[index]} +`
      : `${scale[index]} - ${scale[index + 1]}`;

  return (
    <StyledLegend className="leaflet-bottom leaflet-right">
      <div className="leaflet-control-layers leaflet-control-layers-expanded leaflet-control">
        {scale.map((_, i) => (
          <div key={`color-legend-${i}`}>
            <i style={{ background: COLOR_LEGEND.colorsRange[i] }}></i>
            {getLegendText(i)}
          </div>
        ))}
      </div>
    </StyledLegend>
  );
}

const StyledLegend = styled.div`
  margin-bottom: 15px;
  line-height: 18px;
  color: #555;
  i {
    width: 18px;
    height: 18px;
    float: left;
    margin-right: 8px;
    opacity: 0.7;
  }
`;

export default LegendControl;
