import { URL_API } from "../config/const";
import axios from "axios";

export function geometrySite(data) {
  var myHeaders = new Headers({ "Content-Type": "application/json" });
  const path = "/api/search-museo/geometry/site";
  var miInit = {
    method: "POST",
    headers: myHeaders,
    mode: "cors",
    cache: "default",
    body: JSON.stringify(data),
  };

  return fetch(URL_API + path, miInit).then(function (response) {
    if (response.status !== 201) {
      return Promise.reject(response.status);
    } else {
      return response.json();
    }
  });
}

export function suggestSiteKeyword(keyword) {
  var myHeaders = new Headers({ "Content-Type": "application/json" });

  const path = "/api/search-museo/sites";

  var data = {
    keyword: keyword,
  };

  var miInit = {
    method: "POST",
    headers: myHeaders,
    mode: "cors",
    cache: "default",
    body: JSON.stringify(data),
  };

  return fetch(URL_API + path, miInit).then(function (response) {
    if (response.status !== 201) {
      return Promise.reject(response.status);
    } else {
      return response.json();
    }
  });
}

export function getCountries() {
  const path = "/api/search-museo/countries";

  var miInit = {
    method: "GET",
    mode: "cors",
    cache: "default",
  };

  return fetch(URL_API + path, miInit).then(function (response) {
    if (response.status !== 200) {
      return Promise.reject(response.status);
    } else {
      return response.json();
    }
  });
}

export function getDepartamentos(country) {
  const path = "/api/search-museo/departament/" + country;

  var miInit = {
    method: "GET",
    mode: "cors",
    cache: "default",
  };

  return fetch(URL_API + path, miInit).then(function (response) {
    if (response.status !== 200) {
      return Promise.reject(response.status);
    } else {
      return response.json();
    }
  });
}

export function getMunicipios(departament) {
  const path = "/api/search-museo/municipality/" + departament;

  var miInit = {
    method: "GET",
    mode: "cors",
    cache: "default",
  };

  return fetch(URL_API + path, miInit).then(function (response) {
    if (response.status !== 200) {
      return Promise.reject(response.status);
    } else {
      return response.json();
    }
  });
}
