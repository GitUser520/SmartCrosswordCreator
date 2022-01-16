import './App.css';
import React from 'react';
import { CrosswordComponentReact } from "./CrosswordComponent.js";
import { HomePage } from "./HomePage.js";

function App() {
      return (
            <div className="App">
                <HomePage />
                <br/>
                <CrosswordComponentReact grid={[["t","s","z"],["a","a","b"],["c","a","b"]]} />
            </div>
      );
}



export default App;

