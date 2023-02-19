import { useState } from 'react';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <div class="blue header jumbotron text-center">
      <Game /> 
    </div>
  );
}

function Game() {
  const [mode, setMode] = useState('start');
  const [questionIndex, setQuestion] = useState(0);

  let questions = [
    ["What color is the sky?", ["red", "blue", "green", "orange"], 1],
    ["What shoes am i wearing?", ["boots", "sneakers", "heels", "sandals"], 0],
    ["What is the capitol of Canada", ["Calgary", "Kamloops", "Vancouver", "Montreal"], 3],
  ];

  let question = questions[questionIndex];

  return (
    <div className="">
      {mode === 'start' && (
        <StartMenu onStartClick={() => setMode('question')}/>
      )}
      {mode === 'question' && (
        <Question goToAnswerScreen={() => setMode('answer')}
        question = {() => {return question}}
        />
      )}
      {mode === 'answer' && (
        <Answer goToQuestionScreen={() => setMode('question')} 
        nextQuestion = {() => setQuestion(questionIndex + 1)}
        question = {() => {return question}}
       />
      )}
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

function Question({ goToAnswerScreen, question }) {
  let ansBtn = "btn btn-block answer-btn"
  const [answerClicked, setAnswerClicked] = useState(-1);


  const timer = (time) => {
    setTimeout(() => {
      goToAnswerScreen();
    }, time * 1000);
  }

  timer(5);

  return (
    <div className="container">
      <div className="row">
      <h1>{question()[0]}</h1>
      <button className={ansBtn} onClick={() => setAnswerClicked(0) }>
        {question()[1][0]}
      </button>
      <button className={ansBtn} onClick={() => setAnswerClicked(1)}>
        {question()[1][1]} 
      </button>
    </div>
    <div className="row">
      <button className={ansBtn} onClick={() => setAnswerClicked(2)}>
        {question()[1][2]}
      </button>
      <button className={ansBtn} onClick={() => setAnswerClicked(3)}>
        {question()[1][3]}
      </button>
    </div>
    </div>
  )
}

function Answer({ goToQuestionScreen, nextQuestion , question }) {

  const timer = (time) => {
    setTimeout(() => {
      nextQuestion()
      goToQuestionScreen();
    }, time * 1000)
  }

  timer(2);

  return (
    <div>
      <h1 className="jumbotron">
        {question()[1][question()[2]]}
        
      </h1>
    </div>
  )

}

export default App;
