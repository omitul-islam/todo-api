import express from 'express';
import { addUser, loginUser } from './auth.controller.js';

const route = express.Router();

route.post('/auth/register',addUser);
route.post('/auth/login',loginUser);

export const authRoutes = route;