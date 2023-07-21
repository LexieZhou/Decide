import React, { useState, useEffect } from 'react';
import * as d3 from "d3";
import jsonData from '../data/new_records.json';
import configData from '../data/config.json';
import './Chart.css';
import ToggleSideBar from './ToggleSideBar';

export const handleResultClick = (resultId) => {
  // console.log(`You clicked on ${resultName}, id: ${resultId}`);
  var wholeView = true;
  if (resultId === "") {
    wholeView = true;
    createGraph(jsonData, wholeView);
  } else {
    wholeView = false;
    const [filteredNodes, filteredLinks] = filterData(resultId);
    const newData = {
      "nodes": filteredNodes,
      "links": filteredLinks
    };
    createGraph(newData, wholeView);
  }
}

export const filterData = (resultId) => {
  console.log("resultId: ", resultId);
  const targetId = parseInt(resultId);
  const filteredNodes = jsonData.nodes.filter(node => {
      return node.id === targetId || node.childrens.includes(targetId);
  });
  const filteredLinks = jsonData.links.filter(link => {
      // console.log("link: ", link);
      return link.source.id === targetId || link.target.id === targetId;
  });
  return [filteredNodes, filteredLinks];
}

export const createGraph = (data, wholeView) => {
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
    .forceSimulation(data.nodes)
    .force("link", 
      d3.forceLink(data.links)                // This force provides links between nodes
        .id(function(d) { return d.id; })    // provide the id of a node
        .links(data.links)
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
    .data(data.links)
    .enter()
    .append("line")
    .attr("id", function(d, i) {
      return "linkId_" + i;
    })
    .attr("stroke", "#aaa")
    .attr("stroke-width", configData.LINK_WIDTH)
    .attr('marker-end','url(#arrowhead)')
    .on('click', function(d) {
      var linkData = d.srcElement.__data__;
      console.log("click link", linkData.id);
      document.getElementById('right-panel').classList.add('open');
      const event = new CustomEvent('linkClick', { detail: linkData });
      window.dispatchEvent(event);
      // var panelContent = document.getElementById('panel-content');
      // panelContent.innerHTML = '<h2>Link Info</h2>' +
      // '<p>Link Id: ' + linkData.id + '</p>' +
      // '<p>Node 1: ' + linkData.source.name + '</p>' +
      // '<p>Node 2: ' + linkData.target.name + '</p>'
    });

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
    .style("fill", d => configData.COLOR[d.label[0]])
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
  console.log("initilaScale: " + initialScale);
  // const initialScale = configData.INITIAL_SCALE;
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
    .translate(configData.GRAPH_WIDTH / 18 / initialScale, configData.GRAPH_HEIGHT / 18 / initialScale)
    .scale(initialScale);

  svg.call(zoom.transform,initialTransform);

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
    createGraph(jsonData);
  }, [jsonData]);
  
  return (
    <div id="chart">
      <ToggleSideBar />
    </div>
  );
};

export default ChartForce;