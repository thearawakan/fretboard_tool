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

  const clickedNotes = (notes) => {
    console.log(notes);
  }

  const getNotesSequence = (startNote) => {
    const index = notesSharp.indexOf(startNote);
    if(index === -1) return notesSharp;
    return [...notesSharp.slice(index), ...notesSharp.slice(0, index)];
  }

  const findMatchingChords = (selectedNotes) => {
    const selectedClone = Array.from(new Set(selectedNotes));
    let strongestMatch = 0;
    const matches = selectedClone.map((startNote) => {
      const noteMatches = { [startNote]: [] };
      const sequence = getNotesSequence(startNote);
      const patterns = selectedClone.map((note) => sequence.indexOf(note));
      for(const [chordSignature, chordPattern] of Object.entries(chordPatterns)){
        const matchStrength = patterns.filter(distance => chordPattern.has(distance)).length
        noteMatches[startNote].push({[chordSignature]: matchStrength});
        strongestMatch = Math.max(strongestMatch, matchStrength);
      }
      return noteMatches;
    });
    return { strongestMatch, matches };
  };
  
  return (
    <>
      <h1 className="text-3xl font-bold underline">
        Chords!
      </h1>
      <Fretboard
        nStrings={6} nFrets={12}
        tuning={availableTunings[tuning]} notes={notesSharp}
        onClick={clickedNotes}
      />
    </>
  )
}

export default App
