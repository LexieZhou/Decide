import * as d3 from "d3";
import configData from '../data/config.json';
import React from 'react';
import { useState, useEffect } from 'react';
import { filterData, fetchData } from "./Chart_force";

export default function Barchart({label}) {

    const [data, setData] = useState();
    const chartId = `barchart-${label}`;

    useEffect(() => {
        fetch(`${configData.SERVER_URL}/topNodes/${label}`)
            .then(res => res.json())
            .then(data => {
                setData(data);
            });
    }, [label]);

    useEffect(() => {
        if (data) {
            const existingChart = document.getElementById(chartId);
            if (existingChart) {
                return;
            }

            const margin = {top: 40, right: 20, bottom: 30, left: 90};
            const width = 250 - margin.left - margin.right;
            const height = 150 - margin.top - margin.bottom;
            const maxLinkNum = d3.max(data, function(d) { return d.links_num; });
            const getNameWithVersion = (d) => { return d.name + " " + d.version; };

            const svg = d3.select("#Barchart")
                .append("svg")
                .attr("id", chartId)
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
                .attr("x", 8 - margin.left)
                .attr("y", 0 - (margin.top / 2))
                .attr("text-anchor", "start")
                .style("font-size", "13px")
                .style("font-weight", "bold")
                .text(function() {
                    if (label === "operating_system") {
                        return "OS";
                    } else if (label === "application") {
                        return "Database";
                    } else {
                        return label.charAt(0).toUpperCase() + label.slice(1);
                    }
                  });

            svg.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x))
                .selectAll("text")
                    .attr("transform", "translate(-10,0)rotate(-45)")
                    .style("font-size", "8px")
                    .style("text-anchor", "end");
            
            var y = d3.scaleBand()
                .range([ 0, height ])
                .domain(data.map(function(d) { return getNameWithVersion(d); }))
                .padding(.05);
            
            svg.append("g")
                .call(d3.axisLeft(y))
            
            svg.selectAll("myRect")
                .data(data)
                .enter()
                .append("rect")
                .attr("x", x(0) )
                .attr("y", function(d) { return y(getNameWithVersion(d))+4; })
                .attr("width", function(d) { return x(d.links_num); })
                .attr("height", y.bandwidth()-8 )
                .attr("fill", configData.COLOR[label])
                .on('mouseover', function (event, d) {
                    d3.select(this)
                        .attr('opacity', 0.8)
                        .attr("y", function(d) { return y(getNameWithVersion(d))+3; })
                        .attr("height", y.bandwidth()-6 )
                    
                    // filter graph
                    filterData(d.id);
                    
                    tooltip.transition()
                        .duration(100)
                        .style("opacity", 1)
                        .style('top', event.pageY - 20 + 'px')
                        .style('left', event.pageX + 10 + 'px');
                      
                    tooltip
                        .html("Links: " + d.links_num);
                        
                })
                .on('mouseout', function (actual, i) {
                    d3.select(this)
                        .attr('opacity', 1)
                        .attr("y", function(d) { return y(getNameWithVersion(d))+4; })
                        .attr("height", y.bandwidth()-8 )
                    tooltip
                        .transition()
                        .duration('200')
                        .style("opacity", 0);
                    
                    // get whole view
                    fetchData();
                });

        }
    }, [data, chartId, label]);

    return (
        <div id="Barchart">
        </div>
    )
}