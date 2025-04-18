import {z} from 'zod';

const UserCreateSchema = z.object({
      username: z.string().min(3),
      email: z.string().email(),
      password: z.string().min(8),
      role: z.enum(['admin', 'user']).optional(),
});



export const validation = {
       UserCreateSchema,
}