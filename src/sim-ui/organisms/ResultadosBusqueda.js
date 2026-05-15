import { useState, useEffect } from 'react';
import * as SearchService from "../../../services/SearchService"
import { connect } from 'react-redux'
import * as museo from "../../../app/store/ducks/museo.duck"

import Lottie from 'react-lottie';
import animationData from '../../assets/loading_cev_conoce.json'

import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import Divider from '@material-ui/core/Divider'
import Pagination from '@material-ui/lab/Pagination'

import TarjetaDocumento from './TarjetaDocumento'
import { makeStyles } from "@material-ui/core"


const useStyles = makeStyles((theme) => ({
    paginationRoot: {
        '& > *': {
            display: 'flex',
            justifyContent: 'center'
        }
    }
}));

const ResultadosBusqueda = props => {
    const classes = useStyles()
    const [loading, setLoading] = useState(true)
    const [resultados, setResultados] = useState([])
    const [total, setTotal] = useState(0)
    const size = 10
    let count = Math.floor(total / size) 
    if((total%size)>0)
        count = count +1 


    useEffect(() => {
        setLoading(true)
        props.setTotal(null)

        const from = (props.pageExplora - 1) * 10
        let filters = {}

        if (props.temporalRangeExplora !== null) filters.temporalCoverage = props.temporalRangeExplora
        if (props.dptoExplora !== null) filters.dptoExplora = props.dptoExplora


        SearchService.serviceKeywordMuseo(props.searchKeyword, from, filters)
            .then(
                (data) => {
                    setLoading(false)
                    setResultados(data.hits)
                    setTotal(data.total.value)
                    props.setTotal(data.total.value)
                },
                (error) => {
                    console.log(error)
                }
            )
    }, [props.searchKeyword, props.pageExplora, props.temporalRangeExplora, props.dptoExplora])

    return (
        <>
            {resultados !== undefined &&
                <>
                    {!loading && resultados.length > 0 ? (
                        <>
                            <Box mt={4}>
                                <Divider />
                                <Box mt={4}>
                                    {resultados.map((r, i) => {
                                     
                                        return (<>
                                            {r._source.document? 
                                                <TarjetaDocumento
                                                    place="explora"
                                                    index={`${i}-${r._source.document.ident}`}
                                                    key={`${i}-${r._source.document.ident}`}
                                                    name={r._source.document.metadata.firstLevel.title}
                                                    description={r._source.document.metadata.firstLevel.description}
                                                    url={r._source.document.metadata.firstLevel.url}
                                                    fondo={r._source.document.type}
                                                    records={r._source.document.records}
                                                    ident={r._source.document.ident}
                                                    simpleident={r._source.document.metadata.simpleident}
                                                    slug={r._source.document.metadata.slug}
                                                    geo={r._source.document.metadata.firstLevel.geographicCoverage}
                                                    autor={r._source.document.metadata.firstLevel.creator}
                                                    time={r._source.document.metadata.firstLevel.temporalCoverage}
                                                />
                                            :null} 
                                       </>)
                                    })}
                                </Box>
                            </Box>
                            <Box mt={4} mb={8} className={classes.paginationRoot}>
                                <Pagination
                                    page={props.pageExplora}
                                    count={count}
                                    color="secondary"
                                    variant="outlined"
                                    onChange={(event, value) => { props.setPageExplora(value) }}
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

const mapStateToProps = store => ({
    searchKeyword: store.museo.keyword,
    totalExplora: store.museo.totalExplora,
    pageExplora: store.museo.pageExplora,
    dptoExplora: store.museo.dptoExplora,
    mpioExplora: store.museo.mpioExplora,
    temporalRangeExplora: store.museo.temporalRangeExplora
});

export default connect(mapStateToProps, museo.actions)(ResultadosBusqueda)