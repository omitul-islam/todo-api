import app from './app.js'; 
import dotenv from 'dotenv';
import connectDb from './db/db.js';

dotenv.config();

const port = process.env.PORT;

connectDb();

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});