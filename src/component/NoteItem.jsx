import React from "react";
import '../assets/style/note.css'
import { CiTrash, CiEdit } from "react-icons/ci";

function NoteItem({ note }) {
  return (
    <div className="col-md-3 m-3">
      <div className="card border-danger" style={{ width: "18rem" }}>
        <div className="card-body">
          <div className="cardIconContainer bg-danger d-flex justify-content-end">
          <CiTrash className="icon" />
          <CiEdit className="icon"/>

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
