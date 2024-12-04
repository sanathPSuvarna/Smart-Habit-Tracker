import express from 'express';
import bodyParser from 'body-parser';
import habitRoutes from './routes/habits.js';  
import './services/cron.js';  
const app = express();

app.use(bodyParser.json());

app.use('/habits', habitRoutes);

const PORT = process.env.PORT || 3000;  
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
