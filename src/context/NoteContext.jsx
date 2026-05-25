import { createContext, useState } from "react";

const NoteContext = createContext(null);

export function NoteContextProvider({ children }) {
  const temporaryNotes = [
    {
      _id: "6a14b14efbee575d2118dc85",
      user: "6a0e24e04f8477e95a479391",
      title: "Learn React Context",
      description:
        "Understand how Context API helps in state management across components.",
      tag: "React",
      date: "2026-05-25T20:30:06.773Z",
      __v: 0,
    },
    {
      _id: "6a14b160fbee575d2118dc86",
      user: "6a0e24e04f8477e95a479391",
      title: "Build Notes App",
      description:
        "Create CRUD operations for notes using React and Express backend.",
      tag: "Project",
      date: "2026-05-25T20:30:24.147Z",
      __v: 0,
    },
    {
      _id: "6a14b175fbee575d2118dc87",
      user: "6a0e24e04f8477e95a479391",
      title: "MongoDB Practice",
      description:
        "Practice schema creation, models, and database queries in MongoDB.",
      tag: "Database",
      date: "2026-05-25T20:30:45.886Z",
      __v: 0,
    },
    {
      _id: "6a14b180fbee575d2118dc88",
      user: "6a0e24e04f8477e95a479391",
      title: "Authentication Setup",
      description: "Implement JWT authentication with login and signup routes.",
      tag: "Backend",
      date: "2026-05-25T20:30:56.680Z",
      __v: 0,
    },
  ];
  const [notes, setNote] = useState(temporaryNotes);

  return (
    <NoteContext.Provider value={{ notes, setNote }}>
      {children}
    </NoteContext.Provider>
  );
}

export default NoteContext;
