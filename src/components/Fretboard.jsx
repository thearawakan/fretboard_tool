import { useState } from 'react'
import Note from './Note'

export default function Fretboard() {

  const [clickedNotes, setClickedNotes] = useState([]);

  const onClickedNote = (note) => {
    console.log(note)
  }
  
  const nStrings = 6;
  // 1 as open "fret" + actual number of frets
  const nFrets = 1 + 12;
  
  const notesSharp = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#']
  // const notesFlat = ['A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab']

  const tunings = {
    "standard": ["E", "B", "G", "D", "A", "E"],
  }

  const tuningCurrent = "standard"
  
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

  const frets = Array.from({length: nFrets}, (_, i) =>
    <div key={`fr-${i}`}
      className={i > 0 ? fretStyle : openStyle}
    >
    </div>
  );

  const getNote = (index, openNote) => {
    return notesSharp.at((notesSharp.indexOf(openNote) + index) % 12)
  }

  const FretNotes = ({openNote}) => {
    return (
      Array.from({length: nFrets}, (_, i) =>
        <Note key={i} note={i === 0 ? openNote : getNote(i, openNote)}
          onClick={onClickedNote}
        />
  ))};

  return (tunings[tuningCurrent].map((note, i) =>
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
          <FretNotes openNote={note}/>
        </div>
      </div>
    </div>
  ));
 
}
