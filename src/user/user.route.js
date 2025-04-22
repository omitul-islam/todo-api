import express from 'express';
import { deleteProflie, getProfile, updateProfile } from './user.controller.js';

const route = express.Router();

route.get('/profile', getProfile);
route.put('/profile', updateProfile);
route.delete('/profile', deleteProflie);

export const userRoutes = route;
