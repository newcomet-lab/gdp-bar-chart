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
      <footer>Created by <a href="https://autumnchris.github.io/portfolio" target="_blank">Autumn Bullard</a> &copy; {new Date().getFullYear()}</footer>
    </React.Fragment>
  );
}

export default App;