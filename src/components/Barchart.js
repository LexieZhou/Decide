import * as d3 from "d3";
import linkData from '../data/linkNum_data.json';
import configData from '../data/config.json';
import React from 'react';
import { useState, useEffect } from 'react';
import { handleResultClick } from "./Chart_force";

export default function Barchart({label}) {
    const margin = {top: 40, right: 10, bottom: 30, left: 80};
    const width = 200 - margin.left - margin.right;
    const height = 150 - margin.top - margin.bottom;

    const [data, setData] = useState(null);
    useEffect(() => {
        setData(linkData[label]);
    }, []);

    useEffect(() => {
        if (data) {
            const maxLinkNum = d3.max(data, function(d) { return d.link_num; });

            const svg = d3.select("#Barchart")
                .append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                .append("g")
                    .attr("transform",
                        "translate(" + margin.left + "," + margin.top + ")");
            
            var x = d3.scaleLinear()
                .domain([0, maxLinkNum])
                .range([ 0, width]);
            
            var tooltip = d3.select("#Barchart")
                .append("div")
                .attr("class", "barchart-tooltip")
                .style("opacity", 0)
                .style("position", "absolute")
                //.style("background-color", "rgba(0, 0, 0, 0.8)")
                .style("color", "black")
                .style("padding", "10px")
                .style("font-size", "9px")
                .style("font-weight", "bold")
                .style("width", "60px")
                .style("height", "30px")
                //.style("box-sizing", "border-box")
                //.style("border-radius", "5px");

            
            svg.append("g")
                .append("text")
                .attr("x", 0 - margin.left)
                .attr("y", 0 - (margin.top / 2))
                .attr("text-anchor", "start")
                .style("font-size", "13px")
                .style("font-weight", "bold")
                .text(label);

            svg.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x))
                .selectAll("text")
                    .attr("transform", "translate(-10,0)rotate(-45)")
                    .style("font-size", "8px")
                    .style("text-anchor", "end");
            
            var y = d3.scaleBand()
                .range([ 0, height ])
                .domain(data.map(function(d) { return d.name; }))
                .padding(.05);
            
            svg.append("g")
                .call(d3.axisLeft(y))
            
            svg.selectAll("myRect")
                .data(data)
                .enter()
                .append("rect")
                .attr("x", x(0) )
                .attr("y", function(d) { return y(d.name)+4; })
                .attr("width", function(d) { return x(d.link_num); })
                .attr("height", y.bandwidth()-8 )
                .attr("fill", configData.COLOR[label])
                .on('mouseover', function (event, d) {
                    d3.select(this)
                        .attr('opacity', 0.8)
                        .attr("y", function(d) { return y(d.name)+3; })
                        .attr("height", y.bandwidth()-6 )
                    
                    // filter graph
                    handleResultClick(d.id);
                    
                    tooltip.transition()
                        .duration(100)
                        .style("opacity", 1)
                        .style('top', event.pageY - 20 + 'px')
                        .style('left', event.pageX + 10 + 'px');
                      
                    tooltip
                        .html("Links: " + d.link_num);
                        
                })
                .on('mouseout', function (actual, i) {
                    d3.select(this)
                        .attr('opacity', 1)
                        .attr("y", function(d) { return y(d.name)+4; })
                        .attr("height", y.bandwidth()-8 )
                    tooltip
                        .transition()
                        .duration('200')
                        .style("opacity", 0);
                    
                    handleResultClick("");
                });

        }
    }, [data]);

    return (
        <div id="Barchart">
        </div>
    )
}