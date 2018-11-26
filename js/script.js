function displayChart() {

  axios.get('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json').then((dataset) => {
    const w = 700;
    const h = 500;
    const svg = d3.select('.chart')
      .append('svg')
      .attr('width', w)
      .attr('height', h);
  }).catch(() => {
  });
}

displayChart();
