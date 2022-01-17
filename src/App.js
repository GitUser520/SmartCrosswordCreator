import logo from './logo.svg';
import './App.css';
import React from 'react';
import {Crossword} from "./Crossword.js";
import CompleteAppBar from "./AppBarComponent.js";

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Typography from '@mui/material/Typography';

import Axios from "axios";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true,
            dictionary: {},
            crossword: null,
            inputGrid: [],
            words: "",
            num: 10
        };
    }

    initCrossword() {
        let wordList = this.state.words.split(/[\n\r\s,.]+/);
        wordList = wordList.filter(item => item.match(/^[A-Za-z]+$/) && item.length > 2); // TODO: get meanings called here
        wordList = wordList.map(item => item.toLowerCase());
        let newCrossword =  new Crossword(wordList, this.state.num);
        let current = Array(newCrossword.grid.length).fill().map(() => Array(newCrossword.grid[0].length).fill(null));
        this.setState(state => ({
            open: !state.open,
            crossword: newCrossword,
            inputGrid: current,
        }));
        this.render();
    }

    handleWordsChange = (e) => {
        this.setState(state => ({
            words: e.target.value
        }));
    }

    handleNumsChange = (e) => {
        this.setState(state => ({
            num: e.target.value
        }));
    }

    getMeanings() {
        if (Object.keys(this.state.dictionary).length === 0) {
            for (let i = 0; i < this.state.crossword.horizontalWords.length; i++) {
                Axios.get(
                    `https://api.dictionaryapi.dev/api/v2/entries/en_US/${this.state.crossword.horizontalWords[i]}`
                ).then((response) => {
                    this.setState(state => ({
                        dictionary: {
                            ...state.dictionary,
                            [response.data[0].word]: response.data[0].meanings[0].definitions[0].definition
                        }
                    }));
                    this.forceUpdate()
                });
            }
            for (let i = 0; i < this.state.crossword.verticalWords.length; i++) {
                Axios.get(
                    `https://api.dictionaryapi.dev/api/v2/entries/en_US/${this.state.crossword.verticalWords[i]}`
                ).then((response) => {
                    this.setState(state => ({
                        dictionary: {
                            ...state.dictionary,
                            [response.data[0].word]: response.data[0].meanings[0].definitions[0].definition
                        }
                    }));
                    this.forceUpdate()
                });
            }
        }
    }


    checkSolution = () => {
        for (let i = 0; i < this.state.crossword.grid.length; i++) {
            for (let j = 0; j < this.state.crossword.grid[0].length; j++) {
                if (this.state.inputGrid[i][j] === null && this.state.crossword.grid[i][j] === null) {
                    continue;
                }
                if (this.state.inputGrid[i][j] === null || this.state.crossword.grid[i][j] === null) {
                    alert("Your answer was not correct. Please try again.");
                    return;
                }
                if (this.state.inputGrid[i][j].toLowerCase() !== this.state.crossword.grid[i][j]) {
                    alert("Your answer was not correct. Please try again.");
                    return;
                }
            }
        }
        alert("Congratulations! Press new game to generate new crossword.");
    }

    displaySolution = () => {
        let tempGrid = this.state.inputGrid;
        for (let i = 0; i < this.state.crossword.grid.length; i++) {
            for (let j = 0; j < this.state.crossword.grid[0].length; j++) {
                if (this.state.crossword.grid[i][j] !== null) {
                    tempGrid[i][j] = this.state.crossword.grid[i][j].toUpperCase();
                    document.getElementById(i*this.state.crossword.grid[0].length + j).value = this.state.crossword.grid[i][j].toUpperCase();
                }
            }
        }
        this.setState(state => ({
            inputGrid: tempGrid
        }));
    }

    resetWords = () => {
        this.initCrossword();
        this.setState(state => ({
            dictionary: {}
        }));
    }

    newGame = () => {
        for (let i = 0; i < this.state.crossword.grid.length; i++) {
            for (let j = 0; j < this.state.crossword.grid[0].length; j++) {
                if (this.state.crossword.grid[i][j] !== null) {
                    document.getElementById(i*this.state.crossword.grid[0].length + j).value = "";
                }
            }
        }
        let wordList = this.state.words.split(/[\n\r\s,.]+/);
        wordList = wordList.filter(item => item.match(/^[A-Za-z]+$/) && item.length > 2); // TODO: get meanings called here
        let newCrossword =  new Crossword(wordList, this.state.num);
        let current = Array(newCrossword.grid.length).fill().map(() => Array(newCrossword.grid[0].length).fill(null));
        this.setState(state => ({
            open: false,
            crossword: newCrossword,
            inputGrid: current
        }));
    }

    clicked = (i, j) => {
        let newGrid = this.state.inputGrid;
        newGrid[i][j] = document.getElementById(i*this.state.crossword.grid[0].length + j).value;
        this.setState(state => ({
            inputGrid: newGrid
        }));
    }

    render() {
        if (!this.state.open) {
            this.getMeanings();
            return (
                <div>
                    <CompleteAppBar checkSolution={this.checkSolution} displaySolution={this.displaySolution} newGame={this.newGame} resetWords={this.resetWords}/>
                    <div className="crossword-container">
                        <CrosswordComponent grid={this.state.crossword.grid} clicked={this.clicked} starts={this.state.crossword.gridStarts}/>
                    </div>
                    <hr/>
                    <div className="hints-container">
                        <div className="hints">
                            <h2> Across </h2>
                            <HintsComponent hints={this.state.crossword.horizontalWords} meanings={this.state.dictionary} dict={this.state.crossword.wordNumbers}/>
                        </div>
                        <div className="hints">
                            <h2> Down </h2>
                            <HintsComponent hints={this.state.crossword.verticalWords} meanings={this.state.dictionary} dict={this.state.crossword.wordNumbers}/>
                        </div>
                    </div>
                </div>
            );
        }
        return (
            <div>
                <Dialog open={this.state.open} onClose={() => this.initCrossword()} fullScreen TransitionComponent={Transition}>
                    <DialogTitle className = "header" fontSize = "30px">
                        Smart Crossword Creator
                    </DialogTitle>
                    <DialogContent className = "header">
                        <DialogContentText>
                            Enter your vocabulary below to create a crossword.
                            <br/>
                            Please do not include any one or two letter words, and include only a space between every word
                            <br/>
                            For Example: Apple Banana Citrus Watermelon
                        </DialogContentText>
                        <br />
                        <TextField ref="num" defaultValue={10} fullWidth label="Number of words per crossword" type="number" onChange={this.handleNumsChange}/>
                        <TextField
                            ref="words"
                            autoFocus
                            margin="normal"
                            id="name"
                            label={
                                <Typography variant="headline" component="h2"> Words </Typography>
                            }
                            fontSize = '25px'
                            multiline
                            rows={16}
                            fullWidth
                            variant="outlined"
                            onChange={this.handleWordsChange}
                        />
                    </DialogContent>
                    <DialogActions>
                       <Button
                           onClick={() => this.initCrossword()}
                           variant="contained"
                           style ={{
                               maxWidth: '140px',
                               maxHeight: '70px',
                               minWidth: '140px',
                               minHeight: '70px',
                               fontSize: '18px'
                           }}>
                           Create Crossword!
                       </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

class CrosswordComponent extends React.Component {
    clicked = (i, j) => {
        this.props.clicked(i, j);
    }

    render() {
        let rows = [];
        for (var i = 0; i < this.props.grid.length; i++) {
            rows.push(
                <div className="row">
                    <CrosswordRow rows={this.props.grid[i]} rowNum={i} clicked={this.clicked} starts={this.props.starts} />
                </div>
            )
        }
        return rows;
    }
}

class CrosswordRow extends React.Component {
    clicked(i, j) {
        this.props.clicked(i, j);
    }

    render() {
        let cells = [];
        for (let i = 0; i < this.props.rows.length; i++) {
            if (this.props.rows[i]) {
                if (this.props.starts[this.props.rowNum][i][0] || this.props.starts[this.props.rowNum][i][1]) {
                    cells.push(
                        <div className="wrapper">
                            <input
                                type="text"
                                id={this.props.rowNum * this.props.rows.length + i}
                                maxLength="1"
                                key={this.props.rowNum * this.props.rows.length + i}
                                className="input-box"
                                onInput={(e) => {
                                    e.target.value = ("" + e.target.value).toUpperCase()
                                }}
                            />
                            <div className="sub">{this.props.starts[this.props.rowNum][i][2]}.</div>
                        </div>);
                } else {
                    cells.push(
                        <div className="wrapper">
                            <input
                                type="text"
                                id={this.props.rowNum * this.props.rows.length + i}
                                maxLength="1"
                                key={this.props.rowNum * this.props.rows.length + i}
                                className="input-box"
                                onInput={(e) => {
                                    e.target.value = ("" + e.target.value).toUpperCase()
                                }}
                            />
                            <div className="sub"></div>
                        </div>);
                }

            } else {
                cells.push(<div key={this.props.rowNum * this.props.rows.length + i} className="blank-box"></div>);
            }
        }
        return cells
    }
}

class HintsComponent extends React.Component {
    render() {
        let cells = [];

        for (let i = 0; i < this.props.hints.length; i++) {
            cells.push(<div>{this.props.dict[this.props.hints[i]]}.  {this.props.meanings[this.props.hints[i]]}</div>);
        }
        return cells;
    }
}


export default App;