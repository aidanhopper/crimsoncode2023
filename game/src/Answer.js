
export default function Answer({ goToQuestionScreen, nextQuestion , question, getAnswerClicked }) {

  const timer = (time) => {
    setTimeout(() => {
      nextQuestion()
      goToQuestionScreen();
    }, time * 1000)
  }

  timer(2);

  //console.log(question);

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
