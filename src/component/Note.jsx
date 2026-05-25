import React from "react";
import { useContext } from "react";
import NoteContext from "../context/NoteContext";
import NoteItem from "./NoteItem";
const Note = () => {
  const { notes, setNote } = useContext(NoteContext);

  return (
    <div className="container">
      <div className="row my-3">
        {notes.map((note, key) => {
          return <NoteItem key={note._id} note={note}></NoteItem>;
        })}
      </div>
    </div>
  );
};

export default Note;
