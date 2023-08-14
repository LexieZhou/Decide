import React, { useState, useEffect } from 'react';
import * as d3 from "d3";
import configData from '../data/config.json';
import './Chart.css';
import ToggleSideBar from './ToggleSideBar';

// filter data by targetId
export const filterData = async (targetId) => {
  try {
    const response1 = await fetch(`http://localhost:4030/filter/nodes/${targetId}`);
    const filteredNodesData = await response1.json();
    // console.log(filteredNodesData);

    const response2 = await fetch(`http://localhost:4030/filter/links/${targetId}`);
    const filteredlinksData = await response2.json();
    // console.log(filteredlinksData);

    createGraph(filteredNodesData, filteredlinksData, false);
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};

// fetch whole nodes and links data
export const fetchData = async () => {
  try {
    const response1 = await fetch(`http://localhost:4030/nodes`);
    const nodesData = await response1.json();
    // console.log(nodesData);

    const response2 = await fetch(`http://localhost:4030/links`);
    const linksData = await response2.json();
    // console.log(linksData);
    
    createGraph(nodesData, linksData, true);

  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};

export const filterDatabyEntityName = async (entityName) => {
  try {
    const official_entityName = configData.LIBRARIES[entityName];
    const response1 = await fetch(`http://localhost:4030/filter/nodes/entity/${official_entityName}`);
    const filteredEntityData = await response1.json();

    const response2 = await fetch(`http://localhost:4030/filter/links/entity/${official_entityName}`);
    const filteredlinksData = await response2.json();

    createGraph(filteredEntityData, filteredlinksData, false);
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};


export const createGraph = (nodesData, linksData, wholeView) => {
  const GRAPH_WIDTH = configData.GRAPH_WIDTH;
  const GRAPH_HEIGHT = configData.GRAPH_HEIGHT;

  // console.log("Run createGraph");
  // detect whether exists svg and tooltip
  const existingSvg = d3.select("#graph-svg");
  const existingTooltip = d3.select("#chart").select(".tooltip");
  if (existingSvg) {
    existingSvg.remove();
  }
  if (existingTooltip) {
    // console.log("exist tooltip");
    existingTooltip.remove();
  }

  const svg = d3.select("#chart")
    .append("svg")
    .attr("id", "graph-svg")
    .attr("width", GRAPH_WIDTH)
    .attr("height", GRAPH_WIDTH)
    .attr("viewbox", [0, 0, GRAPH_WIDTH, GRAPH_HEIGHT])
    // .style("border", "1px solid black")
    // .attr("x", 200)
    // .attr("y", 50)

  const g = svg.append('g')
    .attr("id", "graph-g")
    .attr('transform', 'translate(0, 0) scale(1)');

  const simulation = d3
    .forceSimulation(nodesData)
    .force("link", 
      d3.forceLink(linksData)                // This force provides links between nodes
        .id(function(d) { return d.id; })    // provide the id of a node
        .links(linksData)
        .distance(configData.LINK_DISTANCE_FORCE)    // the list of links
      )
    .force("charge", d3.forceManyBody().strength(configData.DRAG__STRENGTH_FORCE))
    .force("center", d3.forceCenter(GRAPH_WIDTH / 2, GRAPH_HEIGHT / 2))
    .force("x", d3.forceX())
    .force("y", d3.forceY())
    .force('collide', d3.forceCollide(configData.DRAG_COLLIDE_FORCE));

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

  var links = g.append("g")
    .attr("class", "links")
    .selectAll(".link")
    .data(linksData)
    .enter()
    .append("line")
    .attr("id", function(d, i) {
      return "linkId_" + i;
    })
    .attr("stroke", "#aaa")
    .attr("stroke-width", configData.LINK_WIDTH)
    .attr('marker-end','url(#arrowhead)')
    .attr("stroke-dasharray", function(d) {
      if (d.properties.verdict === "no") {
          return "5,5";
      } else {
          return null;
      }
    })
    .on('click', function(d) {
      var linkData = d.srcElement.__data__;
      console.log("click link", linkData.id);
      document.getElementById('right-panel').classList.add('open');
      const event = new CustomEvent('linkClick', { detail: linkData });
      window.dispatchEvent(event);
    });

  var nodes = g.append("g")
    .attr("class", "nodes")
    .selectAll(".node")
    .data(nodesData)
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
    .style("fill", d => configData.COLOR[d.label[0]])
    .call(d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended));

  var label = g.append("g")
    .attr("class", "labels")
    .selectAll("text")
    .data(nodesData)
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

  var infoPanel = d3.select("#chart")
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
  var initialScale = configData.INITIAL_SCALE_FORCE;
  if (wholeView === false) {
    initialScale = configData.RESULT_SCALE;
  }
  const zoom = d3.zoom()
    .extent([[0, 0], [GRAPH_WIDTH, GRAPH_HEIGHT]])
    .scaleExtent([-50, 100])
    .on("zoom", zoomed);

  svg.call(zoom);

  function zoomed({transform}) {
    g.attr("transform", transform)
    // g.attr("transform", `translate(${transform.x + centerX}, ${transform.y + centerY}) scale(${transform.k})`);
  }
  var initialTransform = d3.zoomIdentity
    .translate(configData.GRAPH_WIDTH / 15 / initialScale, configData.GRAPH_HEIGHT / 15 / initialScale)
    .scale(initialScale);

  svg.call(zoom.transform, initialTransform);

  simulation.on("tick", () => {
    nodes
      .attr("cx", function(d){
        return d.x
      })
      .attr("cy", function(d){
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

};

const ChartForce = () => {

  useEffect(() => {
    fetchData();
  }, []);
  
  return (
    <div id="chart">
      <ToggleSideBar />
    </div>
  );
};

export default ChartForce;