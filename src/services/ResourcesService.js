import { TIMEOUT, URL_API, PAGE_SIZE } from "../config/const";
import { getToken } from "../crud/auth.crud";
import axios from "axios";

export function getResource(ident) {
  const headers = { Authorization: getToken() };

  return axios
    .get(`${URL_API}/api/resources/${ident}`, {
      headers: headers,
      timeout: TIMEOUT,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}
export function checkIn(id) {
  var myHeaders = new Headers({ Authorization: getToken() });

  const path = "/api/resources/checkIn/" + id;

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
export function serviceDetail(id) {
  var myHeaders = new Headers({ Authorization: getToken() });

  const path = "/api/resources/" + id;

  var miInit = {
    method: "GET",
    headers: myHeaders,
    mode: "cors",
    cache: "default",
  };

  return fetch(URL_API + path, miInit).then((response) => {
    if (response.status === 403) {
      return response.json();
    } else if (response.status !== 200) {
      return Promise.reject(response.status);
    } else {
      return response.json();
    }
  });
}

export function serviceCount() {
  var myHeaders = new Headers({ Authorization: getToken() });

  const path = "/api/resources/count";

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

export function serviceListParents(id) {
  var myHeaders = new Headers({ Authorization: getToken() });

  const path = "/api/resources/" + id + "/resources-parents";

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

export function serviceListByParents(parents, from) {
  var myHeaders = new Headers({ "Content-Type": "application/json" });

  const path =
    "/api/resources/listByParents?from=" + from + "&size=" + PAGE_SIZE;

  var miInit = {
    method: "POST",
    headers: myHeaders,
    mode: "cors",
    cache: "default",
    body: JSON.stringify({ resourceGroups: parents }),
  };

  return fetch(URL_API + path, miInit).then((response) => {
    if (response.status !== 200) {
      return Promise.reject(response.status);
    } else {
      return response.json();
    }
  });
}

export function toMoveResourceToResourcegroup(body) {
  var myHeaders = new Headers({ "Content-Type": "application/json" });

  const path = "/api/resources/moveResource";

  var miInit = {
    method: "POST",
    headers: myHeaders,
    mode: "cors",
    cache: "default",
    body: JSON.stringify(body),
  };

  return fetch(URL_API + path, miInit).then((response) => {
    if (response.status !== 200) {
      return Promise.reject(response.status);
    } else {
      return response.json();
    }
  });
}

export function serviceGetResourcesByFilter(filter) {
  var myHeaders = new Headers({ "Content-Type": "application/json" });

  const path = "/api/resources/getAllResources";

  var miInit = {
    method: "POST",
    headers: myHeaders,
    mode: "cors",
    cache: "default",
    body: JSON.stringify(filter),
  };

  return fetch(URL_API + path, miInit).then((response) => {
    if (response.status !== 200) {
      return Promise.reject(response.status);
    } else {
      return response.json();
    }
  });
}

export function serviceResourceCreate(body) {
  var myHeaders = new Headers({ "Content-Type": "application/json" });

  const path = "/api/resources";

  var miInit = {
    method: "POST",
    headers: myHeaders,
    mode: "cors",
    cache: "default",
    body: JSON.stringify(body),
  };

  return fetch(URL_API + path, miInit).then((response) => {
    if (response.status !== 201) {
      return Promise.reject(response.status);
    } else {
      return response.json();
    }
  });
}

export function serviceResourceCreateFiles(body) {
  var myHeaders = new Headers({ Authorization: getToken() });

  const path = "/api/resources/files";

  var miInit = {
    method: "POST",
    headers: myHeaders,
    mode: "cors",
    cache: "default",
    body: body,
  };

  return fetch(URL_API + path, miInit).then((response) => {
    if (response.status !== 201) {
      return Promise.reject(response.status);
    } else {
      return response.json();
    }
  });
}

export function serviceResourceMasive(body) {
  var myHeaders = new Headers({ Authorization: getToken() });

  const path = "/api/resources/masive";

  var miInit = {
    method: "POST",
    headers: myHeaders,
    mode: "cors",
    cache: "default",
    body: body,
  };

  return fetch(URL_API + path, miInit).then((response) => {
    if (response.status !== 201) {
      return Promise.reject(response.status);
    } else {
      return response.json();
    }
  });
}

export function serviceResourceEditFiles(body) {
  var myHeaders = new Headers({ Authorization: getToken() });

  const path = "/api/resources/editFiles";

  var miInit = {
    method: "POST",
    headers: myHeaders,
    mode: "cors",
    cache: "default",
    body: body,
  };

  return fetch(URL_API + path, miInit).then((response) => {
    if (response.status !== 201) {
      return Promise.reject(response.status);
    } else {
      return response.json();
    }
  });
}

export function getMyResources() {
  var myHeaders = new Headers({ Authorization: getToken() });

  const path = "/api/resources/getMyResources";

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

export function getAllResources() {
  var myHeaders = new Headers({ Authorization: getToken() });

  const path = "/api/resources/getAllResources";

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

export function deleteResource(id) {
  var myHeaders = new Headers({ Authorization: getToken() });

  const path = "/api/resources/";

  var miInit = {
    method: "DELETE",
    headers: myHeaders,
    mode: "cors",
    cache: "default",
  };

  return fetch(URL_API + path + id, miInit).then((response) => {
    if (response.status !== 200) {
      return Promise.reject(response.status);
    } else {
      return response.json();
    }
  });
}
