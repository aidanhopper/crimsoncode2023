export default function Login({ onEnter, updateName }) {

  const handleEnter = (event) => {
    if (event.key === 'Enter') {
      onEnter();
    }
  }

  return (
    <div>
      <h1>asdf</h1>
      <input type="text" onChange={(name) => {updateName(name)}} onKeyDown={handleEnter}/> 
    </div>
  )
}
