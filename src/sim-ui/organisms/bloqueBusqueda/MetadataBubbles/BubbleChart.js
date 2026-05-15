import React, { useEffect, useRef } from "react";
import styled from "@emotion/styled";
import * as d3 from "d3";

function BubbleChart({ width, height, colors, buckets, isLoading }) {
  const vis = {};
  const visRef = useRef(null);

  // METHODS
  const onMouseOver = (d, node) => {
    var xPosition = parseFloat(d.x + d.target.__data__.r);
    var yPosition = parseFloat(d.y);
    const { doc_count, key } = node.data;
    const tooltip = d3
      .select("#tooltip")
      .style("left", xPosition + "px")
      .style("top", yPosition + "px");
    tooltip
      .select("#value")
      .text(() => `${doc_count} resultado${doc_count > 1 ? "s" : ""}`);
    tooltip.select("#name").text(key);
    tooltip.classed("hidden", false);
  };
  const onMouseOut = () => {
    d3.select("#tooltip").classed("hidden", true);
  };

  // EFFECTS
  useEffect(() => {
    vis.svg = d3.select(visRef.current).attr("class", "bubble");
    vis.color = d3.scaleOrdinal().range(colors);
    vis.diameter = height;
    vis.data = {};
  }, [colors, height]);

  useEffect(() => {
    if (isLoading) {
      vis.svg.selectAll("*").remove();
      vis.svg
        .append("text")
        .classed("empty", true)
        .attr("transform", `translate( ${width / 2}, ${height / 2})`)
        .attr("font-size", width / 8)
        .attr("fill", colors[0])
        .attr("opacity", 0.7)
        .style("text-anchor", "middle")
        .text("Cargando ...");
      // vis.svg.selectAll("circle").style("fill", () => "gray");
    } else if (buckets && buckets.length > 0) {
      vis.svg.selectAll(".empty").remove();
      vis.data.children = buckets;

      //circle packing
      const bubble = d3
        .pack(vis.data)
        .size([vis.diameter, vis.diameter])
        .padding(10);

      //sumar todos los nodos
      const nodes = d3.hierarchy(vis.data).sum((d) => d.doc_count);

      const circles = vis.svg.selectAll("circle").data(bubble(nodes).children);
      circles
        .transition()
        .duration(500)
        .attr("transform", (d) => `translate( ${d.x}, ${d.y})`)
        .style("fill", (_, i) => vis.color(i))
        .attr("r", (d) => 3 + d.r);
      circles.exit().transition().duration(200).attr("r", 0).remove();
      circles
        .enter()
        .append("circle")
        .attr("transform", (d) => `translate( ${d.x}, ${d.y})`)
        .attr("r", 0)
        .style("fill", (_, i) => vis.color(i))
        .on("mouseover", onMouseOver)
        .on("mouseout", onMouseOut)
        .transition()
        .duration(500)
        .attr("r", (d) => 3 + d.r);

      const countLabels = vis.svg
        .selectAll(".count")
        .data(bubble(nodes).children);
      countLabels.exit().remove();
      countLabels
        .attr("transform", (d) => `translate( ${d.x}, ${d.y})`)
        .text((d) => d.data.doc_count)
        .attr("font-size", (d) => d.r / 2);
      countLabels
        .enter()
        .append("text")
        .classed("count", true)
        .attr("transform", (d) => `translate( ${d.x}, ${d.y})`)
        .style("text-anchor", "middle")
        .text((d) => d.data.doc_count)
        .attr("font-size", (d) => d.r / 2)
        .attr("fill", "white")
        .on("mouseover", onMouseOver)
        .on("mouseout", onMouseOut);

      const labels = vis.svg.selectAll(".text").data(bubble(nodes).children);
      labels.exit().remove();
      labels
        .attr("transform", (d) => `translate( ${d.x}, ${d.y + d.r / 4})`)
        .text((d) => d.data.key.substring(0, 19))
        .attr("font-size", (d) => d.r / 5);
      labels
        .enter()
        .append("text")
        .classed("text", true)
        .attr("transform", (d) => `translate( ${d.x}, ${d.y + d.r / 4})`)
        .style("text-anchor", "middle")
        .text((d) => d.data.key.substring(0, 19))
        .attr("font-size", (d) => d.r / 5)
        .attr("fill", "white")
        .on("mouseover", onMouseOver)
        .on("mouseout", onMouseOut);
    } else {
      vis.svg.selectAll("*").remove();
      vis.svg
        .append("text")
        .classed("empty", true)
        .attr("transform", `translate( ${width / 2}, ${height / 2})`)
        .attr("font-size", width / 8)
        .attr("fill", colors[0])
        .attr("opacity", 0.7)
        .style("text-anchor", "middle")
        .text("No hay datos");
    }
  }, [buckets, colors, height, width]);

  return (
    <>
      <Tooltip id="tooltip" className="hidden">
        <p id="name"></p>
        <p id="value"></p>
      </Tooltip>

      <svg
        ref={visRef}
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
      />
    </>
  );
}

const Tooltip = styled.div`
  position: absolute;
  max-width: 200px;
  border: 1px solid grey;
  padding: 10px;
  border-radius: 10px;
  background-color: white;
  font-size: 1.1em;
  z-index: 100;
  &.hidden {
    visibility: hidden;
  }
  #name {
    font-weight: bold;
    margin: 0;
  }
  #value {
    margin: 0;
  }
`;

export default BubbleChart;
