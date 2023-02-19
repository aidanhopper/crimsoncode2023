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
     function fetchData() {
       fetch(`http://${apiurl}/api/question/?id=${questionIndex}`)
         .then(response => response.json())
         .then(dat => {
           console.log(dat[0])
           if (!dat[0]) {
             setMode("start");
           }

           let arr = [
             dat[0].question, [
               dat[0].option1,
               dat[0].option2,
               dat[0].option3,
               dat[0].option4,
             ],
             dat[0].correct_option
           ];
           setData(arr);
         });
     };
    fetchData();
  }, [questionIndex]);

  return (
    <div className="">
      {mode === 'start' && (
        <StartMenu onStartClick={() => {setMode('login'); setQuestion(1)}}/>
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
