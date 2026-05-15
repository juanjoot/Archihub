import { URL_API } from "../config/const";

export function serviceImage(filename) {
  const path = "/api/records/image/" + filename;

  var miInit = {
    method: "GET",
    mode: "cors",
    cache: "default",
  };

  return fetch(URL_API + path, miInit).then((response) => {
    if (response.status !== 200) {
      return Promise.reject(response.status);
    } else {
      return response.blob();
    }
  });
}

export function serviceImageResize(id, size = "large") {
  let path = "/resizes/" + id;

  size !== "large" ? (path += "_" + size) : (path += "_large");

  return URL_API + path + '.jpg'

  // var miInit = {
  //   method: "GET",
  //   mode: "cors",
  //   cache: "default",
  // };

  // return fetch(URL_API + path, miInit).then((response) => {
  //   if (response.status !== 200) {
  //     return Promise.reject(response.status);
  //   } else {
  //     return response.blob();
  //   }
  // });
}

export function serviceStream(id, format, support) {
  let path = URL_API
  console.log(support)
  if(support === 'Video') path += '/export_video'
  else if(support === 'Audio') path += '/export_audio'
  else if(support === 'Documento') path += '/documents'

  path += '/' + id + '.' + format

  console.log(path)
  return path;
}

export function serviceContentDocumentByIdent(ident) {
  const path = "/api/search-museo/record/content/document/" + ident;

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

export function serviceFile(ident) {
  let path = URL_API + "/documents/" + ident + '.pdf';

  return path

  // const path = "/api/records/file/" + ident;

  // var miInit = {
  //   method: "GET",
  //   mode: "cors",
  //   cache: "default",
  // };

  // return fetch(URL_API + path, miInit).then((response) => {
  //   if (response.status !== 200) {
  //     return Promise.reject(response.status);
  //   } else {
  //     return response.blob();
  //   }
  // });
}

export function serviceMicrodataFile(ident, type) {
  let path = URL_API + "/documents/" + ident + '_min.csv';

  return path

  // const path = "/api/records/microdatafile/" + ident + "/" + type;

  // var miInit = {
  //   method: "GET",
  //   mode: "cors",
  //   cache: "default",
  // };

  // return fetch(URL_API + path, miInit).then((response) => {
  //   if (response.status !== 200) {
  //     return Promise.reject(response.status);
  //   } else {
  //     return response.blob();
  //   }
  // });
}

export function serviceZipFile(data) {
  var myHeaders = new Headers({ "Content-Type": "application/json" });

  const path = "/api/records/zip-file";

  var miInit = {
    method: "POST",
    mode: "cors",
    cache: "default",
    body: JSON.stringify(data),
  };

  return fetch(URL_API + path, miInit).then((response) => {
    if (response.status !== 201) {
      return Promise.reject(response.status);
    } else {
      return response.blob();
    }
  });
}

export function servicePreProcess(ident) {
  const path = "/api/records/pre_process/" + ident;

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
