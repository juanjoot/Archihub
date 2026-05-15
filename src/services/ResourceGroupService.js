import { URL_API } from "../config/const";

export function serviceListFirstLevel(initial = null) {
  const path = "/api/resource-groups/first-level-cache";

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

export function serviceListFirstLevelLazy(initial = "") {
  let path = "/api/resource-groups/lazy?head=0&path=all";

  if (initial !== "") path = "/api/resource-groups/lazy?head=1&path=" + initial;

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

export function getAllChildren(ident) {
  let path = "/api/resource-groups/get-all-children?ident=" + ident;

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

export function getMetadataRG(id) {
  const path = "/api/resource-groups/metadata/" + id;

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

export function getMetadataRGBulk(id) {
  const path = "/api/resource-groups/metadata-bulk/" + id;

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

export function updateResourceGroupMetadata(body) {
  const path = "/api/resource-groups/update-metadata";

  var miInit = {
    method: "POST",
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

export function toMoveResourceGroup(body) {
  const path = "/api/resource-groups/logic-move";

  var miInit = {
    method: "POST",
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

export function updateResources(body) {
  const path = "/api/resource-groups/update-resources";

  var miInit = {
    method: "POST",
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

export function deleteResourceGroup(id) {
  const path = "/api/resource-groups/" + id;

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

export function newResourceGroup(body) {
  const path = "/api/resource-groups";

  var miInit = {
    method: "POST",
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

export const url = (node) => {
  if (node.id === "#") {
    const id =
      window.location.pathname.split("/")[
        window.location.pathname.split("/").length - 1
      ];
    return URL_API + "/api/resource-groups/lazy?head=0&path=" + id;
  } else {
    return URL_API + "/api/resource-groups/lazy?head=1&path=" + node.id;
  }
};

export function serviceListInternal(initial = null) {
  const path = "/api/resource-groups/internal";

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

export function serviceDetail(id) {
  const path = "/api/resource-groups/" + id;

  var miInit = {
    method: "GET",
    mode: "cors",
    cache: "default",
  };

  return fetch(URL_API + path, miInit).then((response) => {
    if (![200, 304].includes(response.status)) {
      return Promise.reject(response.status);
    } else {
      return response.json();
    }
  });
}
