import { Component } from 'react';
import * as d3 from 'd3'

/**
 * Bloque básico para generar una visualización en D3
 * 
 * @version 0.1
 */

export default class ListadoBarras extends Component {
    constructor(props) {
        super(props)

        this.updateViz = this.updateViz.bind(this)
    }

    componentDidMount() {
        this.svg = d3.select(this.refs.d3_canvas).append('g')
        this.svg.attr('style', `transform: translate(0,-${this.props.margin}px)`)

        this.updateViz()
    }

    componentDidUpdate() {
        this.svg.attr('style', `transform: translate(0,-${this.props.margin}px)`)
    }

    updateViz() {
        let global = []
        const parent = this

        const color_tipo = d3.scaleOrdinal(d3.schemeSet2)
        const w_scale = d3.scaleLinear().range([0, 400]).domain([0, 1])


        getChildren(this.props.root.children, global, null)

        function getChildren(root, array, parent, root_name) {
            root.forEach(c => {
                if (c.data !== undefined) {
                    const color_parent = color_tipo(c.data.name)
                    if (c.data.value !== undefined) array.push({
                        name: c.data.name,
                        value: c.data.value,
                        color: color_parent
                    })
                    if (c.data.children.length > 0) getChildren(c.data.children, array, color_parent, c.data.name)
                } else if (c.value !== undefined && parent !== null) {
                    array.push({
                        name: c.name,
                        value: c.value,
                        color: parent,
                        root: root_name + ' - ' + c.name
                    })

                    if (c.children.length > 0) getChildren(c.children, array, parent, root_name + ' - ' + c.name)
                }

            })
        }

        global.sort((a, b) => d3.descending(a.value, b.value))

        const etiquetas = this.svg.append('g')
            .selectAll('.etiqueta_listado')
            .data(global)
            .join('g')
            .attr('transform', (d, i) => `translate(100 ${i * 50 + 50})`)
            .attr('class', 'etiqueta_listado')

        etiquetas.append('text')
            .text(d => d.name)
            .attr('font-size', 18)
            .attr('font-family', 'Montserrat')

        etiquetas.append('rect')
            .attr('width', d => w_scale(1))
            .attr('height', 5)
            .attr('y', 10)
            .attr('fill', '#dcdcdc')

        etiquetas.append('rect')
            .attr('width', d => w_scale(d.value))
            .attr('height', 5)
            .attr('y', 10)
            .attr('fill', d => d.color)

        etiquetas.append('circle')
            .attr('r', 20)
            .attr('cx', -30)
            .attr('fill', d => d.color)

        etiquetas.append('text')
            .text(d => d.value.toFixed(2))
            .attr('text-anchor', 'middle')
            .attr('font-size', 13)
            .attr('font-family', 'Montserrat')
            .attr('alignment-baseline', 'middle')
            .attr('fill', 'white')
            .attr('x', -30)

        etiquetas.on('click', (d, i) => {
            parent.props.changeFilter({
                name: d.root
            }, 'etiquetas')
        })
    }

    render() {
        return (<>
            <svg ref="d3_canvas"
                width="1000"
                height="40000"
                viewBox="0 0 1000 40000" />
        </>
        )
    }
}