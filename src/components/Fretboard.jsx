import { useState, useEffect } from 'react'
import Note from './Note'

export default function Fretboard({nStrings, nFrets, tuning, notes, onClick}) {
  // accounts for the open "fret"
  const allFrets = nFrets + 1;

  const [clickedFrets, setClickedNotes] = useState({});

  const onFretClick = (ident, note) => {
    const fretsClone = {...clickedFrets}
    if(fretsClone[ident]) {
      delete fretsClone[ident];
    } else {
      fretsClone[ident] = note;
    }
    setClickedNotes(fretsClone);
  };

  useEffect(() => {
    onClick(Object.values(clickedFrets));
  }, [clickedFrets]);

  const fretStyleBase = "z-0 w-12 border-solid";
  const fretStyle = `
    ${fretStyleBase}
    bg-[#E8D4A2]
    border-r-4 border-r-[#D4D4D4]
    border-l-4 border-l-[#C0C0C0]
  `;
  const openStyle = `
    ${fretStyleBase}
    bg-[#FFF8DC]
    border-r-4 border-r-[#FFF8DC]
  `;

  const frets = Array.from({length: allFrets}, (_, i) =>
    <div key={`fr-${i}`}
      className={i > 0 ? fretStyle : openStyle}
    >
    </div>
  );

  return (tuning.map((openNote, stringNumber) =>
    // top level container
    <div key={stringNumber} className="flex h-6">
      {/* fretboad container */}
      <div key={`fb-${stringNumber}`} className="relative flex">
        {/* string element */}
        <div key={`stc-${stringNumber}`} className="
          absolute inset-0 z-10 left-12
          flex items-center justify-center
        ">
          <div key={`st-${stringNumber}`} className="h-1 w-full
            bg-gradient-to-br from-gray-500 via-gray-300 to-gray-500
          ">
          </div>
        </div>
        {frets}
        <div className="h-full absolute z-20 flex">
          { Array.from({length: allFrets}, (_, i) => {
              const ident = `${stringNumber}-${i}`; 
              const note = i === 0 ? openNote
                : notes.at((notes.indexOf(openNote) + i) % 12); // cycle through 12 available notes
              return <Note
                key={i}
                note={note}
                ident={ident}
                clicked={ident in clickedFrets}
                onClick={onFretClick}
              />
          })}
        </div>
      </div>
    </div>
  ));
 
}
