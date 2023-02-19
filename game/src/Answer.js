import { useState, useEffect } from 'react'

export default function Answer({ goToQuestionScreen, nextQuestion , question, getAnswerClicked }) {

  useEffect(() => {
    setTimeout(() => {
      nextQuestion()
      goToQuestionScreen();
    }, 5 * 1000)}, [goToQuestionScreen]);

  let text = "WRONG ANSWER!";
  if (getAnswerClicked() === question[2]) {
    text = "RIGHT ANSWER!";
  }

  return (
    <div>
      <h1 className="jumbotron">
        {question()[1][question()[2]]}
        {text}
      </h1>
    </div>
  )

}
