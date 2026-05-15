import { Pane, LayerGroup, GeoJSON } from "react-leaflet";
import { Z_INDEX } from "../constants";

import Departamentos from "../../../../assets/geojson/Departamentos";
import Municipios from "../../../../assets/geojson/Municipios";
import Mundo from "../../../../assets/geojson/Mundo";

// manual Layer created to colour the map
function CustomTileLayer({ dpto }) {
  return (
    <Pane name="minimalist-pane" style={{ zIndex: Z_INDEX.tile }}>
      <LayerGroup>
        <GeoJSON
          data={Mundo.features}
          style={{
            color: "#f9f9f9",
            weight: 1.5,
            fillColor: "#f1eeee",
            fillOpacity: 1,
          }}
        />
        <GeoJSON
          data={Departamentos.features}
          style={{
            color: "#f9f9f9",
            weight: 1.5,
            fillColor: dpto ? "#f1eeee" : "white",
            fillOpacity: 1,
          }}
        />
        {dpto && (
          <GeoJSON
            data={Municipios.features.filter(
              (d) => d.properties.dpto_ccdgo === dpto.divipola,
            )}
            style={{
              color: "#f9f9f9",
              weight: 1.5,
              fillColor: "white",
              fillOpacity: 1,
            }}
          />
        )}
      </LayerGroup>
    </Pane>
  );
}

export default CustomTileLayer;
