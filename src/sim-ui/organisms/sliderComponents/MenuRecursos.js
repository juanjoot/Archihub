import React, { useRef, useState, useEffect } from 'react'
import { makeStyles, withStyles } from "@material-ui/core/styles";
import * as d3 from 'd3'
import { Box } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'fixed',
        top: '50%',
        transform: `translate(0, -50%)`,
        left: 5,
        background: 'rgba(0,0,0,0)',
        borderRadius: 5
    }
}))

const MenuRecursos = props => {
    const d3Container = useRef(null)
    const classes = useStyles()
    const [size, setSize] = useState(null)

    const radius_ = 6
    const x_step = radius_ * 4
    const y_step = 15
    const max = 40
    const margin = { top: 25, left: 10 }
    const offset = 10

    useEffect(() => {

        // console.log(props.current)

        if (d3Container.current && props.cards) {
            const svg = d3.select(d3Container.current)
            svg.selectAll('*').remove()
            let step = -1;
            let step_y = 0;

            let prev = { x: 0, y: 0 };

            const path = svg
                .append("path")
                .attr("d", () => {
                    const p = d3.path();
                    p.moveTo(margin.left, margin.top);
                    props.cards.forEach((d, i) => {
                        let temp = i % max;

                        if (temp === 0) {
                            step++;
                            step_y = 0;

                            if (i > 0) {
                                p.arc(prev.x + radius_, prev.y + offset, radius_, Math.PI, 0, true);
                            }
                        }
                        let x_pos = step * x_step + margin.left;
                        let y_pos = step_y * y_step + margin.top;

                        if (temp === 0) {
                            if (i > 0) {
                                p.lineTo(prev.x + radius_ * 2, y_pos);
                                p.arc(
                                    prev.x + radius_ * 3,
                                    y_pos - offset,
                                    radius_,
                                    Math.PI,
                                    0,
                                    false
                                );
                            }
                        }

                        prev = { x: x_pos, y: y_pos };
                        step_y++;

                        p.lineTo(x_pos, y_pos);
                    });
                    return p.toString();
                })
                .attr("fill", "none")
                .attr("stroke", "#666");

            step = -1;
            step_y = 0;
            const burbujas = svg
                .append("g")
                .selectAll(".burbuja")
                .data(props.cards)
                .join("g")
                .attr("class", "burbuja")
                .attr("transform", (d, i) => {
                    let x_pos = i % max;
                    if (x_pos === 0) {
                        step++;
                        step_y = 0;
                    }
                    x_pos = step * x_step;

                    let y_pos = step_y * y_step;
                    step_y++;

                    return `translate(${margin.left + x_pos} ${margin.top + y_pos})`;
                });

            burbujas
                .append("circle")
                .attr("r", d => {
                    let resp = 0
                    d.pieces && d.pieces[0]['type'] === 'texto' ? resp = 2 : resp = 5
                    return resp
                })
                .attr("fill", d => {
                    if(props.current === d.id_pos)
                        return '#2a5080'
                    else
                        return "rgba(50,50,50,.3)"
                })
                .attr("stroke", d => {
                    if(props.current === d.id_pos)
                        return '#fff'
                    else
                        return "rgba(255,255,255,.3)"
                })
                .on('click', (e,d)=>{
                    // console.log(d)
                    props.goToNCard(d.id_pos)
                })
        }


    }, [d3Container.current, props.current])

    useEffect(() => {
        let w = Math.floor(props.cards.length / max) * x_step + 20
        let h = max * y_step + 30

        if(props.cards.length < max)
            h = props.cards.length * y_step + 30

        setSize({
            w: w,
            h: h
        })
    }, [props.cards])

    return (
        <Box
            className={classes.root}
        >
            {size &&
                <svg
                    ref={d3Container}
                    width={size.w}
                    height={size.h}
                    viewBox={`0 0 ${size.w} ${size.h}`}
                ></svg>
            }

        </Box>
    )
}

export default MenuRecursos