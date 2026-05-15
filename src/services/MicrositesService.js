import axios from "axios";

import { URL_API, /*PAGE_SIZE,*/ TIMEOUT } from "../config/const";

export function list(search, from) {
  const page_size = 1000; //PAGE_SIZE

  search = search ? "q=" + search : "";
  const path =
    "/api/admin/microsites?" +
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

export function get(id) {
  const path = "/api/admin/microsites/" + id;

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
export function getBySection(section) {
  const path = "/api/admin/microsites/section/" + section;

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

// export function getCatalogadores() {

//   const path = "/api/users/catalogador";

//   var miInit = {
//     method: "GET",
//     mode: "cors",
//     cache: "default"
//   };

//   return fetch(URL_API + path, miInit).then(function(response) {
//     if(response.status !== 200){
//       return Promise.reject(response.status);
//     }
//     else{
//       return response.json();
//     }
//   });
// }

export function update(id, microsite) {
  const path = "/api/admin/microsites/" + id;
  return axios
    .put(URL_API + path, microsite, {})
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}

export function create(microsite) {
  const path = "/api/admin/microsites/";

  return axios
    .post(URL_API + path, microsite, {})
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}

export function eliminar(id) {
  const path = "/api/admin/microsites/" + id;

  return axios
    .delete(URL_API + path, {})
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}

export function send_element(id, form) {
  const path = "/api/admin/microsites/element/" + id;

  return axios
    .post(URL_API + path, form, {})
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}

export function findMicrosite(form) {
  const path = "/api/admin/microsites/find";

  return axios
    .post(URL_API + path, form, {})
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}

export async function findByName(name) {
  const path = "/api/admin/microsites/findByName";

  try {
    const res = await axios.post(URL_API + path, { name });
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function findBySection(section) {
  const path = "/api/admin/microsites/findBySection";

  try {
    const res = await axios.post(URL_API + path, { section });
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
}
