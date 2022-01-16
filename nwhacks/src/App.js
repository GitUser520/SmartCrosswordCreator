import logo from './logo.svg';
import './App.css';
import React from 'react';

let i = 0

function App() {
  return (
    <div className="App">
      <CrosswordComponent grid={[["t","s","z"],["a","a","b"],["c","a","b"]]} />
    </div>
  );
}

class CrosswordComponent extends React.Component {
    render() {
        var indents = [];
        for (var i = 0; i < this.props.grid.length; i++) {
            for (var j = 0; j < this.props.grid[0].length; j++) {
                indents.push(<div key={i*3 + j}>{this.props.grid[i][j]}</div>);
            }
        }
        return indents;
    }
}

export default App;

