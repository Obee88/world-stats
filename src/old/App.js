import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    const o = { 
      a: 1,
      b: 2,
      c: 3,
      d: 4,
    };
    const { a, ...rest } = o;
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <ul>
          <li>
            a = {a}
          </li>
          {
            Object.keys(rest).map(
              (element) => (
                <li>
                  {element}
                </li>
              )
            )
          }

        </ul>
      </div>
    );
  }
}

export default App;
