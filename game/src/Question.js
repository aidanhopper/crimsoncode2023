import { useState, useEffect } from 'react'
import useTimer from './useTimer';

export default function Question({ goToAnswerScreen, question }) {
  let ansBtn = "btn btn-block answer-btn"
  const [answerClicked, setAnswerClicked] = useState(-1);

  const timeLeft = useTimer(() => {
    goToAnswerScreen();
  })

  return (
    <div className="container">
    <h1 class="  text-6xl text-center py-32 w-full bg-blue-200 text-white py-4 px-6 rounded-md hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 height-full">{question()[0]}</h1>
      <div class="flex justify-between  text-6xl ">
        <button className=" py-12 w-1/2 bg-blue-500 text-white py-2 px-4 hover:bg-blue-700" onClick={() => setAnswerClicked(0) }>
          {question()[1][0]}
        </button>
        <button className=" py-12 w-1/2 bg-blue-500 text-white py-2 px-4 hover:bg-blue-700" onClick={() => setAnswerClicked(1)}>
          {question()[1][1]} 
        </button>
      </div>
      <div className="row  text-6xl ">
        <button className=" py-12 w-1/2 bg-blue-500 text-white py-2 px-4 hover:bg-blue-700" onClick={() => setAnswerClicked(2)}>
          {question()[1][2]}
        </button>
        <button className=" py-12 w-1/2 bg-blue-500 text-white py-2 px-4 hover:bg-blue-700" onClick={() => setAnswerClicked(3)}>
          {question()[1][3]}
        </button>
      </div>
    </div>
  )
}
