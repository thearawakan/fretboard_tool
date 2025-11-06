import { useState } from 'react'

function App() {

  const nStrings = 6;
  
  const notes = [
    "A", "B", "C", "D", "E", "F", "G",
  ]

  const openNotes = [
    "E", "B", "G", "D", "A", "E"
  ]

  const fretStyleBase = "z-0 w-12 border-solid"

  const fretStyle = `
    ${fretStyleBase}
    bg-[#E8D4A2]
    border-r-4 border-r-[#D4D4D4]
    border-l-4 border-l-[#C0C0C0]
  `
  const openStyle = `
    ${fretStyleBase}
    bg-[#FFF8DC]
    border-r-4 border-r-[#FFF8DC]
  `

  const frets = Array.from({length: 13}, (_, i) =>
    <div key={`fr-${i}`}
      className={i > 0 ? fretStyle : openStyle}
    >
    </div>
  );

  const onFretClick = (fret_id) => {
    console.log(`clicked ${fret_id}`)
  }

  const fretButtons = Array.from({length: 13}, (_, i) =>
    <button key={`frb-${i}`}
      onClick={() => onFretClick(i)}
      className="h-full w-12 flex justify-center">
      <div className="h-4/4 w-6
      bg-red-300
      rounded-2xl
      ">
      </div>
    </button>
  );

  const cuerdas = Array.from({length: nStrings }, (_, i) => 
    // top level container
    <div key={i} className="flex h-6">
      {/* fretboad container */}
      <div key={`fb-${i}`} className="relative flex">
        {/* string element */}
        <div key={`stc-${i}`} className="
          absolute inset-0 z-10 left-12
          flex items-center justify-center
        ">
          <div key={`st-${i}`} className="h-1 w-full
            bg-gradient-to-br from-[#A8A9AD] via-gray-300 to-gray-500
          ">
          </div>
        </div>
        {frets}
        <div className="h-full absolute z-20 flex">
          {fretButtons}
        </div>
      </div>
    </div>
   );

  
  return (
    <>
    <h1 className="text-3xl font-bold underline">
      Chords!
    </h1>
    {cuerdas}
    </>
  )
}

export default App
