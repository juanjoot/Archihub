import { useState, useEffect } from "react";
import * as SearchService from "../../../services/ArchihubService"

import Lottie from "react-lottie";
import animationData from "../../../assets/loading_cev.json";
import * as Scroll from 'react-scroll';
import { useSearchParams } from "react-router-dom";


import { Box, Grid, Input } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import Typography from "@material-ui/core/Typography";
import TarjetaDocumento from "../TarjetaDocumento";
import { makeStyles } from "@material-ui/core";
import noresultados from "../../assets/imgs/noresultados.jpg";
import { useTranslation } from "react-i18next";

const scroll = Scroll.animateScroll;

const useStyles = makeStyles((theme) => ({
  paginationRoot: {
    display: "flex",
    justifyContent: "end",
    alignItems: "center",
    fontSize: 15,

    "& .pagination-input": {
      backgroundColor: '#6E3092',
      color: '#fff',
      paddingLeft: 20,
      paddingRight: 20,
      borderRadius: 20,
      marginRight: 10,
      "& input": {
        textAlign: "center",
        fontSize: 15,
        color: '#fff',
        width: "80px",
        backgroundColor: 'rgba(255,255,255,.2)',
        margin: 5,
        borderRadius: 5,
      }
    },
    "& > *": {
      display: "flex",
      justifyContent: "flex-end",
    },
    "& button": {
      boxShadow:
        "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",
    },
  },
  contenedorVacio: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  text: {
    color: theme.palette.primary.main,
    textAlign: "center",
    fontSize: "17px",
    width: "100%",
    fontWeight: 700,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(8),
  },
  loading: {
    width: "100%",
    height: "70vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  imageBox: {},
}));

const ResultadosBusqueda = (props) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [resultados, setResultados] = useState([]);
  const [total, setTotal] = useState(0);
  const [temporal, setTemporal] = useState(false);
  const [controller, setController] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const [t, i18n] = useTranslation("common");
  const view = props.view ? props.view : "rows";

  const size = 20;
  let count = Math.floor(total / size);
  if (total % size > 0) count = count + 1;

  useEffect(() => {
    let k = searchParams.get("keyword") ? searchParams.get("keyword") : "";
    let fiters_ = {
      keyword: k,
      date_filters: [],
      location_filters: []
    }

    if (props.temporalRange) {
      fiters_.date_filters.push({
        destiny: 'metadata.firstLevel.temporalCoverage.start',
        range: props.temporalRange.split('-').map((value) => parseInt(value.trim(), 10))
      })
    }
    if (props.dpto) {
      fiters_.location_filters.push({
        destiny: 'metadata.firstLevel.geographicdescriptors',
        value: [
          {
            level_0: { ident: "CO", name: "Colombia" },
            level_1: { ident: props.dpto.divipola, name: props.dpto.nombre }
          }
        ]
      })
    }
    if (props.padre) {
      fiters_.parents = props.padre;
    }
    if (props.colId) {
      fiters_.parents = {id: props.colId};
    }
    fiters_.page = props.page - 1;
    busqueda(fiters_)
  }, [searchParams, props.temporalRange, props.dpto, props.padre, props.page]);

  const busqueda = (f) => {
    setLoading(true);
    props.setTotal(null);
    setResultados([])
    scroll.scrollToTop({
      duration: 0
    })

    let filters = {
      post_type: ['unidad-documental'],
      data_transformation: 'archihub_mined',
      activeColumns: [
        {
          destiny: 'metadata.firstLevel.title'
        },
        {
          destiny: 'metadata.firstLevel.attributedtitle'
        },
        {
          destiny: 'parents'
        }
      ],
      ...f
    }

    SearchService.search(filters).then((data) => {
      setLoading(false);
      setResultados(data.resources);
      setTotal(data.total || 0);

    }).catch(e => {
      setLoading(false);
    })
  };

  return (
    <>
      {resultados !== undefined && (
        <>
          {(!loading || !props.loading) && resultados.length > 0 ? (
            <>
              {/* <Box mt={2} mb={2} className={classes.paginationRoot}>
                <Pagination
                  page={props.page}
                  count={count}
                  color="primary"
                  onChange={(event, value) => {
                    props.setPage(value);
                  }}
                />
              </Box> */}
              <Grid container spacing={3} mt={4}>
                {resultados.map((r, i) => {
                  if (r) {
                    return (
                      <Grid
                        item
                        xs={12}
                        md={view === "rows" ? 12 : 6}
                        lg={view === "rows" ? 12 : 3}
                      >
                        <TarjetaDocumento
                          place={props.place}
                          index={`${i}-${r.ident}`}
                          key={`${i}-${r.ident}`}
                          id={r.id}
                          name={r.metadata.firstLevel.title}
                          description={
                            r.metadata.firstLevel.description
                          }
                          url={r.metadata.firstLevel.url}
                          fondo={r.type}
                          records={r.records}
                          ident={r.ident}
                          simpleident={r.metadata.simpleident}
                          slug={r.metadata.slug}
                          geo={
                            r.metadata.firstLevel
                              .geographicCoverage
                          }
                          time={
                            r.metadata.firstLevel
                              .temporalCoverage
                          }
                          actualizarBusqueda={props.actualizar}
                          resource={r}
                          tipo={props.tipo}
                          view={props.view}
                          textSearchToBack={props.keyword}
                        />
                      </Grid>
                    );
                  }
                })}
              </Grid>
              <Box mt={4} mb={8} className={classes.paginationRoot}>
                <Box
                  className="pagination-input"
                >
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const value = e.target[0].value;
                      if (value > 0 && value <= count) {
                        props.setPage(parseInt(value));
                      }
                    }}
                  >
                    Ir a la página:
                    <Input
                      defaultValue={props.page}
                      type="number"
                    />
                  </form>
                </Box>
                <Pagination
                  page={props.page}
                  count={count}
                  key={props.page + count}
                  siblingCount={1} boundaryCount={2}
                  color="primary"
                  onChange={(event, value) => {
                    props.setPage(value);
                  }}
                />
              </Box>
            </>
          ) : (
            <>
              {(loading || props.loading) && (
                <div className={classes.loading}>
                  <Box mt={4} mb={4}>
                    <Lottie
                      height={150}
                      width={150}
                      options={{
                        loop: true,
                        autoplay: true,
                        animationData: animationData,
                        rendererSettings: {
                          preserveAspectRatio: "xMidYMid slice",
                        },
                      }}
                    />
                  </Box>
                </div>
              )}
              {resultados.length === 0 && (
                <>
                  {!loading ? (
                    <Box className={classes.contenedorVacio}>
                      <Box
                        className={classes.imageBox}
                        component="img"
                        sx={{
                          height: "50vh",
                          width: "auto",
                          maxHeight: "500px",
                        }}
                        alt="No hay resultados"
                        src={noresultados}
                      />
                      <Typography className={classes.text}>
                        {t("explora.sinResultados")}
                      </Typography>
                    </Box>
                  ) : null}
                </>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default ResultadosBusqueda;
