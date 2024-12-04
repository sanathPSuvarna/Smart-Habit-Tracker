import express from 'express';
import db from '../database/db.js';  
const router = express.Router();

router.post('/', (req, res) => {
    const { name, goal } = req.body;

    if (!name || !goal) {
        return res.status(400).json({ status: 'error', error: 'Habit name and daily goal are required' });
    }

    const query = 'INSERT INTO habits (name, goal) VALUES (?, ?)';
    db.run(query, [name, goal], function (err) {
        if (err) {
            return res.status(500).json({ status: 'error', error: err.message });
        }
        res.status(201).json({ status: 'success', data: { id: this.lastID, name, goal } });
    });
});

router.put('/:id', (req, res) => {
    const { id } = req.params;

    const query = 'INSERT INTO habit_status (habit_id, completed) VALUES (?, 1)';
    db.run(query, [id], function (err) {
        if (err) {
            return res.status(500).json({ status: 'error', error: err.message });
        }
        res.json({ status: 'success', message: 'Habit marked as complete for today' });
    });
});

router.get('/', (_req, res) => {
    const query = `
        SELECT habits.id, habits.name, habits.goal, 
               COUNT(habit_status.completed) AS completed_days
        FROM habits
        LEFT JOIN habit_status 
        ON habits.id = habit_status.habit_id AND habit_status.completed = 1
        GROUP BY habits.id
    `;
    
    db.all(query, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ status: 'error', error: err.message });
        }
        res.json({ status: 'success', data: rows });
    });
});

router.get('/report', (_req, res) => {
    const query = `
        SELECT habits.name, COUNT(habit_status.completed) AS days_completed
        FROM habits
        LEFT JOIN habit_status 
        ON habits.id = habit_status.habit_id AND habit_status.completed = 1
        WHERE date(habit_status.date) >= date('now', '-6 days')
        GROUP BY habits.id
    `;
    
    db.all(query, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ status: 'error', error: err.message });
        }
        res.json({ status: 'success', data: rows });
    });
});

export default router;
