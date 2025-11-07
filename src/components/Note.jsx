export default function Note({ident, note, clicked, onClick}) {
  const noteStyleInv = "invisible h-4/4 w-6 bg-red-300 rounded-2xl"
  const noteStyle = "h-4/4 w-6 bg-red-300 rounded-2xl"

  return (
    <button
      onClick={() => onClick(ident, note)}
      className="h-full w-12 flex justify-center">
      <div className={clicked ? noteStyle : noteStyleInv}>
      {note}
      </div>
    </button>
)};
