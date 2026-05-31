import { createContext, use, useState } from "react";

const NoteContext = createContext(null);

export function NoteContextProvider({ children }) {
  const temporaryNotes = [];
  const [notes, setNote] = useState(temporaryNotes);
  const [currentNote, setCurrentNote] = useState(null);

  // Get notes from DB with backend path
  const getNote = async () => {
    const response = await fetch(
      "http://localhost:3000/api/notes/fetchUserNotes",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNmEwZTI0ZTA0Zjg0NzdlOTVhNDc5MzkxIn0sImlhdCI6MTc3OTQwMjgzMH0.o6h6405YdEi6rWZ3AGnIonojE9vNj8KjLPS7N0ivOnc",
        },
      },
    );
    const json = await response.json();
    console.log(json);
    setNote(json);
  };
  // Add note function
  const addNote = async (title, description, tag) => {
    const response = await fetch(
      "http://localhost:3000/api/notes/createUserNotes",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNmEwZTI0ZTA0Zjg0NzdlOTVhNDc5MzkxIn0sImlhdCI6MTc3OTQwMjgzMH0.o6h6405YdEi6rWZ3AGnIonojE9vNj8KjLPS7N0ivOnc",
        },
        body: JSON.stringify({ title, description, tag }),
      },
    );
    const json = await response.json();
    console.log(json);
    setNote(notes.concat(json));
  };

  // Delete note function
  const deleteNote = async (id) => {
    const response = await fetch(
      `http://localhost:3000/api/notes/deleteuserNote/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNmEwZTI0ZTA0Zjg0NzdlOTVhNDc5MzkxIn0sImlhdCI6MTc3OTQwMjgzMH0.o6h6405YdEi6rWZ3AGnIonojE9vNj8KjLPS7N0ivOnc",
        },
      },
    );
    const json = await response.json();
    console.log(json);

    const newNote = notes.filter((note) => {
      return note._id !== id;
    });
    console.log("Deleteing note with ID:", id);
    setNote(newNote);
  };

  // Edit note function
  const editNote = async (id, title, tag, description) => {
    const response = await fetch(
      `http://localhost:3000/api/notes/updateUserNote/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNmEwZTI0ZTA0Zjg0NzdlOTVhNDc5MzkxIn0sImlhdCI6MTc3OTQwMjgzMH0.o6h6405YdEi6rWZ3AGnIonojE9vNj8KjLPS7N0ivOnc",
        },
        body: JSON.stringify({ title, tag, description }),
      },
    );
    const updateNote = notes.map((note) => {
      if (note._id === id) {
        return {
          ...note,
          title,
          tag,
          description,
        };
      }
      return note;
    });
    setNote(updateNote);
    console.log(`
    id ${id}
    title: ${title}
    tag: ${tag}
    description: ${description}
  `);
  };

  return (
    <NoteContext.Provider
      value={{
        notes,
        setNote,
        addNote,
        deleteNote,
        editNote,
        getNote,
        currentNote,
        setCurrentNote,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
}

export default NoteContext;
