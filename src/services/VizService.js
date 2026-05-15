import { URL_API } from "../config/const";

import axios from "axios";

export function tagCloud(filters, type = true, selected = []) {
  var myHeaders = new Headers({ "Content-Type": "application/json" });
  let path;

  path = "/api/viz/tagcloud";
  if (selected.length > 0) if (selected[0] === "") selected = [];
  var miInit = {
    method: "POST",
    headers: myHeaders,
    mode: "cors",
    cache: "default",
    body: JSON.stringify({ ...filters, type: type, gruposEntidades: selected }),
  };

  return fetch(URL_API + path, miInit).then(function (response) {
    if (response.status !== 200) {
      return Promise.reject(response.status);
    } else {
      let resp = response.json();
      return resp;
    }
  });
}

export function getTimeline(from, to) {
  return axios
    .get(`${URL_API}/api/linea/${from}/from/${to}/to`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}

export function mapping() {
  var myHeaders = new Headers({ "Content-Type": "application/json" });
  let path = "/api/viz/mapping";

  var miInit = {
    method: "GET",
    headers: myHeaders,
    mode: "cors",
    cache: "default",
  };

  return fetch(URL_API + path, miInit).then(function (response) {
    if (response.status !== 200) {
      return Promise.reject(response.status);
    } else {
      let resp = response.json();
      return resp;
    }
  });
}

export function grafoEntidades(filters) {
  var myHeaders = new Headers({ "Content-Type": "application/json" });
  let path;

  path = "/api/viz/grafoentidades";

  var miInit = {
    method: "POST",
    headers: myHeaders,
    mode: "cors",
    cache: "default",
    body: JSON.stringify(filters),
  };

  return fetch(URL_API + path, miInit).then(function (response) {
    console.log(response.status);
    if (response.status !== 200) {
      return Promise.reject(response.status);
    } else {
      let resp = response.json();

      return resp;
    }
  });
}

export function totalSearchHits(filters) {
  var myHeaders = new Headers({ "Content-Type": "application/json" });
  let path = "/api/viz/totalsearchhits";

  var miInit = {
    method: "POST",
    headers: myHeaders,
    mode: "cors",
    cache: "default",
    body: JSON.stringify(filters),
  };

  return fetch(URL_API + path, miInit).then(function (response) {
    if (response.status !== 200) {
      return Promise.reject(response.status);
    } else {
      let resp = response.json();
      return resp;
    }
  });
}

export function getEtiquetas(filters) {
  var myHeaders = new Headers({ "Content-Type": "application/json" });
  let path = "/api/viz/getetiquetas";

  var miInit = {
    method: "POST",
    headers: myHeaders,
    mode: "cors",
    cache: "default",
    body: JSON.stringify(filters),
  };

  console.log(JSON.stringify(miInit));

  return fetch(URL_API + path, miInit).then(function (response) {
    if (response.status !== 200) {
      return Promise.reject(response.status);
    } else {
      let resp = response.json();
      return resp;
    }
  });
}

export function getLineaTiempo(filters) {
  var myHeaders = new Headers({ "Content-Type": "application/json" });
  let path = "/api/viz/getlineatiempo";

  var miInit = {
    method: "POST",
    headers: myHeaders,
    mode: "cors",
    cache: "default",
    body: JSON.stringify(filters),
  };

  console.log(filters);

  return fetch(URL_API + path, miInit).then(function (response) {
    if (response.status !== 200) {
      return Promise.reject(response.status);
    } else {
      let resp = response.json();
      return resp;
    }
  });
}

export function getMapaViz(filters) {
  var myHeaders = new Headers({ "Content-Type": "application/json" });
  let path = "/api/viz/getmapaviz";

  var miInit = {
    method: "POST",
    headers: myHeaders,
    mode: "cors",
    cache: "default",
    body: JSON.stringify(filters),
  };

  return fetch(URL_API + path, miInit).then(function (response) {
    if (response.status !== 200) {
      return Promise.reject(response.status);
    } else {
      let resp = response.json();
      return resp;
    }
  });
}

export function getMapaVizEnlaces(filters) {
  var myHeaders = new Headers({ "Content-Type": "application/json" });
  let path = "/api/viz/getentidadesmapa";

  var miInit = {
    method: "POST",
    headers: myHeaders,
    mode: "cors",
    cache: "default",
    body: JSON.stringify(filters),
  };

  return fetch(URL_API + path, miInit).then(function (response) {
    if (response.status !== 200) {
      return Promise.reject(response.status);
    } else {
      let resp = response.json();
      return resp;
    }
  });
}

export function getNgram(filters) {
  var myHeaders = new Headers({ "Content-Type": "application/json" });
  let path = "/api/viz/getngram";

  var miInit = {
    method: "POST",
    headers: myHeaders,
    mode: "cors",
    cache: "default",
    body: JSON.stringify(filters),
  };

  return fetch(URL_API + path, miInit).then(function (response) {
    if (response.status !== 200) {
      return Promise.reject(response.status);
    } else {
      let resp = response.json();
      return resp;
    }
  });
}

export function getHistogramDates(filters) {
  var myHeaders = new Headers({ "Content-Type": "application/json" });
  let path = "/api/viz/getHistogramDates";

  var miInit = {
    method: "POST",
    headers: myHeaders,
    mode: "cors",
    cache: "default",
    body: JSON.stringify(filters),
  };

  return fetch(URL_API + path, miInit).then(function (response) {
    if (response.status !== 200) {
      return Promise.reject(response.status);
    } else {
      let resp = response.json();
      return resp;
    }
  });
}

export function getListaEtiquetas() {
  var myHeaders = new Headers({ "Content-Type": "application/json" });
  let path = "/api/viz/getEtiquetas";

  var miInit = {
    method: "GET",
    headers: myHeaders,
    mode: "cors",
    cache: "default",
  };

  return fetch(URL_API + path, miInit).then(function (response) {
    if (response.status !== 200) {
      return Promise.reject(response.status);
    } else {
      let resp = response.json();

      console.log(resp);
      return resp;
    }
  });
}

export function getListaEntidades() {
  var myHeaders = new Headers({ "Content-Type": "application/json" });
  let path = "/api/viz/getEntidades";

  var miInit = {
    method: "GET",
    headers: myHeaders,
    mode: "cors",
    cache: "default",
  };

  return fetch(URL_API + path, miInit).then(function (response) {
    if (response.status !== 200) {
      return Promise.reject(response.status);
    } else {
      let resp = response.json();
      return resp;
    }
  });
}

/**
 * SERVICIOS de viz para el museo
 */

export function getMuseoHistogram(filters) {
  var myHeaders = new Headers({ "Content-Type": "application/json" });

  var data = {};

  if (filters.q !== undefined) data["q"] = filters.q;
  if (filters.temporalCoverage)
    data["temporalCoverage"] = filters.temporalCoverage;
  if (filters.dpto) data["dpto"] = filters.dpto;
  if (filters.tipo) data["tipo"] = filters.tipo;
  if (filters.fondo) data["fondo"] = filters.fondo;
  if (filters.type) data["type"] = filters.type;
  if (filters.resourceGroupId)
    data["resourceGroupId"] = filters.resourceGroupId;
  if (filters.accessLevel) data["accessLevel"] = filters.accessLevel;
  if (filters.order) data["order"] = filters.order;
  if (filters.idents) data["idents"] = filters.idents;
  if (filters.place) data["place"] = filters.place;

  var miInit = {
    method: "POST",
    headers: myHeaders,
    mode: "cors",
    cache: "default",
    body: JSON.stringify(data),
  };

  const path = "/api/viz/getMuseoHistogram";

  return fetch(URL_API + path, miInit).then(function (response) {
    if (response.status !== 200) {
      return Promise.reject(response.status);
    } else {
      return response.json();
    }
  });
}

export function getMapaMuseoDpto(filters) {
  var myHeaders = new Headers({ "Content-Type": "application/json" });

  var data = {};

  if (filters.q !== undefined) data["q"] = filters.q;
  if (filters.temporalCoverage)
    data["temporalCoverage"] = filters.temporalCoverage;
  if (filters.dpto) data["dpto"] = filters.dpto;
  if (filters.tipo) data["tipo"] = filters.tipo;
  if (filters.fondo) data["fondo"] = filters.fondo;
  if (filters.type) data["type"] = filters.type;
  if (filters.resourceGroupId)
    data["resourceGroupId"] = filters.resourceGroupId;
  if (filters.accessLevel) data["accessLevel"] = filters.accessLevel;
  if (filters.order) data["order"] = filters.order;
  if (filters.idents) data["idents"] = filters.idents;
  if (filters.place) data["place"] = filters.place;

  var miInit = {
    method: "POST",
    headers: myHeaders,
    mode: "cors",
    cache: "default",
    body: JSON.stringify(data),
  };

  const path = "/api/viz/getMuseoDptoMapa";

  return fetch(URL_API + path, miInit).then(function (response) {
    if (response.status !== 200) {
      return Promise.reject(response.status);
    } else {
      return response.json();
    }
  });
}

export function getMapaMuseoMpio(filters) {
  var myHeaders = new Headers({ "Content-Type": "application/json" });

  var data = {};

  if (filters.q !== undefined) data["q"] = filters.q;
  if (filters.temporalCoverage)
    data["temporalCoverage"] = filters.temporalCoverage;
  if (filters.dpto) data["dpto"] = filters.dpto;
  if (filters.tipo) data["tipo"] = filters.tipo;
  if (filters.fondo) data["fondo"] = filters.fondo;
  if (filters.type) data["type"] = filters.type;
  if (filters.resourceGroupId)
    data["resourceGroupId"] = filters.resourceGroupId;
  if (filters.accessLevel) data["accessLevel"] = filters.accessLevel;
  if (filters.order) data["order"] = filters.order;
  if (filters.idents) data["idents"] = filters.idents;
  if (filters.place) data["place"] = filters.place;

  var miInit = {
    method: "POST",
    headers: myHeaders,
    mode: "cors",
    cache: "default",
    body: JSON.stringify(data),
  };

  const path = "/api/viz/getMuseoMpioMapa";

  return fetch(URL_API + path, miInit).then(function (response) {
    if (response.status !== 200) {
      return Promise.reject(response.status);
    } else {
      return response.json();
    }
  });
}

export function aggregateMetadataBy(fieldId, filters) {
  const path = "/api/viz/aggregateMetadataBy";
  const headers = new Headers({ "Content-Type": "application/json" });
  const init = {
    method: "POST",
    headers,
    mode: "cors",
    cache: "default",
    body: JSON.stringify({ fieldId, filters }),
  };

  return fetch(URL_API + path, init).then((response) => {
    if (response.status !== 200) {
      return Promise.reject(response.status);
    } else {
      return response.json();
    }
  });
}

export function getOriginsList() {
  const path = "/api/viz/getOriginsList";
  const headers = new Headers({ "Content-Type": "application/json" });
  const init = {
    method: "POST",
    headers,
    mode: "cors",
    cache: "default",
  };

  return fetch(URL_API + path, init).then(function (response) {
    if (response.status !== 200) {
      return Promise.reject(response.status);
    } else {
      return response.json();
    }
  });
}
