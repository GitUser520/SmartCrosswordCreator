import logo from './logo.svg';
import './App.css';
import React from 'react';
import {Crossword} from "./Crossword.js";

let i = 0



function App() {
  return (
    <body>
        <h1 className = "App">
            Your Personalized Crossword
        </h1>
        <div className="App">
            <CrosswordComponent grid={[["t","s","z"],["a","a","b"],["c","a","b"]]} />
        </div>
        <hr/>
        <h2> Across </h2>
        <div className="App">
             <HintsComponent grid={[["t","s","z"],["a","a","b"],["c","a","b"]]} />
        </div>
        <h2> Below </h2>
        <div className="App">
            <HintsComponent grid={[["t","s","z"],["a","a","b"],["c","a","b"]]} />
        </div>

    </body>
  );
}

class CrosswordComponent extends React.Component {
    render() {
        var indents = [];
        for (var i = 0; i < this.props.grid.length; i++) {
            for (var j = 0; j < this.props.grid[0].length; j++) {
                //indents.push(<div key={i*3 + j}>{this.props.grid[i][j]}</div>);
                indents.push(<input type="text" name = "fname" id="fname" maxLength="1" key={i*3 + j} className = "input-box"/>);
            }
            indents.push(<br/>)
        }
        return indents;
    }
}

class HintsComponent extends React.Component {
    render() {
        var indents = [];
        return indents;
    }
}


export default App;

