//import * as iWantHue from "iwanthue";

/**
 * BACKEND
 */
// Backend server
// export const URL_API = `https://mined.bit-sol.com.co/api`;
// export const URL_API = `https://archihubcert.mineducacion.gov.co/api`;
export const URL_API = `http://localhost:5000`;

/**
 * RESULTS
 */

// 1. RESULTS
// Cantidad de palabras para el título
export const TITLE_SIZE = 8;

// 2. PAGINATION
// Cantidad de resultados por página
export const PAGE_SIZE = 25;
// Cantidad de páginas en la barra de paginación
export const PAGES = 10;
// Límite de resultados de Elastic
export const ELASTIC_LIMIT = 10000;

// 3. RESOURCE_GROUP
export const TREE_DEPTH = 0;

// HABILITAR BUSQUEDAS ADVANZADAS
export const ADVANCED_SEARCH = 1;

// TIMEOUT FOR AXIOS REQUESTS 5 seconds
export const TIMEOUT = 5000;

// DOWNLOAD ACCESS LEVEL
export const DOWNLOAD_ACCESS_LEVEL = 1;

export const METADA_MAP = {
  ident: "Identificador",
  type: "Tipo de recurso",
  additionalDeliveryInformation: "Información adicional sobre la entrega",
  approaches: "Enfoques",
  authors: "Autores",
  collaborators: "Colaboradores",
  conflictActors: "Actores del conflicto",
  content: "Contenido",
  contentNotes: "Notas de contenido",
  deliveringActor: "Actor de la entrega",
  description: "Descripción",
  documentType: "Tipo de documento",
  fileFormat: "Formato de archivo",
  fileSize: "Tamaño de archivo",
  filename: "Nombre de archivo",
  incidentDescription: "Descripción del hecho",
  incidentLocation: "Lugar de los hechos",
  informedConsent: "Consentimiento informado",
  language: "Idioma o lengua",
  macroterritorio: "Macroterritorio",
  offFlag: "offFlag",
  accessLevel: "Nivel de acceso",
  pages: "Número de páginas",
  physicallLocation: "Ubicación física del archivo",
  place: "Lugar",
  population: "Población",
  rights: "Derechos",
  territorio: "Territorio",
  title: "Título",
  topics: "Temas",
  violenceType: "Tipo de Violencia",
  dataProcessingAgreement: "Acuerdo de procesamiento de datos",
  "metadata.missionLevel.humanRights.violenceType": "Tipo de Violencia",
  "metadata.missionLevel.humanRights.incidentLocation": "Lugar de los hechos",
  "metadata.missionLevel.humanRights.conflictActors": "Actores del conflicto",
  "metadata.missionLevel.humanRights.incidentDescription":
    "Descripción del hecho:",
  "metadata.missionLevel.source.territory.macroterritorio.descripcion":
    "Macroterritorio",
  "metadata.missionLevel.source.territory.territorio.descripcion":
    "Macroterritorio",
  "metadata.missionLevel.target.approaches": "Área de interés",
  "metadata.firstLevel.title": "Título",
  "metadata.firstLevel.creator": "Entidad",
  "metadata.firstLevel.description": "Descripción",
  "metadata.firstLevel.date.start": "Fecha Inicial",
  "metadata.firstLevel.date.end": "Fecha Final",
  "metadata.firstLevel.otherTitles": "Otros títulos",
  "metadata.firstLevel.language": "Idioma o lengua",
  "metadata.firstLevel.accessLevel": "Nivel de acceso",
  "metadata.firstLevel.geographicCoverage.geoPoint.lat": "Latitud ",
  "metadata.firstLevel.geographicCoverage.geoPoint.lon": "Longitud ",
  "metadata.firstLevel.geographicCoverage.originalLocation":
    "Cobertura Geográfica ",
  "metadata.firstLevel.creationDate": "Fecha de creación",
  "metadata.firstLevel.temporalCoverage.start": "Cobertura Temporal",
  "metadata.firstLevel.temporalCoverage.end": "Cobertura Temporal",
  "metadata.firstLevel.geographicCoverage.resolvedLocation": "Código DANE",
  "metadata.firstLevel.rights": "Derechos",
  "metadata.firstLevel.format": "Formato",
  "metadata.firstLevel.availabilityDate": "Disponible desde",
  "metadata.firstLevel.extension": "Extensión",
  origin: "Origen",
  "metadata.firstLevel.topics": "Temas",
  "metadata.firstLevel.population": "Población",
  "metadata.firstLevel.mandate": "Mandato",
  "metadata.firstLevel.macroprocess": "Macroproceso",
  "metadata.firstLevel.focus": "Enfoque",
  "metadata.firstLevel.objective": "Objetivo",
  "metadata.firstLevel.documentType": "Tipo de Documento",
  "metadata.firstLevel.documentaryGroup": "Agrupación documental",
  "metadata.firstLevel.notes": "Notas de catalogación",
  "metadata.firstLevel.ISBN": "ISBN",
  "metadata.firstLevel.ISSN": "ISSN",
  "metadata.firstLevel.editorial": "Editorial",
  "metadata.firstLevel.journalSection": "Sección de prensa",
  "metadata.firstLevel.journalPublication": "Publicación de prensa",
  "metadata.firstLevel.background": "Archivo y fondo",
  "metadata.firstLevel.repository": "Archivo, biblioteca o repositorio",
  "metadata.firstLevel.language": "Idioma/Lengua",
  "metadata.firstLevel.occupation": "Ocupaciones",
  "metadata.firstLevel.milestone": "Hitos",
  "metadata.firstLevel.stage": "Etapa",
  "metadata.firstLevel.editionPlace": "Lugar de creación/publicación",
  "metadata.firstLevel.license": "Licencia",
  "metadata.firstLevel.accessrights": "Acceso a la información",
  "metadata.firstLevel.collaborators": "Colaboradores",
  "metadata.firstLevel.authors": "Autor",
  "metadata.firstLevel.url": "Url",
  "metadata.firstLevel.documentalId": "Identificador Gestión Documental",
  "metadata.firstLevel.otherTitles": "Título alternativo",
  "metadata.firstLevel.area": "Área",
  "metadata.firstLevel.sourceLocation": "Ubicación",
  "metadata.firstLevel.fileSize": "Tamaño del archivo",
  "metadata.firstLevel.fileFormat": "Tipo de Formato",
  "metadata.firstLevel.pages": "Total páginas",
  "metadata.firstLevel.resolution": "Resolución del archivo",
  "metadata.firstLevel.duration": "Duración",
  "metadata.firstLevel.encoding": "Codificación",
};

export const METADA_INFO = {
  ident: "Identificador",
  type: "Tipo de recurso",
  additionalDeliveryInformation: "Información adicional sobre la entrega",
  approaches: "Enfoques",
  authors: "Autores",
  collaborators: "Colaboradores",
  conflictActors: "Actores del conflicto",
  contentNotes: "Notas de contenido",
  deliveringActor: "Actor de la entrega",
  description: "Descripción",
  documentType: "Tipo de documento",
  fileFormat: "Formato de archivo",
  fileSize: "Tamaño de archivo",
  filename: "Nombre de archivo",
  incidentDescription: "Descripción del hecho",
  incidentLocation: "Lugar de los hechos",
  informedConsent: "Consentimiento informado",
  language: "Idioma o lengua",
  macroterritorio: "Macroterritorio",
  offFlag: "offFlag",
  pages: "Número de páginas",
  physicallLocation: "Ubicación física del archivo",
  place: "Lugar",
  population: "Población",
  rights: "Derechos",
  territorio: "Territorio",
  title: "Título",
  topics: "Temas",
  violenceType: "Tipo de Violencia",
  dataProcessingAgreement: "Acuerdo de procesamiento de datos",
  "metadata.missionLevel.humanRights.violenceType": "Tipo de Violencia",
  "metadata.missionLevel.humanRights.incidentLocation": "Lugar de los hechos",
  "metadata.missionLevel.humanRights.conflictActors": "Actores del conflicto",
  "metadata.missionLevel.humanRights.incidentDescription":
    "Descripción del hecho:",
  "metadata.missionLevel.source.territory.macroterritorio.descripcion":
    "Macroterritorio",
  "metadata.missionLevel.source.territory.territorio.descripcion":
    "Macroterritorio",
  "metadata.missionLevel.target.approaches": "Área de interés",
  "metadata.firstLevel.title": "Título",
  "metadata.firstLevel.creator": "Entidad",
  "metadata.firstLevel.description": "Descripción",
  "metadata.firstLevel.date.start": "Fecha Inicial",
  "metadata.firstLevel.date.end": "Fecha Final",
  "metadata.firstLevel.otherTitles": "Otros títulos",
  "metadata.firstLevel.language": "Idioma o lengua",
  "metadata.firstLevel.geographicCoverage.geoPoint.lat": "Latitud ",
  "metadata.firstLevel.geographicCoverage.geoPoint.lon": "Longitud ",
  "metadata.firstLevel.geographicCoverage.originalLocation":
    "Cobertura Geográfica ",
  "metadata.firstLevel.temporalCoverage.start": "Cobertura Temporal",
  "metadata.firstLevel.temporalCoverage.end": "Cobertura Temporal",
  "metadata.firstLevel.geographicCoverage.resolvedLocation": "Código DANE",
  "metadata.firstLevel.rights": "Derechos",
  "metadata.firstLevel.format": "Formato",
  "metadata.firstLevel.availabilityDate": "Disponible desde",
  "metadata.firstLevel.extension": "Extensión",
  "metadata.firstLevel.topics": "Temas",
  "metadata.firstLevel.population": "Población",
  "metadata.firstLevel.mandate": "Mandato",
  "metadata.firstLevel.macroprocess": "Macroproceso",
  "metadata.firstLevel.focus": "Enfoque",
  "metadata.firstLevel.objective": "Objetivo",
  "metadata.firstLevel.documentType": "Tipo de Documento",
  "metadata.firstLevel.documentaryGroup": "Agrupación documental",
  "metadata.firstLevel.ISBN": "ISBN",
  "metadata.firstLevel.ISSN": "ISSN",
  "metadata.firstLevel.editorial": "Editorial",
  "metadata.firstLevel.journalSection": "Sección de prensa",
  "metadata.firstLevel.journalPublication": "Publicación de prensa",
  "metadata.firstLevel.background": "Archivo y fondo",
  "metadata.firstLevel.repository": "Archivo, biblioteca o repositorio",
  "metadata.firstLevel.language": "Idioma/Lengua",
  "metadata.firstLevel.occupation": "Ocupaciones",
  "metadata.firstLevel.milestone": "Hitos",
  "metadata.firstLevel.stage": "Etapa",
  "metadata.firstLevel.editionPlace": "Lugar de creación/publicación",
  "metadata.firstLevel.license": "Licencia",
  "metadata.firstLevel.accessrights": "Acceso a la información",
  "metadata.firstLevel.collaborators": "Colaboradores",
  "metadata.firstLevel.authors": "Autor",
  "metadata.firstLevel.url": "Url",
  "metadata.firstLevel.documentalId": "Identificador Gestión Documental",
  "metadata.firstLevel.otherTitles": "Título alternativo",
  "metadata.firstLevel.area": "Área",
  "metadata.firstLevel.sourceLocation": "Ubicación",
  "metadata.firstLevel.fileSize": "Tamaño del archivo",
  "metadata.firstLevel.fileFormat": "Tipo de Formato",
  "metadata.firstLevel.pages": "Total páginas",
  "metadata.firstLevel.resolution": "Resolución del archivo",
  "metadata.firstLevel.duration": "Duración",
  "metadata.firstLevel.encoding": "Codificación",
};
