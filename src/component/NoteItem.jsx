import React from "react";
import "../assets/style/note.css";
import { CiTrash, CiEdit } from "react-icons/ci";
import { useContext } from "react";
import NoteContext from "../context/NoteContext";
function NoteItem({ note }) {
  const { deleteNote, setCurrentNote } = useContext(NoteContext);

  return (
    <div className="col-md-3 m-3">
      <div className="card border-danger" style={{ width: "18rem" }}>
        <div className="card-body">
          <div className="cardIconContainer bg-danger d-flex justify-content-end">
            <CiTrash
              className="icon"
              onClick={() => {
                deleteNote(note._id);
              }}
            />
            <CiEdit
              className="icon"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              onClick={() => {
                setCurrentNote(note);
              }}
            />
          </div>
          <h5 className="card-title">{note.title}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{note.tag}</h6>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
}

export default NoteItem;
