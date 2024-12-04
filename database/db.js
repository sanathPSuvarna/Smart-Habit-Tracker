import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new sqlite3.Database(path.join(__dirname, 'habitTracker.db'), (err) => {
    if (err) {
        console.error('Error opening database:', err);
    } else {
        console.log('Database connected');
    }
});

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS habits (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            goal TEXT NOT NULL
        );
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS habit_status (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            habit_id INTEGER,
            completed INTEGER,
            date TEXT DEFAULT CURRENT_DATE,
            FOREIGN KEY(habit_id) REFERENCES habits(id)
        );
    `);
});

export default db;
