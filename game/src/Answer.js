import useTimer from "./useTimer"

export default function Answer({ goToQuestionScreen, nextQuestion , question, getAnswerClicked }) {

  const timeLeft = useTimer(() => {
    nextQuestion();
    goToQuestionScreen();
  });

  let text = "WRONG ANSWER!";
  if (getAnswerClicked() === question()[2]) {
    text = "RIGHT ANSWER!";
  }

  return (
    <div>
      <h1 class=" text-6xl text-center py-32 w-full bg-blue-200 text-white py-4 px-6 rounded-md hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 height-full">
        {question()[1][question()[2]]}
      </h1>
      <h1>{text}</h1>
    </div>
  )

}
