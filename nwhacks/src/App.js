import logo from './logo.svg';
import './App.css';
import React from 'react';
import {Crossword} from "./Crossword.js";
import {AppBarComponent} from "./AppBarComponent.js";

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
            words: "",
            num: 10
        };
    }

    initCrossword() {
        let wordList = this.state.words.split(/[\n\r\s,.]+/);
        wordList = wordList.filter(item => item.match(/^[A-Za-z]+$/) && item.length > 2);
        this.setState(state => ({
            open: !state.open,
            crossword: new Crossword(wordList, state.num)
        }));
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
                });
            }
        }
    }

    render() {
        if (!this.state.open) {
            this.getMeanings();
            return (
                <div>
                    <div className="crossword-container">
                        <CrosswordComponent grid={this.state.crossword.grid}/>
                    </div>
                    <hr/>
                    <div className="hints-container">
                        <div className="hints">
                            <h2> Across </h2>
                            <HintsComponent hints={this.state.crossword.horizontalWords} meanings={this.state.dictionary}/>
                        </div>
                        <div className="hints">
                            <h2> Down </h2>
                            <HintsComponent hints={this.state.crossword.verticalWords} meanings={this.state.dictionary}/>
                        </div>
                    </div>
                </div>
            );
        }
        return (
            <div>
                <Dialog open={this.state.open} onClose={() => this.initCrossword()} fullScreen TransitionComponent={Transition}>
                    <DialogTitle className = "header" fontSize = "30px">Smart Crossword Creator
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
                <AppBarComponent/>
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