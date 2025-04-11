import express from 'express';
import { todoRoutes } from './route/route.js';
import fs from 'fs';

const app = express();

app.use((req,res,next) => {
  //  console.log(`${req.method} request is occured to: ${req.url}`); 
   const LogMessage = `at ${new Date()} -> ${req.method} is occured to: ${req.url}\n`;
   fs.appendFileSync('logs.txt', LogMessage, 'utf-8');
   next();
})

app.use(express.json());
app.use('/api',todoRoutes);

app.get('/',(req, res)=> {
   res.send('Api is working!');
 }
)

export default app;