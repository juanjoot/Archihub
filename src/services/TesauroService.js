import { TIMEOUT, URL_API, PAGE_SIZE } from "../config/const";
// import { getToken } from "../crud/auth.crud";
import axios from "axios";

export function getTermsByLetter(letter) {
  const headers = {};

  return axios
    .get(`${URL_API}/api/thesaurus/letter/${letter}`, {
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

export function getTermById(id) {
  const headers = {};

  return axios
    .get(`${URL_API}/api/thesaurus/id/hierarchy/${id}`, {
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

export function searchByWord(word) {
  const headers = {};

  return axios
    .get(`${URL_API}/api/thesaurus/text/${word}`, {
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

