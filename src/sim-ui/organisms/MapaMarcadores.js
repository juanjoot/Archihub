import { useRef, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import Typography from "@material-ui/core/Typography";
import BusquedaSitios from "./BusquedaSitios";
import withWidth, { isWidthDown } from "@material-ui/core/withWidth";
import { Link } from "react-router-dom";
import Box from "@material-ui/core/Box";

import * as L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import MarcadorPersonalizado from "./MarcadorPersonalizado";

const POSITION_CLASSES = {
  bottomleft: "leaflet-bottom leaflet-left",
  bottomright: "leaflet-bottom leaflet-right",
  topleft: "leaflet-top leaflet-left",
  topright: "leaflet-top leaflet-right",
};

function createIcon() {
  return new L.Icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
  });
}

const useStyles = makeStyles((theme) => ({
  contenedor: {
    marginTop: "0px",
  },
}));

const GeoJsonSitio = (props) => {
  const map = useMap();
  useEffect(() => {
    let sitio = L.geoJSON(props.data, { style: props.style });
    map.addLayer(sitio);
    return () => {
      map.removeLayer(sitio);
    };
  });
  return null;
};

const ZoomFitBoundMarker = (props) => {
  const map = useMap();

  try {
    const { localizaciones, nuevaslocalizaciones } = props;
    const loc = localizaciones.concat(nuevaslocalizaciones);
    const delta = 0.1;
    if (loc.length > 0) {
      let bounds = [];

      for (let i in loc) {
        try {
          if (loc[0].geoPoint) {
            bounds = [
              [loc[i].geoPoint.coordinates[1], loc[i].geoPoint.coordinates[0]],
              [loc[i].geoPoint.coordinates[1], loc[i].geoPoint.coordinates[0]],
            ];
            break;
          }
        } catch (e) {
          console.log(e);
        }
      }

      for (let i in loc) {
        if (loc[i].geoPoint) {
          try {
            const point = loc[i];
            const lat = point.geoPoint.coordinates[1];
            const long = point.geoPoint.coordinates[0];
            const minLat = bounds[0][0];
            const minLong = bounds[0][1];
            const maxLat = bounds[1][0];
            const maxLong = bounds[1][1];
            if (lat < minLat) bounds[0][0] = lat;
            if (long < minLong) bounds[0][1] = long;
            if (lat > maxLat) bounds[1][0] = lat;
            if (long > maxLong) bounds[1][1] = long;
          } catch (e) {
            console.log(e);
          }
        }
      }

      if (bounds.length > 0) {
        bounds[0][0] = bounds[0][0] - delta;
        bounds[0][1] = bounds[0][1] - delta;
        bounds[1][0] = bounds[1][0] + delta;
        bounds[1][1] = bounds[1][1] + delta;
        map.fitBounds(bounds);
      }
    }
  } catch (e) {
    console.log(e);
  }

  return null;
};

const MapaMarcadores = (props) => {
  const classes = useStyles();
  const { localizaciones, cambioNuevasLocalizaciones, lectura } = props;
  const iconMarker = createIcon();
  const [sitioGeojson, setSitioGeojson] = useState(null);
  const [abrirPopUpNuevaLozacion, setAbrirPopUpNuevaLozacion] = useState(false);
  const [cambiarZoom, setCambiarZoom] = useState(true);
  const mapRef = useRef();

  let localizaciones_recursos = [];
  let localizaciones_sin_recursos = [];

  if (localizaciones) {
    localizaciones_recursos = localizaciones.filter(
      (loc) => loc.resource === true,
    );
    localizaciones_sin_recursos = localizaciones.filter(
      (loc) => loc.resource === false,
    );
  }
  const [nuevaslocalizaciones, setNuevaslocalizaciones] = useState(
    localizaciones_sin_recursos,
  );

  useEffect(() => {
    if (cambioNuevasLocalizaciones)
      cambioNuevasLocalizaciones(
        localizaciones_recursos.concat(nuevaslocalizaciones),
      );
  }, [nuevaslocalizaciones]);

  const agregarNuevoMarcador = (sitio, centroGeoSitio) => {
    const location = crearNuevoMarcador(sitio, centroGeoSitio);
    location["resource"] = false;
    const cNuevasLocalizaciones = [...nuevaslocalizaciones];
    cNuevasLocalizaciones.push(location);
    setAbrirPopUpNuevaLozacion(true);
    setCambiarZoom(false);
    setNuevaslocalizaciones(cNuevasLocalizaciones);
  };

  const crearNuevoMarcador = (sitio, centroGeoSitio) => {
    const source = sitio.item["_source"];
    const propiedades = source["properties"];
    const index = sitio.item["_index"];
    const geoPoint = {
      coordinates: [centroGeoSitio.lng, centroGeoSitio.lat],
      type: "point",
    };
    const name = sitio.name;
    let code = "";
    if (index == "veredas") {
      code = propiedades["CODIGO_VER"];
    } else {
      code = propiedades["COD_CPOB"];
    }
    const location = {
      name: name,
      geoPoint: geoPoint,
      code: code,
      description: "",
    };

    return location;
  };

  const eliminarNuevoMarcador = (index, item) => {
    let arrayNuevasAplicaciones = [...nuevaslocalizaciones];
    let newIndex = buscarIndicePorCodigo(nuevaslocalizaciones, item);
    if (newIndex != -1) {
      arrayNuevasAplicaciones.splice(newIndex, 1);
      setNuevaslocalizaciones(arrayNuevasAplicaciones);
      setSitioGeojson(null);
      setCambiarZoom(true);
    }
  };
  const actualizarDescripcion = (index, item, text) => {
    let arrayNuevasAplicaciones = [...nuevaslocalizaciones];
    let newIndex = buscarIndicePorCodigo(nuevaslocalizaciones, item);
    if (newIndex != -1) {
      arrayNuevasAplicaciones[newIndex]["description"] = text;
      setNuevaslocalizaciones(arrayNuevasAplicaciones);
      setCambiarZoom(false);
    }
  };

  const buscarIndicePorCodigo = (arr, item) => {
    let index = -1;
    for (let i = 0; i < arr.length; i++) {
      let element = arr[i];
      if (element.code === item.code) {
        index = i;
        return index;
      }
    }
    return index;
  };

  const seleccionSitio = (s) => {
    if (s != null) {
      var geojsonSitios = s.item["_source"];
      let sitio = L.geoJSON(geojsonSitios);
      const map = mapRef.current.leafletElement;
      agregarNuevoMarcador(s, sitio.getBounds().getCenter());
      map.fitBounds(sitio.getBounds());
      setSitioGeojson(geojsonSitios);
    }
  };

  const renderizandoNuevosMarcadores = (item, index, abrirPopup) => {
    return (
      <MarcadorPersonalizado
        key={"markerPersonalizado_" + index}
        item={item}
        index={index}
        abrirPopup={abrirPopup}
        eliminar={eliminarNuevoMarcador}
        actualizarDescripcion={actualizarDescripcion}
        lectura={lectura}
      />
    );
  };

  const renderizandoMarcadores = (item, index) => {
    return (
      <>
        {item.geoPoint ? (
          <>
            {"coordinates" in item.geoPoint ? (
              <Marker
                key={"marker_" + index}
                index={index}
                position={[
                  item.geoPoint.coordinates[1],
                  item.geoPoint.coordinates[0],
                ]}
                icon={iconMarker}
                //onclick={handleClick}
              >
                <Popup>
                  <Link
                    to={"/detail/" + item.ident}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Typography variant="subtitle1">
                      Recurso: {item.ident}
                    </Typography>
                  </Link>
                  <Typography variant="body2" color="primary">
                    Lugar: {item.name}
                  </Typography>
                </Popup>
              </Marker>
            ) : null}
          </>
        ) : null}
      </>
    );
  };

  return (
    <Box mt={4} className={classes.contenedor}>
      {isWidthDown("md", props.width) && !lectura ? (
        <BusquedaSitios seleccionSitio={seleccionSitio} />
      ) : null}
      <MapContainer
        ref={mapRef}
        center={[4.124080991005611, -73.67431640625001]}
        zoom={5}
        key={"mapa_"}
        style={
          isWidthDown("md", props.width)
            ? { height: "300px" }
            : { height: "500px" }
        }
        scrollWheelZoom={false}
      >
        {sitioGeojson != null ? (
          <GeoJsonSitio
            data={sitioGeojson}
            style={{
              color: "gray",
              weight: 0.5,
              fillColor: "#2a5080",
              fillOpacity: 0.4,
            }}
          />
        ) : null}

        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {localizaciones_recursos.map((item, index) =>
          renderizandoMarcadores(item, index),
        )}
        {nuevaslocalizaciones.map((item, index) => {
          let abrirPopup = false;
          if (abrirPopUpNuevaLozacion)
            abrirPopup = index === nuevaslocalizaciones.length - 1;
          return renderizandoNuevosMarcadores(item, index, abrirPopup);
        })}

        {cambiarZoom ? (
          <ZoomFitBoundMarker
            localizaciones={localizaciones_recursos}
            nuevaslocalizaciones={nuevaslocalizaciones}
          />
        ) : null}

        {!isWidthDown("md", props.width) && !lectura ? (
          <BusquedaSitios position="topright" seleccionSitio={seleccionSitio} />
        ) : null}
      </MapContainer>
    </Box>
  );
};

export default withWidth()(MapaMarcadores);
