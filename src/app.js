import express from 'express';
import { todoRoutes } from './route/route.js';

const app = express();

app.use(express.json());
app.use('/api',todoRoutes);

app.get('/',(req, res)=> {
   res.send('Api is working!');
 }
)

export default app;