import express from 'express';
import { todoRoutes } from './todo/route/todoRoute.js';
import fs from 'fs';
import { ErrorHandler } from './middleware/customErrorHandler.js';
import { authRoutes } from './auth/auth.route.js';
import { authenticateUser } from './utils/jwtUtils.js';
import { adminRoutes } from './admin/admin.route.js';
import { isAdmin } from './utils/isAdmin.js';
import { userRoutes } from './user/user.route.js';
import path from 'path';

const app = express();

app.use((req,res,next) => {
  //  console.log(`${req.method} request is occured to: ${req.url}`); 
   const LogMessage = `at ${new Date().toISOString()} -> ${req.method} is occured to: ${req.url}\n`;
   fs.appendFileSync('logs.txt', LogMessage, 'utf-8');
   next();
})

app.use(express.json());
app.use('/uploads', express.static(path.resolve('src', 'uploads')));


app.use('/api/auth',authRoutes);
app.use('/api',authenticateUser,todoRoutes);
app.use('/api/user',userRoutes)
app.use('/api/admin',authenticateUser, isAdmin,adminRoutes)

app.get('/',(req, res)=> {
   res.send('Api is working!');
 }
)
app.use(ErrorHandler);

export default app;