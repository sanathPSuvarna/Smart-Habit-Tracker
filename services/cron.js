import cron from 'node-cron';
import db from '../database/db.js';

cron.schedule('0 9 * * *', () => {
    console.log('Sending daily reminder to mark habits as complete...');
    

    db.run('UPDATE habit_status SET completed = 0 WHERE completed = 1', (err) => {
        if (err) {
            console.error('Error resetting habit statuses:', err.message);
        } else {
            console.log('Habit statuses reset for the day.');
        }
    });
});

cron.schedule('0 0 * * 0', () => {
    console.log('Generating weekly report...');
    
    const query = `
        SELECT habits.name, COUNT(habit_status.completed) AS days_completed
        FROM habits
        LEFT JOIN habit_status 
        ON habits.id = habit_status.habit_id AND habit_status.completed = 1
        WHERE date(habit_status.date) >= date('now', '-7 days')
        GROUP BY habits.id
    `;
    
    db.all(query, [], (err, rows) => {
        if (err) {
            console.error('Error generating weekly report:', err.message);
        } else {
            console.log('Weekly report generated:', rows);
        }
    });
});

export default cron;
