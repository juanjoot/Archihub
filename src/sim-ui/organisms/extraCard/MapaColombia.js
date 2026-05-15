import { useRef, useEffect } from 'react';
import departamentos from '../../assets/geojson/Departamentos'
import providencia from '../../assets/geojson/providencia'
import san_andres from '../../assets/geojson/san_andres'
import mundo from '../../assets/geojson/Mundo'
import * as d3 from 'd3'
import { useTheme } from '@material-ui/core/styles'

const Colombia = props => {
    const theme = useTheme()
    const d3_canvas = useRef(null)

    let { sColor, fColor, bColor, pColor, dColor } = props

    if (sColor === undefined) sColor = '#333'
    if (fColor === undefined) fColor = '#FFF'
    if (bColor === undefined) bColor = '#FFF'
    if (pColor === undefined) pColor = '#333'
    if (dColor === undefined) dColor = '#6E3092'

    let width = 954,
        height = 954,
        codigo_san_an = '88',
        coor_colombia = [-73.67431640625001, 4.124080991005611],
        coor_providencia = [-81.35925292968751, 13.378931658431565],
        coor_san_an = [-81.72729492187501, 12.543839666237682]

    if (props.width) width = props.width
    if (props.height) height = props.height

    const projection = d3.geoMercator()

    const projection_pro = d3.geoMercator()
        .translate([width / 2 - 290, width / 2 - 400])
        .scale(60000)
        .center(coor_providencia)

    const projection_sa = d3.geoMercator()
        .translate([width / 2 - 430, width / 2 - 310])
        .scale(60000)
        .center(coor_san_an)

    projection.fitSize([width, height - 20], {
        type: "FeatureCollection",
        features: departamentos.features.filter(d => d.properties.dpto_ccdgo !== codigo_san_an)
    })

    useEffect(() => {
        const svg = d3.select(d3_canvas.current)
            .attr("viewBox", [0, 0, width, height])

        svg.selectAll("*").remove()

        const patternSize = 7;
        const patternWidth = 2;
        const patternAngle = 30;
        const patternColor = pColor;

        const defs = svg.append("defs");
        const hatchStripes = defs
            .append("pattern")
            .attr("width", patternSize)
            .attr("height", patternSize)
            .attr("patternTransform", `rotate(${patternAngle})`)
            .attr("patternUnits", "userSpaceOnUse")
            .attr("id", "hatchStripes");
        hatchStripes
            .append("line")
            .attr("x1", "0")
            .attr("x2", "0")
            .attr("y1", "0")
            .attr("y2", patternSize)
            .style("stroke", patternColor)
            .style("stroke-width", patternWidth);

        svg.append('rect')
            .attr('width', width)
            .attr('height', height)
            .attr('fill', bColor)



        const nivel_1 = svg.selectAll('.cercanos')
            .data(mundo.features.filter(d => d.properties["iso_a2"] !== 'CO'))
            .join('path')
            .attr('class', 'cercanos')
            .attr('d', d3.geoPath(projection))
            .attr('fill', `url(#hatchStripes`)
            .attr('stroke', bColor)
            .attr('stroke-width', 2)

        const deptos = svg.selectAll('.departamentos')
            .data(departamentos.features.filter(d => d.properties.dpto_ccdgo !== codigo_san_an))
            .join('path')
            .attr('class', 'departamentos')
            .attr('d', d3.geoPath(projection))
            .attr('fill', d => {
                if (props.geo.length === 1 && props.geo[0].code === 'CO') {
                    return dColor
                } else if (props.geo.length > 1) {
                    try {

                        let item = props.geo.find(i => i.code.split('-')[1] === d.properties.dpto_ccdgo && i.code.split('-').length === 2)
                        if (item)
                            return dColor
                        else
                            return 'none'
                    } catch (e) {
                        return fColor
                    }
                }
                else
                    return fColor
            })
            .attr('stroke', d => {
                if (props.geo.length === 1 && props.geo[0].code === 'CO')
                    return fColor
                else if (props.geo.length > 1) {
                    try {
                        let item = props.geo.find(i => i.code.split('-')[1] === d.properties.dpto_ccdgo && i.code.split('-').length === 2)
                        if (item)
                            return fColor
                        else
                            return sColor

                    } catch (e) {
                        return sColor
                    }
                }
                else
                    return sColor
            })

        if (props.geo.length > 1) {

            try {
                let puntos = props.geo.filter(i => i.code.split('-').length === 3 && i.geoPoint)
                const circles = svg.selectAll('.bubbles')
                    .data(puntos)
                    .join('g')
                    .attr('class', 'bubbles')


                circles.append('circle')
                    .attr('class', 'map-circle-out')
                    .attr('r', 25)
                    .attr('fill', 'rgba(255,255,255,1)')
                    // .attr('id', d => d.name)
                    .attr('stroke', dColor)
                    .attr('stroke-width', 2)
                    .attr('cx', d => {
                        let coor = projection(d.geoPoint.coordinates)
                        return coor[0]
                    })
                    .attr('cy', d => {
                        let coor = projection(d.geoPoint.coordinates)
                        return coor[1]
                    })

                circles.append('circle')
                    .attr('class', 'map-circle')
                    .attr('r', 10)
                    .attr('fill', dColor)
                    // .attr('id', d => d.name)
                    .attr('stroke', 'none')
                    .attr('cx', d => {
                        let coor = projection(d.geoPoint.coordinates)
                        return coor[0]
                    })
                    .attr('cy', d => {
                        let coor = projection(d.geoPoint.coordinates)
                        return coor[1]
                    })

            } catch (e) {
                console.log(e)
            }
        }

        svg.append('rect')
            .attr('width', 200)
            .attr('height', 250)
            .attr('fill', bColor)
            .attr('stroke', sColor)
            .attr('x', 10)
            .attr('y', 10)
            .attr('stroke-width', 0.5)

        svg.append('line')
            .attr('x1', 110)
            .attr('y1', 10)
            .attr('x2', 110)
            .attr('y2', 260)
            .attr('stroke', sColor)
            .attr('stroke-dasharray', '4 3')

        projection.fitSize([60, 220], {
            type: "FeatureCollection",
            features: providencia
        })

        const provi_path = svg.selectAll('.pro')
            .data(providencia)
            .join('path')
            .attr('class', 'pro')
            .attr('d', d3.geoPath(projection))
            .attr('fill', d => {
                if (props.geo.length === 1 && props.geo[0].code === 'CO')
                    return dColor
                else if (props.geo.length > 1) {
                    try {
                        let item = props.geo.find(i => i.code.split('-')[1] === d.properties.dpto_ccdgo && i.code.split('-').length === 2)
                        if (item)
                            return dColor
                        else
                            return 'none'
                    } catch (e) {
                        return fColor
                    }
                }
                else
                    return fColor
            })
            .attr('stroke', d => {
                if (props.geo.length === 1 && props.geo[0].code === 'CO')
                    return fColor
                else if (props.geo.length > 1) {
                    try {
                        let item = props.geo.find(i => i.code.split('-')[1] === d.properties.dpto_ccdgo && i.code.split('-').length === 2)
                        if (item)
                            return fColor
                        else
                            return sColor
                    } catch (e) {
                        return sColor
                    }
                }
                else
                    return sColor
            })
            .attr('transform', `translate(130)`)

        projection.fitSize([60, 220], {
            type: "FeatureCollection",
            features: san_andres
        })

        const san_an_path = svg.selectAll('.sa')
            .data(san_andres)
            .join('path')
            .attr('class', 'sa')
            .attr('d', d3.geoPath(projection))
            .attr('fill', d => {

                if (props.geo.length === 1 && props.geo[0].code === 'CO')
                    return dColor
                else if (props.geo.length > 1) {
                    try {
                        let item = props.geo.find(i => i.code.split('-')[1] === d.properties.dpto_ccdgo && i.code.split('-').length === 2)
                        if (item)
                            return dColor
                        else
                            return 'none'

                    } catch (e) {
                        return fColor
                    }
                }
                else
                    return fColor
            })
            .attr('stroke', d => {
                if (props.geo.length === 1 && props.geo[0].code === 'CO')
                    return fColor
                else if (props.geo.length > 1) {
                    try {
                        let item = props.geo.find(i => i.code.split('-')[1] === d.properties.dpto_ccdgo && i.code.split('-').length === 2)
                        if (item)
                            return fColor
                        else
                            return sColor
                    } catch (e) {
                        return sColor
                    }
                }
                else
                    return sColor
            })
            .attr('transform', `translate(30, 30)`)





    }, [d3_canvas.current])


    return (
        <div className={props.className}>
            <svg ref={d3_canvas}></svg>
        </div>
    )
};


export default Colombia;