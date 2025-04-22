import userModel from "./auth.model.js";
import { CreateService } from "./auth.service.js";
import { validation } from "./auth.validate.js";
import jwt from 'jsonwebtoken';

export const addUser = async (req, res, next) => {
      try {
            const { username, email, password,role } = req.body;
            const validateData = {
                  username,
                  email,
                  password,
                  role
            };
            
            const validatedData = validation.UserCreateSchema.safeParse(validateData);
            
            if (!validatedData.success) {
                  const error = new Error('Validation Failed!');
                  error.status = 400;
                  error.error = validatedData.error;
                  throw error;
            }
            const saveUser = await CreateService({ username, email, password, role });
            return res.status(201).json({ message: "User created successfully!", user: saveUser});
      }
      catch (error) {
            next(error);
      }
        
}

export const loginUser = async (req, res, next) => {
    try {
        const { email } = req.body;
        console.log(email);
        const user = await userModel.find({email:email});
        console.log(user);
        if (!user || user.length === 0) {
            return res.status(401).json({ message: "Invalid email!"});
        }
        jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN }, (err, token) => {
            if (err) {
                return res.status(500).json({ error: "Error signing token" });
            }
            res.json({ token });
        })

    } catch (error) {
      next(error);       
    }
}