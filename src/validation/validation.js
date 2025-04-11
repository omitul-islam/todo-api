import {z} from 'zod';

const taskCreateSchema = z.object({
      task: z.string().min(10)
});

const taskUpdateSchema = z.object({
    task: z.string().min(10).optional(),
    isCompleted: z.boolean().optional()
})


export const validation = {
       taskCreateSchema,
       taskUpdateSchema
}