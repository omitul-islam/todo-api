import express from 'express';
import { deleteTask, deleteUser, editTask,getTasks, getTasksByUserId, getUserById, getUsers, updateUser } from './admin.controller.js';
import { upload } from '../todo/multer/multer.js';

const route = express.Router();

route.get('/todos',getTasks);
route.get('/todos/:id',getTasksByUserId);
route.delete('/todos/:id',deleteTask);
route.put('/todos/:id',upload.single('attachment'),editTask);

route.delete('/users/:id',deleteUser);
route.get('/users',getUsers)
route.get('/users/:id',getUserById)
route.put('/users/:id',updateUser);

export const adminRoutes = route;