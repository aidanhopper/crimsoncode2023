import { useState, useEffect } from 'react'

import StartMenu from './StartMenu'
import Question from './Question'
import Answer from './Answer'
import Login from './Login'

export default function Game() {
  const [mode, setMode] = useState('start');
  const [questionIndex, setQuestion] = useState(1);
  const [answerClicked, setAnswerClicked] = useState(-1);
  const [data, setData] = useState([]);
  const [playerName, setPlayer] = useState([]);

  let apiurl = "wazzoot.bxllistic.ga"

  useEffect(() => {
     async function fetchData() {
      const response = await fetch(`http://${apiurl}/api/question/?id=${questionIndex}`);
      const data = await response.json();
      console.log(data[0]);
      if (!data[0]) {
        setMode("start");
      }
       
      let arr = [
        data[0].question, [
        data[0].option1,
        data[0].option2,
        data[0].option3,
        data[0].option4,
      ],
      data[0].correct_option
      ];
      setData(arr);
     };
    fetchData();
  }, [questionIndex]);

  return (
    <div className="">
      {mode === 'start' && (
        <StartMenu onStartClick={() => setMode('login')}/>
      )}
      {mode === 'login' && (
        <Login onEnter={() => {setMode('question')}} updateName={(playerName) => {setPlayer(playerName)}}/>
      )} 
      {mode === 'question' && (
        <Question goToAnswerScreen={() => setMode('answer')}
        question = {() => {return data}}
        setAnswerClicked = {(ans) => {setAnswerClicked(ans)}}
        />
      )}
      {mode === 'answer' && (
        <Answer goToQuestionScreen={() => setMode('question')} 
        nextQuestion = {() => setQuestion(questionIndex + 1)}
        question = {() => {return data}}
        getAnswerClicked = {() => {return answerClicked}}
       />
      )}
    </div>
  )
}
