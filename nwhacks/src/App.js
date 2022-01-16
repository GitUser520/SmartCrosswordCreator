import logo from './logo.svg';
import './App.css';
import React from 'react';
import {Crossword} from "./Crossword.js";
import {AppBarComponent} from "./AppBarComponent.js";
import {
    TextField
} from "@mui/material"
import { useLocation } from "react-router-dom";


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

    // const location = useLocation();
    // const { textValue } = location.state;
    const textValue = "Hello";

    return (
        <div>
            <AppBarComponent />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <TextField label={ textValue }>

            </TextField>
            <div className="crossword-container">
                <CrosswordComponent grid={crossword.grid} />
            </div>
            <hr/>
            <div className="hints-container">
                <div className="hints">
                    <h2> Across </h2>
                    <HintsComponent hints={crossword.horizontalWords} />
                </div>
                <div className="hints">
                    <h2> Down </h2>
                    <HintsComponent hints={crossword.verticalWords} />
                </div>
            </div>
        </div>
    );
}

class CrosswordComponent extends React.Component {
    render() {
        let rows = [];
        for (var i = 0; i < this.props.grid.length; i++) {
            rows.push(
                <div className="row">
                    <CrosswordRow rows={this.props.grid[i]} rowNum={i} />
                </div>
            )
        }
        return rows;
    }
}

class CrosswordRow extends React.Component {
    render() {
        let cells = [];
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
        return (
            <ol>
                {this.props.hints.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ol>
        );
    }
}


export default App;