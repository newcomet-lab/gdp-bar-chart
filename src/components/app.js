import React from 'react';

import BarChart from './bar-chart';

const App = () => {
  return (
    <React.Fragment>
      <header>
        <h1>United States GDP</h1>
        <h2>1947-2015</h2>
      </header>
      <main>
        <BarChart />
      </main>
      <footer>Created by D3.js &copy; {new Date().getFullYear()}</footer>
    </React.Fragment>
  );
}

export default App;