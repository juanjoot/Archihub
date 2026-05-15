import { useState, useEffect } from "react";
import { descending } from "d3-array";
import * as VizService from "../../../../services/VizService";
import { getColor, getScaleDomain } from "./utils";

function useMapData(props) {
  const [loading, setLoading] = useState(true);
  const [buckets, setBuckets] = useState([]);
  const [hovered, setHovered] = useState({});
  const [tooltip, setTooltip] = useState("");
  const {
    dpto,
    fondo,
    idents,
    keyword,
    place,
    setDpto,
    setTotal,
    temporalRange,
    tipo,
  } = props;

  const scaleDomain = getScaleDomain(buckets[0] ? buckets[0].value : 0);

  const getMpioData = (filters) =>
    VizService.getMapaMuseoMpio(filters).then(
      (data) => {
        const arrayDep = [];
        const buckets_ = data.aggregations.municipios.buckets;
        Object.keys(buckets_).forEach((k) => {
          arrayDep.push({
            codigo: k,
            value: buckets_[k]["doc_count"],
          });
        });
        arrayDep.sort((x, y) => descending(x.value, y.value));
        setBuckets(arrayDep);
        setLoading(false);
      },
      (error) => {
        console.log(error);
      },
    );

  const getDptoData = (filters) =>
    VizService.getMapaMuseoDpto(filters).then(
      (data) => {
        const arrayDep = [];
        const buckets_ = data.aggregations.departamentos.buckets;
        Object.keys(buckets_).forEach((k) => {
          arrayDep.push({
            codigo: k,
            value: buckets_[k]["doc_count"],
          });
        });
        arrayDep.sort((x, y) => descending(x.value, y.value));
        setBuckets(arrayDep);
        setLoading(false);
      },
      (error) => {
        console.log(error);
      },
    );

  useEffect(() => {
    setLoading(true);
    setTotal(null);
    const filters = {
      q: keyword,
      dpto,
      fondo,
      idents,
      place,
      ...(temporalRange && { temporalCoverage: temporalRange }),
      tipo,
    };
    if (dpto) {
      getMpioData(filters);
    } else {
      getDptoData(filters);
    }
  }, [dpto, fondo, idents, keyword, place, temporalRange, tipo, setTotal]);

  useEffect(() => {
    const bucketItem = buckets.find((item) => item.codigo === hovered.code) || {
      value: 0,
    };
    setTooltip({ name: hovered.name, value: bucketItem.value });
  }, [hovered, buckets]);

  const onEachDpto = (feature, layer) => {
    const { dpto_ccdgo, dpto_cnmbr } = feature.properties;
    layer.on({
      click: () => {
        setDpto({
          divipola: dpto_ccdgo,
          nombre: dpto_cnmbr,
        });
      },
      mouseover: () => setHovered({ code: dpto_ccdgo, name: dpto_cnmbr }),
    });
  };

  const onEachMpio = (feature, layer) => {
    const { mpio_ccnct, mpio_cnmbr } = feature.properties;
    layer.on({
      mouseover: () => setHovered({ code: mpio_ccnct, name: mpio_cnmbr }),
    });
  };

  const geojsonStyle = (feature) => {
    if (buckets.length > 0) {
      const codeProp = dpto ? "mpio_ccnct" : "dpto_ccdgo";
      const item = buckets.find(
        (d) => d.codigo === feature.properties[codeProp],
      );
      return {
        fillColor:
          item && item.value ? getColor(scaleDomain, item.value) : "white",
        weight: 2,
        opacity: 1,
        color: "white",
        dashArray: "3",
        fillOpacity: 0.7,
      };
    }
  };

  return {
    geojsonStyle,
    loading,
    onEachDpto,
    onEachMpio,
    tooltip,
    buckets,
  };
}

export default useMapData;
