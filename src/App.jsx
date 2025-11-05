import { useState } from 'react'

function App() {

  const notes = [
    
  ]

  const openNotes = [
    "E", "B", "G", "D", "A", "E"
  ]

  const frets = Array.from({length: 13}, (_, i) =>
    <div className="z-0
      w-12 bg-[#E8D4A2] border-solid
      border-r-4 border-r-[#D4D4D4]
      border-l-4 border-l-[#C0C0C0]
      ">
    </div>
  );

  const cuerdas = openNotes.map(note => 
    <div className="flex">
      <div className="w-6">
        {note}
      </div>
      <div className="relative flex">
        <div className="
          absolute inset-0 z-10
          flex items-center justify-center
          ">
          <div className="h-1 w-full bg-[#A8A9AD]"></div>
        </div>
        {frets}
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
