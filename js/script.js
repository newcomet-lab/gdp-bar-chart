function displayChart() {

  axios.get('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json').then((dataset) => {
  }).catch(() => {
  });
}

displayChart();
