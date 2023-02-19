
export default function StartMenu({ onStartClick }) {
  return (
    <div class="h-screen flex items-center justify-center bg-blue-500">
      <button className="text-6xl px-16 py-16 bg-blue-500 text-white rounded-full hover:bg-blue-700" onClick={ onStartClick }>
        <span>start game</span>
      </button>
    </div>
  )
}
