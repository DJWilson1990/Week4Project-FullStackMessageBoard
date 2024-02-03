import express from "express";
import cors from "cors";
import Database from "better-sqlite3";

const app = express();
app.use(cors());
app.use(express.json());
const db = new Database("database.db");

const PORT = "2020";
app.listen(PORT, () => {
  console.log(`Server is live on port: ${PORT}`);
});

app.get("/", (request, response) => {
  response.send("Hello World");
});
//  Set up /\

app.post("/messageBoard", (req, res) => {
  try {
    const username = req.body.username;
    const message = req.body.message;
    const newMessage = db
      .prepare(`INSERT INTO messageBoard (username, message) VALUES(?, ?)`)
      .run(username, message);
    res.status(200).json({ message: newMessage });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

app.get("/messageBoard", (req, res) => {
  try {
    let messageBoard = db.prepare(`SELECT * FROM messageBoard`).all();
    res.status(200).json(messageBoard);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.delete("/messageBoard/:id", (request, response) => {
  try {
    let id = request.params.id;
    let deletedMessage = db
      .prepare(`DELETE FROM messageBoard WHERE id = ?`)
      .run(id);
    response.status(200).json({ recordDeleted: deletedMessage });
  } catch (err) {
    response.status(500).json({ error: err.message });
  }
});
