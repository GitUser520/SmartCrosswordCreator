import logo from './logo.svg';
import './App.css';
import React from 'react';
import {Crossword} from "./Crossword.js";
import {AppBarComponent} from "./AppBarComponent.js";

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

import { useLocation } from "react-router-dom";

import Axios from "axios";

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

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true,
            dictionary: {},
        };
        this.getMeanings();
    }

    getMeanings() {
        for (let i = 0; i < crossword.horizontalWords.length; i++) {
            Axios.get(
                `https://api.dictionaryapi.dev/api/v2/entries/en_US/${crossword.horizontalWords[i]}`
            ).then((response) => {
                this.setState(state => ({
                    open: state.open,
                    dictionary: { ...state.dictionary, [response.data[0].word]:response.data[0].meanings[0].definitions[0].definition}
                }));
            });
        }
        for (let i = 0; i < crossword.verticalWords.length; i++) {
            Axios.get(
                `https://api.dictionaryapi.dev/api/v2/entries/en_US/${crossword.verticalWords[i]}`
            ).then((response) => {
                this.setState(state => ({
                    open: state.open,
                    dictionary: { ...state.dictionary, [response.data[0].word]:response.data[0].meanings[0].definitions[0].definition}
                }));
            });
        }
    }

    render() {
        return (
            <div>
                <Dialog open={this.state.open} onClose={() => this.setState({ open: !this.state.open })} fullScreen TransitionComponent={Transition}>
                    <DialogTitle>Please Enter Vocabulary</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Enter vocabulary
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Words"
                            multiline
                            rows={36}
                            fullWidth
                            variant="standard"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.setState({ open: !this.state.open })}>Finish</Button>
                    </DialogActions>
                </Dialog>
                <AppBarComponent/>
                <div className="crossword-container">
                    <CrosswordComponent grid={crossword.grid}/>
                </div>
                <hr/>
                <div className="hints-container">
                    <div className="hints">
                        <h2> Across </h2>
                        <HintsComponent hints={crossword.horizontalWords} meanings={this.state.dictionary}/>
                    </div>
                    <div className="hints">
                        <h2> Down </h2>
                        <HintsComponent hints={crossword.verticalWords} meanings={this.state.dictionary}/>
                    </div>
                </div>
            </div>
        );
    }
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
                cells.push(<div className="wrapper"><input type="text" id="fname" maxLength="1" key={this.props.rowNum * this.props.rows.length + i} className="input-box" onInput={(e) => {e.target.value = ("" + e.target.value).toUpperCase()}}/></div>);
                // cells.push(<div className="wrapper"><div className="sub">1.</div><input type="text" id="fname" maxLength="1" key={this.props.rowNum * this.props.rows.length + i} className="input-box"/></div>);
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
                    <li key={index}>{this.props.meanings[item]}</li>
                ))}
            </ol>
        );
    }
}


export default App;