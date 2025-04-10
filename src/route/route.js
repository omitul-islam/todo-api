import express from 'express';
import { addTask, deleteTask, EditTask, getTasks } from '../controller/controller.js';

const route = express.Router();

route.post('/todos', addTask);
route.get('/todos',  getTasks);
route.put('/todos/:id', EditTask);
route.post('/todos/:id', deleteTask);

export const todoRoutes = route;