import Database from "better-sqlite3";
const db = new Database("database.db");

db.exec(`CREATE TABLE IF NOT EXISTS messageBoard (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    message TEXT    
)`);
