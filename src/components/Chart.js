import React, { useState, useRef, useEffect } from 'react';
import * as d3 from "d3";
import jsonData from '../data/new_records.json';
import configData from '../data/config.json';
import './Chart.css';

const Chart = () => {
  const svgRef = useRef(null);
  const [data, setData] = useState(null);
  const GRAPH_WIDTH = 1200;
  const GRAPH_HEIGHT = 1200;
  
  useEffect(() => {
    setData(jsonData);
  }, []);

  useEffect(() => {
    if (data) {
      
      const svg = d3.select(svgRef.current);
      // const svg_WIDTH = svg.node().clientWidth;
      // const svg_HEIGHT = svg.node().clientHeight;

      const g = svg.append('g');

      const simulation = d3
        .forceSimulation(data.nodes)
        .force("link", 
          d3.forceLink(data.links)                // This force provides links between nodes
            .id(function(d) { return d.id; })    // provide the id of a node
            .strength(function(d) {   
              if (d.source.label[0] == d.target.label[0]) {
                return 1; // stronger link for links within a group
              }
              else {
                return 0.1; // weaker links for links across groups
              }   
              }) )
        .force("charge", d3.forceManyBody().strength(configData.DRAG_FORCE_STRENGTH))
        .force("center", d3.forceCenter(GRAPH_WIDTH / 2, GRAPH_HEIGHT / 2))
        // .force("x", d3.forceX())
        // .force("y", d3.forceY())
        .force('collide', d3.forceCollide(configData.DRAG_FORCE_COLLIDE));

      // marker with arrowhead
      svg
        .append("defs")
        .append("marker")
        .attr("id", "arrowhead")
        .attr("viewBox", "0 -5 10 10")
        .attr("refX", 21)
        .attr("refY", 0)
        .attr("markerWidth", configData.MARKER_WIDTH)
        .attr("markerHeight", configData.MARKER_HEIGHT)
        .attr("xoverflow", "visible")
        .attr("orient", "auto")
        .append("path")
        .attr("fill", "#aaa")
        .attr("d", 'M 0,-5 L 10 ,0 L 0,5');
      
      function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      }
      
      function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
      }
      
      function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      }

      var colorScale = d3.scaleOrdinal(d3.schemeCategory10);

      var links = g.append("g")
        .attr("class", "links")
        .selectAll(".link")
        .data(data.links)
        .enter()
        .append("line")
        .attr("id", function(d, i) {
          return "linkId_" + i;
        })
        .attr("stroke", "#aaa")
        .attr("stroke-width", configData.LINK_WIDTH)
        .attr('marker-end','url(#arrowhead)');

      var nodes = g.append("g")
        .attr("class", "nodes")
        .selectAll(".node")
        .data(data.nodes)
        .enter()
        .append("circle")
        .attr("class", "node")
        .attr("r", function(d){
          if (d.links_num > 10) {
            return configData.LARGE_NODE_RADIUS;
          } else if (d.links_num > 4) {
            return configData.MEDIUM_NODE_RADIUS;
          } else {
            return configData.SMALL_NODE_RADIUS;
          }
        })
        .style("fill", d => colorScale(d.label[0]))
        .call(d3.drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended));
      
      var label = g.append("g")
        .attr("class", "labels")
        .selectAll("text")
        .data(data.nodes)
        .enter().append("text")
        .text(function(d) { 
          if (d.version) {
            return d.name + ' ' + d.version;
          } else {
            return d.name;
          }
        })
          .attr('font-size', configData.LABEL_FONT_SIZE)
          .attr('dx', function(d){
            if (d.links_num > 10) {
              return configData.LARGE_NODE_RADIUS + 4;
            } else if (d.links_num > 4) {
              return configData.MEDIUM_NODE_RADIUS + 4;
            } else {
              return configData.SMALL_NODE_RADIUS + 4;
            }
          })
          .attr('dy', function(d){
            if (d.links_num > 10) {
              return configData.LARGE_NODE_RADIUS / 2;
            } else if (d.links_num > 4) {
              return configData.MEDIUM_NODE_RADIUS / 2;
            } else {
              return configData.SMALL_NODE_RADIUS / 2;
            }
          });
      
      var infoPanel = d3.select("#mydata_viz")
          .append("div")
          .attr("class", "tooltip")
          .style("opacity", 0);

      nodes
        .on("mouseover", function(event, d) {
          d3.select(this)
            .transition()
            .duration('100')
            .attr("stroke", "#aaa")
            .attr("r", function(d){
              if (d.links_num > 10) {
                return configData.LARGE_NODE_RADIUS + 3;
              } else if (d.links_num > 4) {
                return configData.MEDIUM_NODE_RADIUS + 3;
              } else {
                return configData.SMALL_NODE_RADIUS + 3;
              }
            });
          
          infoPanel.transition()
            .duration(100)
            .style("opacity", 1);
          
          infoPanel
            .html("Id: " + d.id + "<br>" + "Name: " + d.name + "<br>" + "Version: " + d.version + "<br>" + "Label: " + d.label[0]);
      })
        .on("mouseout", function(event, d) {
          d3.select(this)
            .transition()
            .duration('200')
            .attr("stroke", "none")
            .attr("r", function(d){
              if (d.links_num > 10) {
                return configData.LARGE_NODE_RADIUS;
              } else if (d.links_num > 4) {
                return configData.MEDIUM_NODE_RADIUS;
              } else {
                return configData.SMALL_NODE_RADIUS;
              }
            });
          
          infoPanel.transition()
            .duration('200')
            .style("opacity", 0);
      })
        .on("click", function(event, d) {
          console.log(d);
      });

      //d3 zoom
      const initialScale = configData.INITIAL_SCALE;
      // const initialTranslateX = GRAPH_WIDTH / 2;
      // const initialTranslateY = GRAPH_HEIGHT / 2;
      const zoom = d3.zoom()
        .extent([[0, 0], [GRAPH_WIDTH, GRAPH_HEIGHT]])
        .scaleExtent([-50, 100])
        .on("zoom", zoomed);
      
      g.call(zoom);

      function zoomed({transform}) {
        g.attr("transform", transform)
        //g.attr("transform", `translate(${transform.x + centerX}, ${transform.y + centerY}) scale(${transform.k})`);
      }

      g.call(
        zoom.transform,
        d3.zoomIdentity
          //.translate(initialTranslateX / 2, initialTranslateX / 2)
          .scale(initialScale)
      );

      simulation.on("tick", () => {
          var coords ={};
          var groups = [];
          nodes.each(function(d) {
            if (groups.indexOf(d.label[0]) == -1 ) {
                groups.push(d.label[0]);
                coords[d.label[0]] = [];
            }
            coords[d.label[0]].push({x:d.x,y:d.y});    
          })
          // console.log(coords);
          // console.log(groups);
    
          var centroids = {};
          for (var group in coords) {
            var groupNodes = coords[group];
            var n = groupNodes.length;
            var cx = 0;
            var tx = 0;
            var cy = 0;
            var ty = 0;
        
            groupNodes.forEach(function(d) {
                tx += d.x;
                ty += d.y;
            })
        
            cx = tx/n;
            cy = ty/n;
        
            centroids[group] = {x: cx, y: cy}   
        }
        //console.log(centroids);

        nodes
          .attr("cx", function(d){
            var minDistance = 10;
            var cx = centroids[d.label[0]].x;
            var cy = centroids[d.label[0]].y;
            var x = d.x;
            var y = d.y;
            var dx = cx - x;
            var dy = cy - y;
            var r = Math.sqrt(dx*dx+dy*dy)

            if (r > minDistance) {
              d.x = x * 0.9 + cx * 0.1;
            } 
            return d.x
          })
          .attr("cy", function(d){
            var minDistance = 10;
            var cx = centroids[d.label[0]].x;
            var cy = centroids[d.label[0]].y;
            var x = d.x;
            var y = d.y;
            var dx = cx - x;
            var dy = cy - y;
            var r = Math.sqrt(dx*dx+dy*dy)

            if (r > minDistance) {
              d.y = y * 0.9 + cy * 0.1;
            } 
            return d.y
          });
        
        links
          .attr("x1", (d) => d.source.x)
          .attr("y1", (d) => d.source.y)
          .attr("x2", (d) => d.target.x)
          .attr("y2", (d) => d.target.y);

        label
          .attr("x", function(d) { return d.x; })
          .attr("y", function (d) { return d.y; });
          
        });

      }
    }, [data]);
  
  return (
    <svg width="100%" height="100%" ref={svgRef} />
  );
};

export default Chart;