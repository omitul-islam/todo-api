import jwt from 'jsonwebtoken';
import userModel from '../auth/auth.model.js';


export const authenticateUser = async (req, res, next) => {
       const authHeader = req.headers.authorization;
       console.log(authHeader);

       if(!authHeader || !authHeader.startsWith('Bearer')) {
              return res.status(401).json({ message: 'Unauthorized User!' });
       }

       const token = authHeader.split(' ')[1];

       try {
              const decoded = jwt.verify(token, process.env.JWT_SECRET);
              console.log(decoded);
              const user = await userModel.findOne({email: decoded.email}).select('-password');
              
              if(!user) {
                return res.status(401).json({ message: 'Unauthorized User!' });
              }
              req.user = user;
              next();
       } catch (error) {
              return res.status(401).json({ message: 'Unauthorized User!' });
       }
}