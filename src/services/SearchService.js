import { URL_API, PAGE_SIZE } from "../config/const";

export function serviceKeyword(search, from, filters = "", showTags = 0) {
  var myHeaders = new Headers({ "Content-Type": "application/json" });
  search = search ? "q=" + encodeURIComponent(search) : "";
  const path =
    "/api/search?" +
    search +
    "&from=" +
    (from - 1) * PAGE_SIZE +
    "&size=" +
    PAGE_SIZE +
    "&showTags=" +
    showTags;

  var data = {
    filters: filters,
  };

  var miInit = {
    method: "POST",
    headers: myHeaders,
    mode: "cors",
    cache: "default",
    body: JSON.stringify(data),
  };

  return fetch(URL_API + path, miInit).then(function (response) {
    if (response.status !== 200) {
      return Promise.reject(response.status);
    } else {
      return response.json();
    }
  });
}

export function serviceKeywordMuseo(search, from, filters = {}, size = 10) {
  var myHeaders = new Headers({ "Content-Type": "application/json" });

  var data = {
    user: 1,
    source: "museo",
    q: search,
    from: from,
    size: size,
  };

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

  const path = "/api/search";

  return fetch(URL_API + path, miInit).then(function (response) {
    if (response.status !== 200) {
      return Promise.reject(response.status);
    } else {
      return response.json();
    }
  });
}

export function serviceSingleMuseo(ident) {
  var myHeaders = new Headers({ "Content-Type": "application/json" });

  var miInit = {
    method: "GET",
    headers: myHeaders,
    mode: "cors",
    cache: "default",
  };

  const path = "/api/search/detail/" + ident;

  return fetch(URL_API + path, miInit).then(function (response) {
    if (response.status !== 200) {
      return Promise.reject(response.status);
    } else {
      return response.json();
    }
  });
}

export function serviceSingleMuseoIdent(ident) {
  var myHeaders = new Headers({ "Content-Type": "application/json" });

  var miInit = {
    method: "GET",
    headers: myHeaders,
    mode: "cors",
    cache: "default",
  };

  const path = "/api/search/detail/ident/" + ident;

  return fetch(URL_API + path, miInit).then(function (response) {
    if (response.status !== 200) {
      return Promise.reject(response.status);
    } else {
      return response.json();
    }
  });
}

export function serviceSingleMuseoSimpleIdent(simpleIdent) {
  var myHeaders = new Headers({ "Content-Type": "application/json" });

  var miInit = {
    method: "GET",
    headers: myHeaders,
    mode: "cors",
    cache: "default",
  };

  const path = "/api/search/detail/simpleident/" + simpleIdent;

  return fetch(URL_API + path, miInit).then(function (response) {
    if (response.status !== 200) {
      return Promise.reject(response.status);
    } else {
      return response.json();
    }
  });
}
export function serviceSingleMuseoSlug(slug) {
  var myHeaders = new Headers({ "Content-Type": "application/json" });

  var miInit = {
    method: "GET",
    headers: myHeaders,
    mode: "cors",
    cache: "default",
  };

  const path = "/api/search/detail/archivo/" + slug;

  return fetch(URL_API + path, miInit).then(function (response) {
    if (response.status !== 200) {
      return Promise.reject(response.status);
    } else {
      return response.json();
    }
  });
}

export function serviceCollectionMuseo(params) {
  var myHeaders = new Headers({ "Content-Type": "application/json" });
  var data = {};

  if(params.size) data.size = params.size
  if(params.id) data.id = params.id
  if(params.random) data.random = params.random


  var miInit = {
    method: "POST",
    headers: myHeaders,
    mode: "cors",
    cache: "default",
    body: JSON.stringify(data),
  };

  const path = "/api/collection/find/searchCollections";

  return fetch(URL_API + path, miInit).then(function (response) {
    if (response.status !== 201) {
      return Promise.reject(response.status);
    } else {
      return response.json();
    }
  });
}

export function searchSuggestMuseo(str) {
  var myHeaders = new Headers({ "Content-Type": "application/json" });
  var data = {
    q: str,
  };

  var miInit = {
    method: "POST",
    headers: myHeaders,
    mode: "cors",
    cache: "default",
    body: JSON.stringify(data),
  };

  const path = "/api/search/suggestmuseo";

  return fetch(URL_API + path, miInit).then(function (response) {
    if (response.status !== 201) {
      return Promise.reject(response.status);
    } else {
      return response.json();
    }
  });
}

export function serviceAdd(data) {
  var myHeaders = new Headers({ "Content-Type": "application/json" });

  const path = "/api/search/search-history";

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

export function serviceDelete(id) {
  var myHeaders = new Headers({ "Content-Type": "application/json" });

  const path = "/api/search/search-history/" + id;

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
      return response.json();
    }
  });
}

export function serviceLoadSaved(userid, filters) {
  var myHeaders = new Headers({ "Content-Type": "application/json" });

  const path = "/api/search/search-history/" + userid;

  var miInit = {
    method: "POST",
    headers: myHeaders,
    mode: "cors",
    cache: "default",
    body: JSON.stringify(filters),
  };

  return fetch(URL_API + path, miInit).then((response) => {
    if (response.status !== 201) {
      return Promise.reject(response.status);
    } else {
      return response.json();
    }
  });
}

export function list(id) {
  const path = "/api/search/get-history/" + id;

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

export function getResourceHistory(id) {
  const path = "/api/search/get-view/" + id;

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
