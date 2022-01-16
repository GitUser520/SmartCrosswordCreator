import './App.css';
import React from 'react';
import { CrosswordComponentReact } from "./CrosswordComponent.js";

function App() {
  return (
    <div className="App">
        <CrosswordComponentReact grid={[["t","s","z"],["a","a","b"],["c","a","b"]]} />
    </div>
  );
}



export default App;

