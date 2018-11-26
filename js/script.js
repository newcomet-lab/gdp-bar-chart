function displayChart() {

  axios.get('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json').then((dataset) => {
    const data = dataset.data.data;
    const w = 700;
    const h = 500;
    const padding = {
      top: 40,
      right: 30,
      bottom: 30,
      left: 100
    };
    const xScale = d3.scaleTime()
      .domain(d3.extent(data, (d) => new Date(d[0])))
      .range([padding.left, w - padding.right]);
    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, (d) => d[1])])
      .range([h - padding.top, padding.bottom]);
    const svg = d3.select('.chart')
      .append('svg')
      .attr('width', w)
      .attr('height', h);

    svg.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0, ${h - padding.top})`)
      .call(d3.axisBottom(xScale));

    svg.append('g')
      .attr('class', 'y-axis')
      .attr('transform', `translate(${padding.left}, 0)`)
      .call(d3.axisLeft(yScale));

    svg.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', -400)
      .attr('y', 30)
      .text('Gross Domestic Product in Billions');

    svg.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => xScale(new Date(d[0])))
      .attr('y', (d) => yScale(d[1]))
      .attr('width', w/275)
      .attr('height', (d) => h - yScale(d[1]) - padding.top)
      .attr('fill', '#522d86');

  }).catch(() => {
  });
}

displayChart();
