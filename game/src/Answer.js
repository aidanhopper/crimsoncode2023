
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
      <h1 class=" text-6xl text-center py-32 w-full bg-blue-200 text-white py-4 px-6 rounded-md hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 height-full">
        {question()[1][question()[2]]}
        
      </h1>
    </div>
  )

}
