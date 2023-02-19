import { useState, useEffect } from 'react';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <div class="header jumbotron text-center">
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
  let ansBtn = "btn btn-block answer-btn"

  let questions = [
    ["What color is the sky?", ["red", "blue", "green", "orange"], 1],
    ["What shoes am i wearing?", ["boots", "sneakers", "heels", "sandals"], 0],
  ];

  const [answerClicked, setAnswerClicked] = useState(0);
  const [question, setQuestion] = useState(0);

  const update = (ans) => {
    setAnswerClicked(ans);
    setQuestion(question + 1);
    question = question + 1;
  }

  return (
    <div className="container">
      <div className="row">
      <h1>{questions[question][0]}</h1>
      <button className={ansBtn} onClick={() => update(0) }>
        {questions[question][1][0]}
      </button>
      <button className={ansBtn} onClick={() => update(1)}>
        {questions[question][1][1]}
      </button>
    </div>
    <div className="row">
      <button className={ansBtn} onClick={() => update(2)}>
        {questions[question][1][2]}
      </button>
      <button className={ansBtn} onClick={() => update(3)}>
        {questions[question][1][3]}
      </button>
    </div>
    </div>
  )
}


export default App;
