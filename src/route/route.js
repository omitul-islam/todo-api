import express from 'express';
import { addTask, deleteTask, editTask, getTasks } from '../controller/controller.js';

const route = express.Router();

route.post('/todos', addTask);
route.get('/todos',  getTasks);
route.put('/todos/:id', editTask);
route.delete('/todos/:id', deleteTask);

export const todoRoutes = route;