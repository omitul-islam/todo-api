import express from 'express';
import { todoRoutes } from './todo/route/todoRoute.js';
import fs from 'fs';
import { ErrorHandler } from './middleware/customErrorHandler.js';
import { authRoutes } from './auth/auth.route.js';
import { authenticateUser } from './utils/jwtUtils.js';

const app = express();

app.use((req,res,next) => {
  //  console.log(`${req.method} request is occured to: ${req.url}`); 
   const LogMessage = `at ${new Date().toISOString()} -> ${req.method} is occured to: ${req.url}\n`;
   fs.appendFileSync('logs.txt', LogMessage, 'utf-8');
   next();
})

app.use(express.json());
app.use('/api',authRoutes);
app.use('/api',authenticateUser,todoRoutes);


app.get('/',(req, res)=> {
   res.send('Api is working!');
 }
)
app.use(ErrorHandler);

export default app;