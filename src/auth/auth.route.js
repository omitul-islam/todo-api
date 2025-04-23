import express from 'express';
import { addUser, loginUser } from './auth.controller.js';

const route = express.Router();

route.post('/register',addUser);
route.post('/login',loginUser);

export const authRoutes = route;