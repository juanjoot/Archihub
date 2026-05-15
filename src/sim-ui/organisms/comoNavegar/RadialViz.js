import React, { useEffect, useState, useRef } from 'react'
import * as d3 from 'd3'
import { URL_API } from '../../../config/const'
import { Box } from '@material-ui/core'

const API_URL_JSON = 'https://nd-lucy-cdt-archive.s3.amazonaws.com/web_files/viz_fondos/'

const radius = 500 / 2

const partition = data => {
    return d3.partition().size([2 * Math.PI, radius * radius])(
        d3
            .hierarchy(data)
            .sum(d => d.value)
            .sort((a, b) => b.value - a.value)
    )
}

const arc = d3
    .arc()
    .startAngle(d => d.x0)
    .endAngle(d => d.x1)
    .padAngle(1 / radius)
    .padRadius(radius)
    .innerRadius(d => Math.sqrt(d.y0))
    .outerRadius(d => Math.sqrt(d.y1) - 1)

const mousearc = d3
    .arc()
    .startAngle(d => d.x0)
    .endAngle(d => d.x1)
    .innerRadius(d => Math.sqrt(d.y0))
    .outerRadius(radius)


const color = d3
    .scaleOrdinal()
    .range(['#fff'])

const RadialViz = props => {
    const d3Container = useRef(null)
    const [data, setData] = useState(null)

    useEffect(() => {
        d3.json(API_URL_JSON + props.slug + '_tree.json').then(d => {
            setData(d[0])
        })
    }, [props.slug])

    useEffect(() => {
        if (data) {
            const root = partition(data)
            const svg = d3.select(d3Container.current)
            svg.selectAll('*').remove()

            
            props.setBreadcrumb({ sequence: [], percentage: 0.0 })
            const totalvalue = root.value;

            const label = svg
                .append("text")
                .attr("text-anchor", "middle")
                .attr("fill", "#888")

            label
                .append("tspan")
                .attr("class", "percentage")
                .attr("x", 0)
                .attr("y", 30)
                .attr("fill", "#fff")
                .attr("dy", "-0.1em")
                .attr("font-size", "4em")
                .text(totalvalue);

            svg
                .attr("viewBox", `${-radius} ${-radius} ${500} ${500}`)
                // .style("max-width", `${700}px`)
                .style("font", "12px sans-serif");

            const path = svg
                .append("g")
                .selectAll("path")
                .data(
                    root.descendants().filter((d) => {
                        return d.x1 - d.x0 > 0.001;
                    })
                )
                .join("path")
                .attr("fill", (d) => (d.depth === 0 ? "rgba(255,255,255,.3)" : "#fff"))
                .attr("d", arc);

            svg
                .append("g")
                .attr("fill", "none")
                .attr("pointer-events", "all")
                .on("mouseleave", () => {
                    path.attr("fill-opacity", 1);
                    label.style("visibility", null).select(".percentage").text(totalvalue)
                    props.setBreadcrumb({ sequence: [], percentage: 0.0 })
                    // element.dispatchEvent(new CustomEvent("input"));
                })
                .selectAll("path")
                .data(
                    root.descendants().filter((d) => {
                        return d.x1 - d.x0 > 0.001;
                    })
                )
                .join("path")
                .attr("d", mousearc)
                .on("mouseenter", (event, d) => {
                    const sequence = d.ancestors().reverse().slice(1);
                    path.attr("fill-opacity", (node) =>
                        sequence.indexOf(node) >= 0 ? 1.0 : 0.3
                    );
                    const percentage = d.value;
                    label.style("visibility", null).select(".percentage").text(percentage);
                    props.setBreadcrumb({ sequence, percentage })
                    // element.dispatchEvent(new CustomEvent("input"));
                })
                .on("click", (e) => {
                    // TODO starship morph
                });
        }

    }, [data])

    return (
        <Box>
            <svg
                ref={d3Container}
                width={500}
                height={500}
                viewBox={`0 0 ${500} ${500}`}
            ></svg>
        </Box>
    )
}

export default RadialViz