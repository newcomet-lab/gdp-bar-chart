import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';
import LoadingSpinner from './loading-spinner';
import ErrorMessage from './error-message';

const BarChart = () => {
  const margin = {
    top: 50,
    right: 40,
    bottom: 40,
    left: 110
  };
  const w = 800;
  const h = w * 0.5;

  const [loadingStatus, setLoadingStatus] = useState(true);
  const [loadSuccess, setLoadSuccess] = useState(false);

  useEffect(() => {
    d3.json('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json').then(dataset => {
      setLoadingStatus(false);
      setLoadSuccess(true);
      
      const xScale = d3.scaleTime()
        .domain(d3.extent(dataset.data, (d) => new Date(d[0])))
        .range([margin.left, w - margin.right]);
      const yScale = d3.scaleLinear()
        .domain([0, d3.max(dataset.data, (d) => d[1])])
        .range([h - margin.top, margin.bottom]);

      d3.select('.x-axis')
        .call(d3.axisBottom(xScale));

      d3.select('.y-axis')
        .call(d3.axisLeft(yScale));
      
      d3.select('.bar-chart').selectAll('.bar')
        .data(dataset.data)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', (d) => xScale(new Date(d[0])))
        .attr('y', (d) => yScale(d[1]))
        .attr('width', w / dataset.data.length)
        .attr('height', (d) => h - yScale(d[1]) - margin.top)
        .attr('fill', '#4ddbff')
        .on('mouseover', handleMouseover)
        .on('mouseout', handleMouseout);
    }).catch(() => {
      setLoadingStatus(false);
      setLoadSuccess(false);
    });
  }, []);

  function handleMouseover(event, d) {
    const quarter = [
      '01',
      '04',
      '07',
      '10'
    ];
    const tooltip = d3.select('.chart-container')
      .append('div')
      .attr('class', 'tooltip')
      .style('visibility', 'hidden');

    d3.select(event.currentTarget)
      .attr('fill', 'hsl(0, 0%, 20%)');

    tooltip.transition()
      .duration(200)
      .style('visibility', 'visible');

    tooltip.html(`${d[0].split('-')[0]} Q${quarter.indexOf(d[0].split('-')[1]) + 1}<br/>$${d[1]}B`)
      .style('left', `${(event.pageX - 50)}px`)
      .style('top', `${(event.pageY - 80)}px`);
  }

  function handleMouseout(event) {
    d3.select(event.currentTarget)
      .attr('fill', '#4ddbff');
    
    d3.select('.tooltip').remove();
  }

  return (
    <div className="chart-container">
      {loadingStatus ? <LoadingSpinner /> : loadSuccess ? <svg className="bar-chart" viewBox={`0 0 ${w} ${h}`}>
        <g className="x-axis" transform={`translate(0, ${h - margin.top})`} style={{ fontFamily: "'Noto Sans', sans-serif" }}></g>
        <g className="y-axis" transform={`translate(${margin.left}, 0)`} style={{fontFamily: "'Noto Sans', sans-serif"}}></g>
        <text className="y-label" x="-260" y="40" transform="rotate(-90)">Gross Domestic Product in Billions</text>
      </svg> : <ErrorMessage />}
    </div>
  );
}

export default BarChart;