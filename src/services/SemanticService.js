import axios from "axios";

import { URL_API, /*PAGE_SIZE,*/ TIMEOUT } from "../config/const";

export function list(search, from) {
  const page_size = 1000; //PAGE_SIZE

  search = search ? "q=" + search : "";
  const path =
    "/api/semantic/findTable?" +
    search +
    "&skip=" +
    (from - 1) * page_size +
    "&limit=" +
    page_size;

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

export function terms() {
  var miInit = {
    method: "GET",
    mode: "cors",
    cache: "default",
  };

  return fetch(`${URL_API}/api/term/relations`, miInit).then(function (
    response,
  ) {
    if (response.status !== 200) {
      return Promise.reject(response.status);
    } else {
      return response.json();
    }
  });
}

export function semantics(inputValue) {
  var miInit = {
    method: "GET",
    mode: "cors",
    cache: "default",
  };

  return fetch(`${URL_API}/api/semantic/relations/${inputValue}`, miInit).then(
    function (response) {
      if (response.status !== 200) {
        return Promise.reject(response.status);
      } else {
        return response.json();
      }
    },
  );
}

export function selectsemantic() {
  var miInit = {
    method: "GET",
    mode: "cors",
    cache: "default",
  };

  return fetch(`${URL_API}/api/semantic/selectsemantic`, miInit).then(function (
    response,
  ) {
    if (response.status !== 200) {
      return Promise.reject(response.status);
    } else {
      return response.json();
    }
  });
}

export function records(id) {
  var miInit = {
    method: "GET",
    mode: "cors",
    cache: "default",
  };

  const path = "/api/semantic/records/" + id;

  return fetch(URL_API + path, miInit).then(function (response) {
    if (response.status !== 200) {
      return Promise.reject(response.status);
    } else {
      return response.json();
    }
  });
}

export function get(id) {
  const path = "/api/semantic/findOne/" + id;
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

export function diccionarioAbcFind(like) {
  const path = "/api/semantic/diccionarioAbcFind/" + like;
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

export function diccionarioAbc(like) {
  const path = "/api/semantic/diccionarioAbc/" + like;
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

export function diccionarioLike(like) {
  const path = "/api/semantic/diccionarioLike/" + like;
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

export function getCatalogadores() {
  const path = "/api/users/catalogador";

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

export function create(semantic) {
  return axios
    .post(`${URL_API}/api/semantic/createbuscador/`, semantic, {
      timeout: TIMEOUT,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}

export function update(id, semantic) {
  const path = "/api/semantic/updatebuscador/" + id;

  return axios
    .put(URL_API + path, semantic, {
      // timeout: TIMEOUT,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}

export function resources(inputValue) {
  var miInit = {
    method: "GET",
    mode: "cors",
    cache: "default",
  };

  return fetch(`${URL_API}/api/semantic/resources/${inputValue}`, miInit).then(
    function (response) {
      if (response.status !== 200) {
        return Promise.reject(response.status);
      } else {
        return response.json();
      }
    },
  );
}

export function findByResorce(id) {
  const path = "/api/semantic/findByResorce/" + id;
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
