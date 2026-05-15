import { useEffect, useState, useRef } from 'react'
import LineaTiempo from './LineaTiempo'
import * as VizService from "../../../services/VizService"
import * as Plot from "@observablehq/plot"
import { useTheme } from '@material-ui/core/styles'

const Histogram = props => {
    const [loading, setLoading] = useState(true)
    const [buckets, setBuckets] = useState([])
    const canvasRef = useRef()
    const theme = useTheme()

    useEffect(() => {
        setLoading(true)

        let filters = {
            q: props.keyword
        }

        if (props.temporalRange) filters['temporalCoverage'] = props.temporalRange
        if (props.dpto) filters['dpto'] = props.dpto
        if (props.fondo) filters['fondo'] = props.fondo
        if (props.tipo) filters['tipo'] = props.tipo
        if (props.idents) filters.idents = props.idents
        if (props.place) filters.place = props.place

        VizService.getMuseoHistogram(filters)
            .then(
                (data) => {
                    let buckets_ = data.aggregations.years.buckets.filter(d => {
                        d['date'] = new Date(d['key_as_string'])
                        var year = parseInt(d['date'].toISOString().split('-')[0])
                        d['date'] = year
                        if (year >= 1944) return d
                    })

                    setBuckets(buckets_)
                },
                (error) => {
                    console.log(error)
                }
            )
    }, [props.keyword, props.temporalRange, props.dpto, props.fondo, props.idents, props.tipo])

    useEffect(() => {
        if (buckets === undefined) return;
        const chart = Plot.plot({
            // Le asigno un tamaño a la gráfica
            width: 900,
            height: 400,

            marginBottom: 100,

            style: {
                color: '#999'
            },

            y: {
                grid: true,
                label: null
            },

            x: {
                tickRotate: -70,
                label: null,
                tick: null
            },
            marks: [
                Plot.barY(buckets, { x: "date", y: "doc_count", fill: theme.palette.primary.light }),
            ]
        })
        canvasRef.current.append(chart)
        return () => chart.remove()
    }, [buckets])

    return (
        <>
            <LineaTiempo
                temporalRange={props.temporalRange}
                setTemporalRange={props.setTemporalRange}
            />

            <div ref={canvasRef}></div>
        </>
    )
}

export default Histogram