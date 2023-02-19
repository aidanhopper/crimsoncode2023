import { useState } from 'react'

export default function Question({ goToAnswerScreen, question }) {
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
