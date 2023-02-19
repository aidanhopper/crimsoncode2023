
export default function StartMenu({ onStartClick }) {
  return (
    <div class="h-screen flex items-center justify-center bg-cover bg-center h-screen" style={{backgroundImage: `url("./poonani.jpg")`}}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-75"></div>
      <button className="text-6xl px-16 py-16 bg-red-600 text-white rounded-full hover:bg-red-700" onClick={ onStartClick }>
        <span>Play Wazoot!</span>
      </button>
    </div>
  )
}
