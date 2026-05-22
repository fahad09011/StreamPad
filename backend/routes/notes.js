import express, { request, response } from "express";
import fetchUser from "../middleware/fetchUser.js";
import Notes from "../models/Notes.js";
import { body, validationResult } from "express-validator";

const router = express.Router();

// End point 1 create user notes :-
// create a user notes: post method with route "api/notes/createUserNotes"
router.post(
  "/createUserNotes",
  [
    body("title", "Title must not be empty")
      .notEmpty()
      .trim()
      .isLength({ min: 5 }),
    body("description", "Description must not be empty")
      .notEmpty()
      .trim()
      .isLength({ min: 10 }),
  ],
  fetchUser,
  async (request, response) => {
    const result = validationResult(request);
    if (!result.isEmpty()) {
      return response.status(400).json({ errors: result.array() });
    }
    try {
      const notes = new Notes({
        user: request.user.id,
        title: request.body.title,
        description: request.body.description,
        tag: request.body.tag,
      });
      await notes.save();
      console.log("after creating notes and notes is saved into db");
      response.json(notes);
    } catch (error) {
      console.error(error.message);
      response.status(500).json({ error: "Internal Server Error" });
    }
   
  },
);

// End point 2 get user notes :-
// fetch a user notes: get method with route "api/notes/fetchUserNotes"
router.get("/fetchUserNotes", fetchUser, async (request, response) => {
  const notes = await Notes.find({ user: request.user.id });
  response.json(notes);
});



// End point 3 update user notes :-
// update a user notes: put method with route "api/notes/updateUserNote/:id"
router.put(
  "/updateUserNote/:id",
 
  fetchUser,
  async (request, response) => {
    const result = validationResult(request);
    if (!result.isEmpty()) {
      return response.status(400).json({ errors: result.array() });
    }
    try {
      const {title, description, tag} = request.body;
      // create new object for update note
      const updateNote= {};
      if (title) {
        updateNote.title = title
      }
      if (description) {
        updateNote.description = description
      }
      if (tag) {
        updateNote.tag = tag
      }
      // find note by note id note id comes from parameter url
      let note = await Notes.findById(request.params.id);
      if (!note) {
        return response.status(404).json("Note not found")
      };
      // console.log("user id in note", note.user.toString(),': type,,', typeof note.user.id)
      // console.log("user id in request", request.user.id)

      if (note.user.toString() !== request.user.id) {
        return response.status(401).json("Access denied, user not Authorized");
      }
     note = await Notes.findByIdAndUpdate(request.params.id, {$set: updateNote}, {new:true});
     response.json(note);
    } catch (error) {
      console.error(error.message);
      response.status(500).json({ error: "Internal Server Error" });
    }
   
  },
);

// End point 4 delete user notes :-
// delete a user notes: delete method with route "api/notes/deleteUserNote/:id"
router.delete('/deleteuserNote/:id', fetchUser , async(request, response)=>{
const result = validationResult(request);
if(!result.isEmpty()){
  return response.status(400).json({ errors: result.array()});
};

try {
  
  let note = await Notes.findById(request.params.id);
  if (!note) {
    return response.status(404).json('Note not found');
  }
  console.log("user id in note", note.user.toString(),': type,,', typeof note.user.id)
      console.log("user id in request", request.user.id)
  if (note.user.toString() !== request.user.id) {
    return response.status(401).json('Access Denied. User Not Authorized')
  }
  note = await Notes.findByIdAndDelete(request.params.id);
  response.json('Note Successfuly delete.', note);

} catch (error) {
  console.error(error.message);
  response.status(500).json({ error: "Internal Server Error" });
}
});
export default router;
