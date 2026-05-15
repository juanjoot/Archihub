import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import Box from "@material-ui/core/Box";

import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import TipoRecurso from "./ColumnaFiltros/TipoRecurso";
import Ubicacion from "./ColumnaFiltros/Ubicacion";
import Temporal from "./ColumnaFiltros/Temporal";
import Metadatos from "./ColumnaFiltros/Metadatos"
import OriginSelect from "./ColumnaFiltros/OriginSelect";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    paddingTop: theme.spacing(2),
    justifyContent: 'center'
  },
  filtros: {
    width: 400,
  },
  contenido: {
    width: "100%",
    paddingRight: theme.spacing(2),
    [theme.breakpoints.down("md")]: {
      paddingRight: 0
    }
  },
}));

const ColumnaFiltros = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  const [valores, setValores] = useState(null)

  useEffect(() => {
    if (props.buckets) {
      let valores = props.buckets.tipo.buckets.map((b) => {
        return {
          key: b.key,
          doc_count: b.doc_count,
        }
      })
      setValores(valores)
    }
  }, [props.buckets])

  return (
    <Box className={classes.container}>
      {matches &&
        <>
          {!props.filtros &&
            <Box className={classes.contenido}>{props.children}</Box>
          }

          {props.filtros &&
            <Box className={classes.filtros}>
              <TipoRecurso padre={props.padre} setPadre={props.setPadre} />

              <Temporal
                temporalRange={props.temporalRange}
                setTemporalRange={props.setTemporalRange}
              />
              <Ubicacion setDpto={props.setDpto} dpto={props.dpto} />

              {/* <Metadatos
                tipoViolencia={props.tipoViolencia}
                tipoActores={props.tipoActores}
                setTipoViolencia={props.setTipoViolencia}
                setTipoActores={props.setTipoActores}
              /> */}
            </Box>
          }

        </>
      }

      {!matches &&
        <>
          <Box className={classes.contenido}>{props.children}</Box>
          <Box className={classes.filtros}>

            {/* {props.fondos.length === 0 &&
              <OriginSelect
                origin={props.origin}
                setOrigin={props.setOrigin}
              />
            } */}


            {props.origin === 'recursos' &&
              <>
                {props.place === 'explora' &&
                  <TipoRecurso padre={props.padre} setPadre={props.setPadre} />
                }
                <Ubicacion setDpto={props.setDpto} dpto={props.dpto} />

                <Temporal
                  temporalRange={props.temporalRange}
                  setTemporalRange={props.setTemporalRange}
                />

                {/* <Metadatos
                  tipoViolencia={props.tipoViolencia}
                  tipoActores={props.tipoActores}
                  setTipoViolencia={props.setTipoViolencia}
                  setTipoActores={props.setTipoActores}
                /> */}
              </>
            }


          </Box>
        </>
      }

    </Box>
  );
};

export default ColumnaFiltros;
