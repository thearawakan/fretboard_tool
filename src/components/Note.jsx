export default function Note({ident, note, clicked, onClick}) {
  const noteStyleInv = "h-4/4 w-6 bg-[#97ACC8]/30 text-black/50 rounded-2xl"
  const noteStyle = "h-4/4 w-6 bg-[#97ACC8] rounded-2xl"

  return (
    <button
      onClick={() => onClick(ident, note)}
      className="h-full w-12 flex justify-center items-center text-sm">
      <div className={clicked ? noteStyle : noteStyleInv}>
      {note}
      </div>
    </button>
)};
