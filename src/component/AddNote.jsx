import { useState, useEffect } from "react";
import React from "react";
import { useContext } from "react";
import NoteContext from "../context/NoteContext";
function AddNote() {
  const { addNote  } = useContext(NoteContext);

  const [error, setError] = useState({});
  const [note, setnote] = useState({
    title: "",
    description: "",
    tag: "",
  });
  
  const handleonAddNote = (event) => {
    event.preventDefault();
    const newError = {};
    const { title, description, tag } = note;
    if (!title?.trim()) {
      console.log("enetr title please");
      newError.title = "Title is required";
    }
    if (!description?.trim()) {
      console.log("enetr description please");
      newError.description = "Description is required";
    }
    if (!tag?.trim()) {
      console.log("enetr tag please");
      newError.tag = "Tag is required";
    }
    seterror(newError);
    if (Object.keys(newError).length > 0) {
      return;
    }
    addNote(title, description, tag);
    console.log(note);
    setnote({
        title: "",
        description: "",
        tag: "",
      });
  };
  const handleNoteOnChnage = (event) => {
    const { name, value } = event.target;
    setnote((previous) => ({ ...previous, [name]: value }));
  };


  return (
    <>
      <div className="container my-3">
        <h2>Add New Note</h2>

        <form onSubmit={handleonAddNote}>
          <div className="form-group">
            <label htmlFor="title">Title</label>

            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              onChange={handleNoteOnChnage} value={note.title}
              placeholder="Enter title"
            />
            {error.title && (
              <small className="text-danger">{error.title}</small>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="tag">Tag</label>

            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              onChange={handleNoteOnChnage} value={note.tag}
              placeholder="tag"
            />
            {error.tag && (
              <small className="text-danger">{error.tag}</small>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>

            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              onChange={handleNoteOnChnage} value={note.description}
              placeholder="description"
            />
            {error.description && <small className="text-danger">{error.description}</small>}
          </div>

          <button type="submit" className="btn btn-primary">
            Add Note
          </button>
        </form>

        <h2>Your Notes</h2>
      </div>
    </>
  );
}

export default AddNote;
