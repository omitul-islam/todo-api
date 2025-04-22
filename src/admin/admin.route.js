import express from 'express';
import { deleteTask, deleteUser, editTask,getTasks, getTasksByUserId, getUserById, getUsers, updateUser } from './admin.controller.js';

const route = express.Router();

route.get('/todos/admin',getTasks);
route.get('/todos/admin/:id',getTasksByUserId);
route.delete('/todos/admin/:id',deleteTask);
route.put('/todos/admin/:id',editTask);
route.delete('/admin/users/:id',deleteUser);
route.get('/admin/users',getUsers)
route.get('/admin/users/:id',getUserById)
route.put('/admin/users/:id',updateUser);

export const adminRoutes = route;