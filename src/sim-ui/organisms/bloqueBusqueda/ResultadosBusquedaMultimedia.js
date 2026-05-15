import { useState, useEffect } from "react";
import * as SearchService from "../../../services/SearchService";

import Lottie from "react-lottie";
import animationData from "../../../assets/loading_cev.json";
import * as Scroll from 'react-scroll';
import ListadoAudios from "../extraCard/ListadoAudios";

import { Box, Grid } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import Typography from "@material-ui/core/Typography";
import TarjetaDocumento from "../TarjetaDocumento";
import { makeStyles } from "@material-ui/core";
import noresultados from "../../assets/imgs/noresultados.jpg";
import { useTranslation } from "react-i18next";
import { Input } from "@material-ui/core";
import { getAllChildren } from "../../../services/ResourceGroupService";

const scroll = Scroll.animateScroll;

const useStyles = makeStyles((theme) => ({
    paginationRoot: {
        display: "flex",
        justifyContent: "end",
        alignItems: "center",
        fontSize: 15,

        "& .pagination-input": {
            backgroundColor: '#2a5080',
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

const ResultadosBusquedaMultimedia = (props) => {
    const classes = useStyles();
    const [loading, setLoading] = useState(true);
    const [resultados, setResultados] = useState([]);
    const [documentos, setDocumentos] = useState([]);
    const [total, setTotal] = useState(0);

    const [t, i18n] = useTranslation("common");
    const view = props.view ? props.view : "rows";

    const size = 10;
    let count = Math.floor(total / size);
    if (total % size > 0) count = count + 1;

    useEffect(() => {
        let timer1 = setTimeout(() => busqueda(), 250);
        return () => {
            clearTimeout(timer1);
        };
    }, [
        props.keyword,
        props.page,
        props.temporalRange,
        props.dpto,
        props.idents,
        props.tipo,
        props.fondo,
        props.tipoViolencia,
        props.tipoActores,
        props.children,
    ]);
    // useEffect(() => {
    //   // setTemporal(props.temporalRange);
    //   let timer1 = setTimeout(() => busqueda(), 250);
    //   return () => {
    //     clearTimeout(timer1);
    //   };
    // }, [props.temporalRange]);

    const busqueda = async () => {
        setLoading(true);
        props.setTotal(null);
        setResultados([])
        scroll.scrollToTop({
            duration: 0
        })
        const from = (props.page - 1) * size;
        let filters = {};

        if (props.temporalRange !== null)
            filters.temporalCoverage = props.temporalRange;

        if (props.dpto !== null) filters.dpto = props.dpto;
        if (props.tipo !== null) filters.tipo = props.tipo;
        if (props.fondo !== null && props.fondo.length > 0)
            filters.fondo = props.fondo.map((f) => {
                if (f) return f.id;
            });
        if (props.idents !== null) filters.idents = props.idents;
        if (props.place !== null) filters.place = props.place;
        if (props.tipoViolencia !== null) filters.tipoViolencia = props.tipoViolencia;
        if (props.tipoActores !== null) filters.tipoActores = props.tipoActores;
        if (props.children !== null && props.fondo !== null && props.fondo.length > 0) {
            const children = await getAllChildren(props.fondo[0].id)
            filters.fondo = [...filters.fondo, ...children.map(c => c.id)]
          }

        SearchService.serviceKeywordMuseo(props.keyword, from, filters).then(
            (data) => {
                setLoading(false);
                setResultados(data.hits);
                setTotal(data.total.value);
                props.setTotal(data.total.value);
                props.setBuckets(data.buckets);
            },
            (error) => {
                console.log(error);
            },
        );
    };

    useEffect(() => {
        let array_documentos = []

        resultados.map(r => {
            const records_ = r._source.document.records.filter(
                (d) => d.support === 'Video' || d.support === 'Audio',
            )

            const records_2 = records_.map(rc => {
                rc['resource_id'] = r._source.document.ident
                rc['type'] = r._source.document.type
                rc['title'] = r._source.document.metadata.firstLevel.title
                return rc
            })

            array_documentos = [...array_documentos, ...records_]
        })

        setDocumentos(array_documentos)
    }, [resultados])

    return (
        <>
            {resultados !== undefined && (
                <>
                    {(!loading || !props.loading) && documentos.length > 0 ? (
                        <>
                            <ListadoAudios
                                audios={documentos}
                                openFirst={true}
                            />

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
                                    color="primary"
                                    onChange={(event, value) => {
                                        // scroll.scrollToTop();
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

export default ResultadosBusquedaMultimedia;
