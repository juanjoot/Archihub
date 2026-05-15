export const FIELDS_MAP = {
  topics: {
    label: "Temas",
    query: "firstLevel.topics",
    description: (
      <>
        Los <b>"temas"</b> son palabras o frases cortas que describen el
        contenido de un recurso de la base de datos permitiendo encontrar
        información relevante en caso de que se tenga claro el asunto de
        interés, una vez se obtengan los primeros resultados temáticos, la
        plataforma de búsqueda le permitirá filtrar aún más la información
        resultante con otros descriptores de contenido, tiempo o espacio.
      </>
    ),
  },
  actors: {
    label: "Actores del conflicto",
    query: "missionLevel.humanRights.conflictActors",
    description: (
      <>
        Los <b>"actores armados"</b> son un campo de descripción de contenido de
        un recurso de la base de datos que señala la participación de un actor
        en el hecho registrado en el recurso, sea actor legal o ilegal. Una vez
        se obtengan los primeros resultados temáticos, la plataforma de búsqueda
        le permitirá filtrar aún más la información resultante con otros
        descriptores de contenido, tiempo o espacio.
      </>
    ),
  },
  population: {
    label: "Población",
    query: "firstLevel.population",
    description: (
      <>
        Las <b>"poblaciones"</b> son un campo de descripción de contenido de un
        recurso de la base de datos que señala la participación de un segmento
        de la población que podría ser indigena, campesina, afrocolombiana, rom,
        raizal entre otras y que tienen participación en el recurso descrito.
        Una vez se obtengan los primeros resultados temáticos, la plataforma de
        búsqueda le permitirá filtrar aún más la información resultante con
        otros descriptores de contenido, tiempo o espacio.
      </>
    ),
  },
  violenceType: {
    label: "Tipo de Violencia",
    query: "missionLevel.humanRights.violenceType",
    description: (
      <>
        Los <b>"tipos de violencia"</b> son un campo de descripción de contenido
        de un recurso de la base de datos que señala los hechos victimizantes
        que se mencionan en el recurso descrito, entre los que se encuentran
        violencia de género. Una vez se obtengan los primeros resultados
        temáticos, la plataforma de búsqueda le permitirá filtrar aún más la
        información resultante con otros descriptores de contenido, tiempo o
        espacio.
      </>
    ),
  },
};
