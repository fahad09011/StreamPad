import connectToMongo from "./db.js";
import express from "express";
import auth from "./routes/auth.js";
import notes from "./routes/notes.js";
import dotenv from 'dotenv';
const app = express();
const port = 3000;
dotenv.config();
app.use(express.json());
app.use("/api/auth", auth);
app.use("/api/notes", notes);

app.get("/", (_req, res) => {
  res.json({ status: "ok", message: "StreamPad API" });
});

connectToMongo().then(() => {
  app.listen(port, () => {
    console.log(`StreamPad backend Server listening on http://localhost:${port}`);
  });
});
