import { useState, useEffect } from 'react';
import { serviceListResourceByUserFilter } from "../../../services/BookmarkCollectionService";
import Lottie from 'react-lottie';
//import animationData from '../../assets/loading_cev_explora.json'
import animationData from '../../assets/loading_cev_crea.json'

import Box from '@material-ui/core/Box'
import Divider from '@material-ui/core/Divider'
import Pagination from '@material-ui/lab/Pagination'

import TarjetaBiblioteca from './TarjetaBiblioteca'
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    paginationRoot: {
        '& > *': {
            display: 'flex',
            justifyContent: 'center'
        }
    }
}));

const ResultadoBiblioteca = props => {
    const { tipoRecurso, handlerCambioSeleccion, seleccionable, seleccion } = props;
    const classes = useStyles();
    const [loading, setLoading] = useState(true);
    const [resultados, setResultados] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);

    const size = 10;
    let count = Math.floor(total / size)
    if ((total % size) > 0)
        count = count + 1


    const handlerPage = (page) => {
        setPage(page)
    }

    const handleTarjetaSeleccionada = (r) => {
        let tarjetaSeleccionadaS = [...seleccion];
        tarjetaSeleccionadaS.push(r);
        handlerCambioSeleccion(tarjetaSeleccionadaS);
    }

    const handleTarjetaDeSeleccionada = (r) => {
        let tarjetaSeleccionadaS = [...seleccion];
        const index = tarjetaSeleccionadaS.indexOf(r);
        if (index > -1) {
            tarjetaSeleccionadaS.splice(index, 1);
        }
        handlerCambioSeleccion(tarjetaSeleccionadaS);
    }

    useEffect(() => {

        setLoading(true);
        //tipoRecurso
        let filters = {};
        serviceListResourceByUserFilter(page, filters, size, tipoRecurso)
            .then(
                (data) => {
                    setLoading(false)
                    setResultados(data.hits)
                    setTotal(data.total.value)
                },
                (error) => {
                    console.log(error)
                    setLoading(false)
                }
            )
    }, [page])

    return (
        <>
            {resultados !== undefined &&
                <>
                    {!loading && resultados.length > 0 ? (
                        <>
                            <Box mt={4}>
                                <Divider />
                                <Box mt={4} mb={8} className={classes.paginationRoot}>
                                </Box>
                                <Box mt={4}>
                                    {resultados.map((r, i) => {
                                        const k = "tb_" + i
                                        const check = (seleccion.filter(x => x.document.ident === r._source.document.ident).length > 0)

                                        return (<>
                                            {seleccionable ?
                                                <TarjetaBiblioteca
                                                    index={i}
                                                    resource={r._source}
                                                    handleSelectCard={handleTarjetaSeleccionada}
                                                    handleUnSelectCard={handleTarjetaDeSeleccionada}
                                                    key={k}
                                                    selected={check}
                                                />
                                                :
                                                <TarjetaBiblioteca
                                                    index={i}
                                                    resource={r._source}
                                                    key={k}
                                                />
                                            }
                                        </>)
                                    })}
                                </Box>
                            </Box>
                            <Box mt={4} mb={8} className={classes.paginationRoot}>
                                <Pagination
                                    page={page}
                                    count={count}
                                    color="secondary"
                                    variant="outlined"
                                    onChange={(event, value) => { handlerPage(value) }}
                                />
                            </Box>
                        </>
                    ) : (
                        <Box mt={4} mb={4}>
                            <Lottie height={150} width={150} options={
                                {
                                    loop: true,
                                    autoplay: true,
                                    animationData: animationData,
                                    rendererSettings: {
                                        preserveAspectRatio: 'xMidYMid slice'
                                    }
                                }
                            } />
                        </Box>
                    )
                    }
                </>
            }
        </>
    )
}



export default (ResultadoBiblioteca)