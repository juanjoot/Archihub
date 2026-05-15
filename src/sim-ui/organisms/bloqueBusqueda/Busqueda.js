import { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core";

import { useSearchParams } from "react-router-dom";
import ColumnaFiltros from "./ColumnaFiltros";
import TopFilters from "./TopFilters";
import Histogram from "./Histogram";
import ResultadosBusqueda from "./ResultadosBusqueda";
import ResultadosBusquedaGaleria from "./ResultadosBusquedaGaleria";
import ResultadosBusquedaColecciones from "./ResultadosBusquedaColecciones";
import ResultadosBusquedaDocumento from "./ResultadosBusquedaDocumento";
import ResultadosBusquedaMultimedia from "./ResultadosBusquedaMultimedia";
import MapaFilter from "./MapaFilter";
import MetadataBubbles from "./MetadataBubbles";
import { useTranslation } from "react-i18next";

import * as ResourceGroupService from "../../../services/ResourceGroupService";
import { connect } from "react-redux";
import * as museo from "../../../store/ducks/museo.duck";

const useStyles = makeStyles((theme) => ({
  tabContainer: {
    borderBottom: "1px solid " + theme.palette.primary.main,
    display: "flex",
    justifyContent: "flex-end",
    height: 44,
    alignItems: "center",
  },
  grow: {
    flexGrow: 1,
  },
  mobileHide: {
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  icon: {
    fontSize: "2em",
    marginRight: 10,
    cursor: "pointer",
  },
  contenidoBuscador: {
    paddingLeft: 5,
    paddingRight: 5,
  }
}));

const Busqueda = (props) => {
  const classes = useStyles();
  const [searchParams, setSearchParams] = useSearchParams();
  const [t] = useTranslation("common");
  const [keyword, setKeyword] = useState("");
  const [origin, setOrigin] = useState(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(null);
  const [dpto, setDpto] = useState(null);
  const [temporalRange, setTemporalRange] = useState(null);
  const [tab, setTab] = useState(0);
  const [fondo, setFondo] = useState(null);
  const [fondos, setFondos] = useState([]);
  const [filtros, setFiltros] = useState(false);
  const [tipo, setTipo] = useState(props.tipo);
  const [tipoViolencia, setTipoViolencia] = useState(null);
  const [tipoActores, setTipoActores] = useState(null);
  const [loading, setLoading] = useState(false);
  const [buckets, setBuckets] = useState(null);
  const [children, setChildren] = useState(false);
  const [padre, setPadre] = useState(null);

  const setNewKeyword = (k, clear = true) => {

    let timer1 = setTimeout(() => {
      // if(clear) setPage(1);
      setKeyword(k);
    }, 200);
    return () => {
      clearTimeout(timer1);
    };
  }

  // const setNewFondo = (fondo, add = true) => {
  //   setLoading(true);
  //   if (add) {
  //     ResourceGroupService.getAllChildren(fondo.id).then((data) => {
  //       let f_ = [...fondos, ...data, fondo];
  //       setFondos(f_);
  //       setLoading(false);
  //     });
  //     // setFondo(fondo)
  //   } else {
  //     ResourceGroupService.getAllChildren(fondo.id).then((data) => {
  //       const listado_remove = [...data, fondo].map((r) => r.id);
  //       let f_ = fondos.filter((f) => {
  //         if (f) return !listado_remove.includes(f.id);
  //       });
  //       setFondos(f_);
  //       setLoading(false);
  //     });
  //   }
  // };

  const setNewTipo = (k) => {
    // setPage(1);
    console.log(tipo)
    setTipo(k);
  };

  const setNewOrigin = (k) => {
    setPage(1)
    setTab(0)
    setOrigin(k)
  }

  const actualizar = () => {
    if (props.actualizarBusqueda) props.actualizarBusqueda();
  };

  useEffect(() => {
    if (props.searchToBack != null) setKeyword(props.searchToBack);
    props.SetSearchToBack(null);
  }, [props.searchToBack]);

  return (
    <>
      <TopFilters
        place={props.place}
        keyword={keyword}
        temporalRange={temporalRange}
        setTemporalRange={setTemporalRange}
        dpto={dpto}
        fondo={fondo}
        fondos={fondos}
        setFondo={setFondos}
        setDpto={setDpto}
        filtros={false}
        setKeyword={setNewKeyword}
        total={total}
        tipo={tipo}
        setTipo={setNewTipo}
        setLoading={setLoading}
        tab={tab}
        setTab={setTab}
        setFiltros={setFiltros}
        viewFiltros={filtros}
        page={page}
        setPage={setPage}
        tipoViolencia={tipoViolencia}
        tipoActores={tipoActores}
        setTipoViolencia={setTipoViolencia}
        setTipoActores={setTipoActores}
        origin={origin}
        setOrigin={setNewOrigin}
        setChildren={setChildren}
        children={children}
        colIds={props.collectionId}
      />
      <Container className={classes.contenidoBuscador}>
        {/* <Box mt={2} className={classes.tabContainer}> */}
        {/* {total ? (
						<>
							{total > 0 ? (
								<Typography className={classes.mobileHide}>
									{t("explora.totalResultados", { num: total })}
								</Typography>
							) : null}
						</>
					) : null} */}

        {/* <TabsContainer
            list={[
              t("explora.documentsTitle"),
              t("explora.mapTitle"),
              t("explora.timeLineTitle"),
              t("explora.metadataTitle"),
            ]}
            current={tab}
            callback={setTab}
          /> */}
        {/* <Box className={classes.grow} /> */}
        {/* </Box> */}

        <ColumnaFiltros
          tipo={tipo}
          setTipo={setNewTipo}
          temporalRange={temporalRange}
          setTemporalRange={setTemporalRange}
          setDpto={setDpto}
          dpto={dpto}
          fondos={fondos}
          filtros={filtros}
          tipoViolencia={tipoViolencia}
          tipoActores={tipoActores}
          setTipoViolencia={setTipoViolencia}
          setTipoActores={setTipoActores}
          origin={origin !== null ? origin : 'recursos'}
          setOrigin={setNewOrigin}
          buckets={buckets}
          padre={padre}
          setPadre={setPadre}
          place={props.place}
        >
          {tab === 0 && (origin === null || origin === 'recursos') && (
            <>
              {/* <ResultadosBusqueda
                page={page}
                setTotal={setTotal}
                setPage={setPage}
                temporalRange={temporalRange}
                dpto={dpto}
                fondo={fondos}
                keyword={keyword}
                idents={props.idents}
                tipo={tipo}
                place={props.place}
                actualizar={actualizar}
                loading={loading}
                tipoViolencia={tipoViolencia}
                tipoActores={tipoActores}
              /> */}
              {(tipo === undefined || tipo === null) &&
                <ResultadosBusqueda
                  page={page}
                  setTotal={setTotal}
                  setPage={setPage}
                  temporalRange={temporalRange}
                  dpto={dpto}
                  fondo={fondos}
                  keyword={keyword}
                  idents={props.idents}
                  key={page}
                  tipo={tipo}
                  place={props.place}
                  actualizar={actualizar}
                  loading={loading}
                  tipoViolencia={tipoViolencia}
                  tipoActores={tipoActores}
                  setBuckets={setBuckets}
                  children={children}
                  padre={padre}
                  setPadre={setPadre}
                  colId={props.collectionId}
                />
              }

              {tipo === 'Galería fotográfica' &&
                <ResultadosBusquedaGaleria
                  page={page}
                  setTotal={setTotal}
                  setPage={setPage}
                  temporalRange={temporalRange}
                  dpto={dpto}
                  fondo={fondos}
                  keyword={keyword}
                  idents={props.idents}
                  tipo={tipo}
                  place={props.place}
                  actualizar={actualizar}
                  loading={loading}
                  tipoViolencia={tipoViolencia}
                  tipoActores={tipoActores}
                  setBuckets={setBuckets}
                  children={children}
                />
              }

              {tipo === 'Documento' &&
                <ResultadosBusquedaDocumento
                  page={page}
                  setTotal={setTotal}
                  setPage={setPage}
                  temporalRange={temporalRange}
                  dpto={dpto}
                  fondo={fondos}
                  keyword={keyword}
                  idents={props.idents}
                  tipo={tipo}
                  place={props.place}
                  actualizar={actualizar}
                  loading={loading}
                  tipoViolencia={tipoViolencia}
                  tipoActores={tipoActores}
                  setBuckets={setBuckets}
                  children={children}
                />
              }

              {(tipo === 'Video' || tipo === 'Audio') &&
                <ResultadosBusquedaMultimedia
                  page={page}
                  setTotal={setTotal}
                  setPage={setPage}
                  temporalRange={temporalRange}
                  dpto={dpto}
                  fondo={fondos}
                  keyword={keyword}
                  idents={props.idents}
                  tipo={tipo}
                  place={props.place}
                  actualizar={actualizar}
                  loading={loading}
                  tipoViolencia={tipoViolencia}
                  tipoActores={tipoActores}
                  setBuckets={setBuckets}
                  children={children}
                />
              }

            </>
          )}
        </ColumnaFiltros>
      </Container>
    </>
  );
};

const mapStateToProps = (store) => ({
  searchToBack: store.museo.searchToBack,
});

export default connect(mapStateToProps, museo.actions)(Busqueda);
