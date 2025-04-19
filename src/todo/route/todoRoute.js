import express from 'express';
import { addTask, deleteTask, editTask, getTasks } from '../controller/todoController.js';
import { upload } from '../multer/multer.js';

const route = express.Router();

route.post('/todos', upload.single('attachment') ,addTask);
route.get('/todos',  getTasks);
route.put('/todos/:id', editTask);
route.delete('/todos/:id', deleteTask);

export const todoRoutes = route;