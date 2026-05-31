import React from "react";
import { useContext } from "react";
import NoteContext from "../context/NoteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import { useEffect } from "react";
import EditeNote from "./EditeNote";
const Note = () => {
  const { notes,getNote } = useContext(NoteContext);
useEffect(() => {
  getNote();
}, [])

  return (
    <>
    <AddNote/>
    <div className="container">
      <div className="row my-3">
        {notes.map((note, key) => {
          return <NoteItem key={note._id} note={note}></NoteItem>;
        })}
        <EditeNote/>
      </div>
    </div>
    </>
  );
};

export default Note;
