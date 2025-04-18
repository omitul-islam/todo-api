import bcrypt from 'bcrypt';
import userModel from './auth.model.js';

export const CreateService = async ({username, email, password, role}) => {
    const hashedPassword = await bcrypt.hash(password, 10);
      const user = new userModel({
            username,
            email,
            password: hashedPassword,
            role
      });
      return await user.save();
}