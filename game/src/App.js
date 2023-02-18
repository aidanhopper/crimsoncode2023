import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <div className="jumbotron text-center">
      <header>
      </header>
      <Game />
    </div>
  );
}

function Game() {
  const [mode, setMode] = useState('start');
  return (
    <div className="">
      {mode === 'start' && (
        <StartMenu onStartClick={() => setMode('kahoot')} />
      )}
      {mode === 'kahoot' && <Kahoot />}

    </div>
  )
}

function StartMenu({ onStartClick }) {
  return (
    <div>
      <button class="btn" onClick={ onStartClick }>
        start game
      </button>
    </div>
  )
}

function Kahoot() {
  let question1 = "asdf?";
  let answer = 1;
  let answers = ["yes", "no", "maybe", "so"];
  return (
    <>
      <h1>{question1}</h1>
      <div class="row">
        <button class="btn btn-lg">
          {answers[0]}
        </button>
        <button class="btn btn-lg">
          {answers[1]}
        </button>
      </div>
      <div class="row">
        <button class="btn btn-lg">
          {answers[2]}
        </button>
        <button class="btn btn-lg">
          {answers[3]}
        </button>
      </div>
    </>
  )
}

export default App;
