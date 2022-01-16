import logo from './logo.svg';
import './App.css';
import React from 'react';
import {Crossword} from "./Crossword.js";

let testStrings = [
    "autonomy",
    "irk",
    "abstruse",
    "impregnable",
    "mercenary",
    "becoming",
    "futile",
    "furtive",
    "acclaim",
    "aboveboard",
    "contrite",
    "retiring",
    "iconoclastic",
    "redundant",
    "impugn",
    "ineffable",
    "debunk",
    "extolling",
    "voluble",
    "loquacious",
    "gregarious",
    "didactic",
    "obstreperous",
    "mollify",
    "esoteric",
    "languorous",
    "lethargic",
    "officious",
    "tenacity",
    "veracity"
];
let testNum = 30;

var crossword = new Crossword(testStrings, testNum);

function App() {
    return (
        <div>
            <h1 className="header">
                Your Personalized Crossword
            </h1>
            <div className="crossword-container">
                <CrosswordComponent grid={crossword.grid} />
            </div>
            <hr/>
            <h2> Across </h2>
            <div>
                <HintsComponent across={crossword.horizontalWords} />
            </div>
            <h2> Down </h2>
            <div>
                <HintsComponent down={crossword.verticalWords} />
            </div>
        </div>
    );
}

class CrosswordComponent extends React.Component {
    render() {
        var rows = [];
        for (var i = 0; i < this.props.grid.length; i++) {
            rows.push(<div className="row">
                <CrosswordRow rows={this.props.grid[i]} rowNum={i} />
            </div>)
        }
        return rows;
    }
}

class CrosswordRow extends React.Component {
    render() {
        var cells = [];
        for (let i = 0; i < this.props.rows.length; i++) {
            if (this.props.rows[i]) {
                cells.push(<input type="text" id="fname" maxLength="1" key={this.props.rowNum * this.props.rows.length + i} className="input-box"/>);
            } else {
                cells.push(<div key={this.props.rowNum * this.props.rows.length + i} className="blank-box"></div>);
            }
        }
        return cells
    }
}

class HintsComponent extends React.Component {
    render() {
        var indents = [];
        return indents;
    }
}


export default App;