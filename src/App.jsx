import { useState } from 'react'
import Fretboard from './components/Fretboard'

function App() {
  // const notesFlat = ['A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab']
  const notesSharp = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#']
  const availableTunings = {
    "standard": ["E", "B", "G", "D", "A", "E"],
  };
  const tuning = "standard";

  // it contains semitones patterns, 0 being the root note.
  const chordPatterns = {
    "maj": new Set([0, 4, 7]),
    "min": new Set([0, 3, 7]),
  };

  const [chordMatches, setChordMatches] = useState(null);

  const clickedNotes = (notes) => {
    const matches = findMatchingChords(notes);
    setChordMatches(matches);
  }

  const getNotesSequence = (startNote) => {
    const index = notesSharp.indexOf(startNote);
    if(index === -1) return notesSharp;
    return [...notesSharp.slice(index), ...notesSharp.slice(0, index)];
  }

  const findMatchingChords = (selectedNotes) => {
    let strongestMatch = 0;
    const matches = {};
    const selectedClone = Array.from(new Set(selectedNotes)); // cast into array once
    selectedClone.forEach((startNote) => {
      const sequence = getNotesSequence(startNote);
      const patterns = selectedClone.map((note) => sequence.indexOf(note));
      for(const [chordSignature, chordPattern] of Object.entries(chordPatterns)){
        const matchStrength = patterns.filter(distance => chordPattern.has(distance)).length
        matches[`${startNote}${chordSignature}`] = matchStrength;
        strongestMatch = Math.max(strongestMatch, matchStrength);
      }
    });
    return { strongestMatch, matches };
  };

  return (
    <>
      <div className='m-3'>
        <h1 className='text-3xl font-bold underline'>
          Chords!
        </h1>
      </div>
      <div>
      <Fretboard
        nStrings={6} nFrets={12}
        tuning={availableTunings[tuning]} notes={notesSharp}
        onClick={clickedNotes}
      />
      { chordMatches && Object.entries(chordMatches.matches)
        .filter(([_, strength]) => strength >= chordMatches.strongestMatch)
        .map(([chord, strength]) =>(
          <p>{chord}</p>
      ))}
    </div>
    </>
  )
}

export default App
