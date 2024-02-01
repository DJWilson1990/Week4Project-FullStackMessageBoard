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
  } catch (err) {
    res.status(500).json({ error: err });
  }
});
