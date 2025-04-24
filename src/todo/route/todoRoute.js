import express from 'express';
import { addTask, deleteTask, editTask, getArchivedTasks, getTasks } from '../controller/todoController.js';
import { upload } from '../multer/multer.js';

const route = express.Router();

route.post('/todos', upload.single('attachment') ,addTask);
route.get('/todos',  getTasks);
route.get('/todos/archived',getArchivedTasks)
route.put('/todos/:id',upload.single('attachment'), editTask);
route.delete('/todos/:id', deleteTask);

export const todoRoutes = route;