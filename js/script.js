function displayChart() {
  const margin = {
    top: 50,
    right: 40,
    bottom: 40,
    left: 110
  };
  let w;
  let h;

  d3.json('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json').then(dataset => {
    const xScale = d3.scaleTime()
      .domain(d3.extent(dataset.data, (d) => new Date(d[0])));
    const yScale = d3.scaleLinear()
      .domain([0, d3.max(dataset.data, (d) => d[1])]);
    const svg = d3.select('.chart')
      .append('svg');

    svg.append('g')
      .attr('class', 'x-axis');

    svg.append('g')
      .attr('class', 'y-axis')
      .attr('transform', `translate(${margin.left}, 0)`);

    svg.append('text')
      .attr('class', 'y-label')
      .attr('transform', 'rotate(-90)')
      .attr('x', -290)
      .attr('y', 40)
      .attr('fill', '#fff')
      .text('Gross Domestic Product in Billions');

    svg.selectAll('rect')
      .data(dataset.data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('fill', '#4ddbff')
      .on('mouseover', handleMouseover)
      .on('mouseout', handleMouseout);

    function handleMouseover(d) {
      const quarter = [
        '01',
        '04',
        '07',
        '10'
      ];
      const tooltip = d3.select('.chart')
        .append('div')
        .attr('class', 'tooltip')
        .style('visibility', 'hidden');

      d3.select(this)
        .attr('fill', '#333');

      tooltip.transition()
        .duration(200)
        .style('visibility', 'visible');

      tooltip.html(`${d[0].split('-')[0]} Q${quarter.indexOf(d[0].split('-')[1]) + 1}<br/>$${d[1]}B`)
        .style('left', `${d3.event.pageX - 50}px`)
        .style('top', `${d3.event.pageY - 80}px`);
    }

    function handleMouseout() {
      d3.select(this)
        .attr('fill', '#4ddbff');

      d3.select('.tooltip').remove();
    }

    function resize() {
      w = window.innerWidth * 0.9;

      if (w < 800) {
        w = 800;
        h = w * 0.8;
      }
      else {

        if (window.innerWidth < window.innerHeight) {
          h = window.innerHeight * 0.6;
        }
        else {
          h = window.innerHeight * 0.8;
        }
      }

      xScale.range([margin.left, w - margin.right]);
      yScale.range([h - margin.top, margin.bottom]);

      svg.attr('viewBox', `0 0 ${w} ${h}`);

      svg.select('.x-axis')
        .attr('transform', `translate(0, ${h - margin.top})`)
        .call(d3.axisBottom(xScale));

      svg.select('.y-axis')
        .call(d3.axisLeft(yScale));

      svg.selectAll('.bar')
        .attr('x', (d) => xScale(new Date(d[0])))
        .attr('y', (d) => yScale(d[1]))
        .attr('width', w / dataset.data.length)
        .attr('height', (d) => h - yScale(d[1]) - margin.top);
    }

    resize();

    d3.select(window)
      .on('resize', resize);
  }).catch((err) => {
    document.querySelector('.error-message').style.display = 'block';
  });
}

displayChart();
