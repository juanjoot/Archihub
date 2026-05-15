import { useEffect } from "react";
import {
  GeoJSON,
  MapContainer,
  useMap,
  LayersControl,
  Pane,
  TileLayer,
} from "react-leaflet";

import Loader from "./components/Loader";
import ColorLegend from "./components/ColorLegend";
import CustomTooltip from "./components/CustomTooltip";
import CustomTileLayer from "./components/CustomTileLayer";
import useMapData from "./useMapData";
import { MAP_SETTINGS, Z_INDEX, COLOR_LEGEND } from "./constants";

import Departamentos from "../../../assets/geojson/Departamentos";
import Municipios from "../../../assets/geojson/Municipios";
import "leaflet/dist/leaflet.css";

function MapaFilter(props) {
  const { dpto } = props;
  const { loading, tooltip, onEachDpto, onEachMpio, geojsonStyle, buckets } =
    useMapData(props);

  return (
    <>
      {loading && <Loader />}

      <MapContainer
        center={MAP_SETTINGS.defaultCenter}
        minZoom={5}
        zoom={MAP_SETTINGS.defaultZoom}
        maxZoom={9}
        style={MAP_SETTINGS.style}
        scrollWheelZoom={false}
        doubleClickZoom={false}
        dragging={false}
      >
        <AutoZoom dpto={dpto} />

        <LayersControl position="topright" collapsed={false}>
          <LayersControl.BaseLayer checked name="Minimalista">
            <CustomTileLayer dpto={dpto} />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Estándar">
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
        </LayersControl>

        <ColorLegend
          maxValue={buckets && buckets[0] ? buckets[0].value : 0}
          colors={COLOR_LEGEND.colorsRange}
        />

        {/* paint Districts and Municipalities */}
        <Pane name="geojson-pane" style={{ zIndex: Z_INDEX.overlay }}>
          {!dpto && !loading && (
            <GeoJSON
              data={Departamentos.features}
              onEachFeature={onEachDpto}
              style={geojsonStyle}
            >
              <CustomTooltip {...tooltip} />
            </GeoJSON>
          )}

          {dpto && !loading && (
            <GeoJSON
              data={Municipios.features.filter(
                (d) => d.properties.dpto_ccdgo === dpto.divipola,
              )}
              onEachFeature={onEachMpio}
              style={geojsonStyle}
            >
              <CustomTooltip {...tooltip} />
            </GeoJSON>
          )}
        </Pane>
      </MapContainer>
    </>
  );
}

// map zoom-in or zoom-out when selected district changes
function AutoZoom({ dpto }) {
  const map = useMap();

  useEffect(() => {
    if (dpto) {
      const feature = Departamentos.features.find(
        (item) => item.properties.dpto_ccdgo === dpto.divipola,
      ).geometry;
      map.fitBounds(feature.coordinates[0].map((item) => [item[1], item[0]]));
    } else {
      map.flyTo(MAP_SETTINGS.defaultCenter, MAP_SETTINGS.defaultZoom);
    }
  }, [dpto]);

  return null;
}

export default MapaFilter;
