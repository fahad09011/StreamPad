import { useState, useEffect } from "react";
import React from "react";
import { useContext } from "react";
import NoteContext from "../context/NoteContext";
const EditeNote = () => {
  const { currentNote, editNote } = useContext(NoteContext);

  const [error, setError] = useState({});
  const [note, setnote] = useState({
    id: "",
    title: "",
    description: "",
    tag: "",
  });
  //   showing current note data into form field
  useEffect(() => {
    if (currentNote) {
      console.log("current note", currentNote);
      setnote({
        id: currentNote._id,

        title: currentNote.title,
        description: currentNote.description,
        tag: currentNote.tag,
      });
    }
  }, [currentNote]);

  const handleNoteOnChnage = (event) => {
    const { name, value } = event.target;
    setnote((previous) => ({ ...previous, [name]: value }));
  };

  const handleOnEditNote = (event) => {
    event.preventDefault();
    // form validation if any field is empty then shows error message to user
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
    setError(newError);
    if (Object.keys(newError).length > 0) {
      return;
    }
    editNote(note.id, note.title, note.tag, note.description);
  };

  return (
    <div>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="container my-3">
                <form>
                  <div className="form-group">
                    <label htmlFor="title">Title</label>

                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      name="title"
                      onChange={handleNoteOnChnage}
                      value={note.title}
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
                      onChange={handleNoteOnChnage}
                      value={note.tag}
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
                      onChange={handleNoteOnChnage}
                      value={note.description}
                      placeholder="description"
                    />
                    {error.description && (
                      <small className="text-danger">{error.description}</small>
                    )}
                  </div>
                </form>

                <h2>Your Notes</h2>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleOnEditNote}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditeNote;
