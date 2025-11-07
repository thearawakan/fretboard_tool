import { useState } from "react"

export default function Note({note, onClick}) {

  const [visible, setVisible] = useState(false);

  const noteStyleInv = "invisible h-4/4 w-6 bg-red-300 rounded-2xl"
  const noteStyle = "h-4/4 w-6 bg-red-300 rounded-2xl"

  function handleClick(note) {
    setVisible(!visible);
    onClick(note)
  }

  return (
    <button
      onClick={() => handleClick(note)}
      className="h-full w-12 flex justify-center">
      <div className={visible ? noteStyle : noteStyleInv}>
      {note}
      </div>
    </button>
)};
