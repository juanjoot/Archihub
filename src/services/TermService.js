import axios from "axios";

import { URL_API, /*PAGE_SIZE,*/ TIMEOUT } from "../config/const";

export function list(search, from) {
  const page_size = 1000; //PAGE_SIZE

  search = search ? "q=" + search : "";
  const path =
    "/api/term/findTable?" +
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

export function get(id) {
  console.log("ingreso GET");

  const path = "/api/term/findOne/" + id;
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

export function diccionarioTermino(id) {
  const path = "/api/term/diccionarioTermino/" + id;
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
  const path = "/api/term/diccionarioAbcFind/" + like;
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
  const path = "/api/term/diccionarioAbc/" + like;
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
  const path = "/api/term/diccionarioLike/" + like;
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
  const headers = {};

  return axios
    .post(`${URL_API}/api/term/createbuscador/`, semantic, {
      headers: headers,
      // timeout: TIMEOUT,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}

export function updateRecord(id, semantic) {
  const path = "/api/term/updateRecord/" + id;
  const headers = {};

  return axios
    .put(
      URL_API + path,
      { subtitle: semantic },
      {
        headers: headers,
        timeout: TIMEOUT,
      },
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}

export function update(id, semantic) {
  const path = "/api/term/updatebuscador/" + id;
  const headers = {};

  return axios
    .put(URL_API + path, semantic, {
      headers: headers,
      // timeout: TIMEOUT,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}

export function cargaraudio(id, semantic) {
  const path = "/api/term/cargaraudio/" + id;
  const headers = {};

  return axios
    .post(URL_API + path, semantic, {
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

export function audio(data) {
  var myHeaders = new Headers({ "Content-Type": "application/json" });

  const path = "/api/term/audio/";

  var miInit = {
    method: "POST",
    headers: myHeaders,
    mode: "cors",
    cache: "default",
    body: JSON.stringify({ audio: data }),
  };

  return fetch(URL_API + path, miInit).then((response) => {
    if (response.status !== 201) {
      return Promise.reject(response.status);
    } else {
      return response.blob();
    }
  });
}

export function audioRecord(data) {
  var myHeaders = new Headers({ "Content-Type": "application/json" });

  const path = "/api/term/audioRecord/";

  var miInit = {
    method: "POST",
    headers: myHeaders,
    mode: "cors",
    cache: "default",
    body: JSON.stringify({ record: data }),
  };

  return fetch(URL_API + path, miInit).then((response) => {
    if (response.status !== 201) {
      return Promise.reject(response.status);
    } else {
      return response.blob();
    }
  });
}

export function findByidRecord(id) {
  const path = "/api/term/findByidRecord/" + id;
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
