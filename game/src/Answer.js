
export default function Answer({ goToQuestionScreen, nextQuestion , question }) {

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
