import { URL_API, PAGE_SIZE } from "../config/const";

export function serviceListResourceByUserFilter(
  page,
  filters,
  size,
  typeResource,
) {
  var myHeaders = new Headers({ "Content-Type": "application/json" });

  const path = "/api/collection-bookmark/resource/byuser/filter";

  var data = {
    filters: filters,
    user: 1,
    from: (page - 1) * size,
    size: size,
    typeResource: typeResource,
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

export function serviceListResourceByUser(id) {
  var myHeaders = new Headers({ "Content-Type": "application/json" });
  const path = "/api/collection-bookmark/resource/byuser/" + 1;

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

export function getIdentCollection() {
  var myHeaders = new Headers({ "Content-Type": "application/json" });
  const path = "/api/collection-bookmark/resource-ident/byuser/" + 1;

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

export function createBookmarkUserMuseo(doc) {
  var myHeaders = new Headers({ "Content-Type": "application/json" });
  const path = "/api/collection-bookmark";

  var miInit = {
    method: "POST",
    headers: myHeaders,
    mode: "cors",
    cache: "default",
    body: JSON.stringify({ ...doc, user: 1 }),
  };

  return fetch(URL_API + path, miInit).then((response) => {
    if (response.status !== 201) {
      return Promise.reject(response.status);
    } else {
      return response;
    }
  });
}

export function deleteBookmarkUserMuseo(ident) {
  var myHeaders = new Headers({ "Content-Type": "application/json" });
  const path =
    "/api/collection-bookmark/user/" + 1 + "/resource-ident/" + ident;

  var miInit = {
    method: "DELETE",
    headers: myHeaders,
    mode: "cors",
    cache: "default",
  };

  return fetch(URL_API + path, miInit).then((response) => {
    if (response.status !== 200) {
      return Promise.reject(response.status);
    } else {
      return response;
    }
  });
}
