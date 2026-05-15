import { URL_API } from "../config/const";
import axios from "axios";

export function create(collection) {
  var myHeaders = new Headers({
    "Content-Type": "application/json",
  });
  const path = "/api/collection";

  var miInit = {
    method: "POST",
    headers: myHeaders,
    mode: "cors",
    cache: "default",
    body: JSON.stringify(collection),
  };

  return fetch(URL_API + path, miInit).then((response) => {
    if (response.status !== 201) {
      return Promise.reject(response.status);
    } else {
      return response.json();
    }
  });
}

export function getCollectionById(id) {
  var myHeaders = new Headers({
    "Content-Type": "application/json",
  });
  const path = "/api/collection/" + id;

  var miInit = {
    method: "GET",
    headers: myHeaders,
    mode: "cors",
    cache: "default",
  };

  return fetch(URL_API + path, miInit).then((response) => {
    if (response.status !== 200) {
      return Promise.reject(response.status);
    } else {
      return response.json();
    }
  });
}



export function getCollectionBySlug(slug) {
  var myHeaders = new Headers({
    "Content-Type": "application/json",
  });
  const path = "/api/collection/slug/" + slug;

  var miInit = {
    method: "GET",
    headers: myHeaders,
    mode: "cors",
    cache: "default",
  };

  return fetch(URL_API + path, miInit).then((response) => {
    if (response.status !== 200) {
      return Promise.reject(response.status);
    } else {
      return response.json();
    }
  });
}

export function getCollectionBySlugDB(slug) {
  var myHeaders = new Headers({
    "Content-Type": "application/json",
  });
  const path = "/api/collection/slugdb/" + slug;

  var miInit = {
    method: "GET",
    headers: myHeaders,
    mode: "cors",
    cache: "default",
  };

  return fetch(URL_API + path, miInit).then((response) => {
    if (response.status !== 200) {
      return Promise.reject(response.status);
    } else {
      return response.json();
    }
  });
}

export function getCollectionBySlugDBPagination(slug, page = 0) {
  var myHeaders = new Headers({
    "Content-Type": "application/json",
  });
  const path = "/api/collection/slugdb/" + slug + "/" + page;

  var miInit = {
    method: "GET",
    headers: myHeaders,
    mode: "cors",
    cache: "default",
  };

  return fetch(URL_API + path, miInit).then((response) => {
    if (response.status !== 200) {
      return Promise.reject(response.status);
    } else {
      return response.json();
    }
  });
}

export function searchCollections(data) {
  var myHeaders = new Headers({
    "Content-Type": "application/json",
  });
  const path = "/api/collection/find/searchCollections"

  var miInit = {
    method: "POST",
    headers: myHeaders,
    mode: "cors",
    cache: "default",
    body: JSON.stringify(data),
  };

  return fetch(URL_API + path, miInit).then((response) => {
    if (response.status !== 201) {
      return Promise.reject(response.status);
    } else {
      return response.json();
    }
  });
}

export function getResumeCollectionByUser() {
  var myHeaders = new Headers({
    "Content-Type": "application/json",
  });
  const path = "/api/collection/resume/byuser/" + 1;

  var miInit = {
    method: "GET",
    headers: myHeaders,
    mode: "cors",
    cache: "default",
  };

  return fetch(URL_API + path, miInit).then((response) => {
    if (response.status !== 200) {
      return Promise.reject(response.status);
    } else {
      return response.json();
    }
  });
}

export function deleteCollection(id) {
  const path = "/api/collection/" + id;

  var miInit = {
    method: "DELETE",
    mode: "cors",
    cache: "default",
  };

  return fetch(URL_API + path, miInit).then((response) => {
    if (response.status !== 200) {
      return Promise.reject(response.status);
    } else {
      return response.json();
    }
  });
}

export function update(id, data) {
  var myHeaders = new Headers({
    "Content-Type": "application/json",
  });

  const path = "/api/collection/" + id;

  var miInit = {
    method: "PUT",
    headers: myHeaders,
    mode: "cors",
    cache: "default",
    body: JSON.stringify(data),
  };

  return fetch(URL_API + path, miInit).then((response) => {
    if (response.status !== 200) {
      return Promise.reject(response.status);
    } else {
      return response.json();
    }
  });
}
export function find_collection(form) {
  const path = "/api/collection/find";

  return axios
    .post(URL_API + path, form, {})
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}
export function getKeywords() {
  var myHeaders = new Headers({
    "Content-Type": "application/json",
  });
  const path = "/api/collection/find/keywords";

  var miInit = {
    method: "GET",
    mode: "cors",
    cache: "default",
  };

  return fetch(URL_API + path, miInit).then((response) => {
    if (response.status !== 200) {
      return Promise.reject(response.status);
    } else {
      return response.json();
    }
  });
}

export function getlist(name) {
  var myHeaders = new Headers({
    "Content-Type": "application/json",
  });
  const path = "/api/list/byname/" + name;

  var miInit = {
    method: "GET",
    headers: myHeaders,
    mode: "cors",
    cache: "default",
  };

  return fetch(URL_API + path, miInit).then((response) => {
    if (response.status !== 200) {
      return Promise.reject(response.status);
    } else {
      return response.json();
    }
  });
}

export function getConfiguration() {
  var myHeaders = new Headers({
    "Content-Type": "application/json",
  });
  const path = "/api/collection/configuration/options";

  var miInit = {
    method: "GET",
    headers: myHeaders,
    mode: "cors",
    cache: "default",
  };

  return fetch(URL_API + path, miInit).then((response) => {
    if (response.status !== 200) {
      return Promise.reject(response.status);
    } else {
      return response.json();
    }
  });
}

export function getCollectionsByKeywords(propierty, keyword) {
  const path = "/api/collection/find/collectionsByKeywords";

  return axios
    .post(URL_API + path, { [propierty]: keyword }, {})
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}

export function getCollectionsByCategory(category) {
  const path = "/api/collection/find/collectionsByCategory";

  return axios
    .post(URL_API + path, { category }, {})
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}
export function getAggregation(name) {
  const path = "/api/collection/aggregation";

  return axios
    .post(URL_API + path, { name }, {})
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}

export function collectionsByMetadata(key, values) {
  const path = "/api/collection/find/collectionsByMetadata";

  return axios
    .post(URL_API + path, { key: key, values: values }, {})
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}
