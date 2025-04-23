import client from "../redis/redis.js";
import reminderQueue from "../../utils/reminder.js";
import archiveQueue from "../../utils/archiveSchedule.js";
import { validation } from "../../validation/todoValidation.js";
import { createTodoService, deleteTodoService, getTodosService, updateTodoService } from "../service/todoService.js";

const delay = process.env.ARCHIVE_DELAY;

export const getTasks = async(req, res,next)=> {
    try {
      const userId = req.user.id;
      const cache = `${process.env.REDIS_CACHE_KEY}:${userId}`;
      const cachedTodos = await client.get(cache);
      if(cachedTodos) {
        console.log("Cache found!");
        return res.status(200).json({message:"All the todos are fetched successfully!", Tasks: JSON.parse(cachedTodos)});
      }

      const todos = await getTodosService(userId);
      if(!todos || todos.length === 0) {
        return res.json({message: "No todos to complete!"}); 
      }
      //console.log("todos",todos);
      await client.setEx(cache,delay,JSON.stringify(todos));

      return res.status(200).json({message:"All the todos are fetched successfully!",Tasks: todos});
    } catch (error) {
      next(error);
    }
}

export const addTask = async(req, res, next) => {
  try{
     const {task} = req.body;
    //  if(task === undefined) {
    //    return res.status(404).json({message:"Task is required to make a todo!"}); 
    //  }
     const validatedData = validation.taskCreateSchema.safeParse({task});

     if(!validatedData.success) {
      const error = new Error("Validation Failed!");
      error.status = 400;
      error.error = validatedData.error;
      throw error;
     } 
     console.log(req.body)
     const userId = req.user.id;
     const attachment = req.file ? req.file.path : null;
     const newTask = await createTodoService({task, userId, attachment});

     console.log(newTask);
     setTimeout(() => {
        console.log(`Task ${newTask.task} created with the id: ${newTask._id}`);
     }, 0);

     const taskPromise = new Promise((resolve, reject) => {
           setTimeout(() => {
              if(!newTask.task) {
                return reject({status:404,message:"There is no task data to assign!"});
              }
              resolve({task: newTask});
           }, 200); 
     });

   
        const saveTask = await taskPromise;
        const taskId = saveTask.task._id;
        await reminderQueue.add(
          {
            taskId,
            email: req.user.email, 
            subject: 'Reminder: You created a task 10 seconds ago!',
            body: `Task: "${task}" is still incompleted. Check it!`,
          },
          {
            delay: process.env.REMINDER_DELAY,
          }
        );

        const cache = `${process.env.REDIS_CACHE_KEY}:${userId}`;
        await client.del(cache);

        return res.status(201).json({message:"Task created succesfully!", task:saveTask.task});
    }
     catch (error) {
      next(error);
     }
}

export const deleteTask = async(req, res, next)=>{
  try {
    const id = req.params.id;
    const userId = req.user.id;
    console.log(userId)
    const deletedTask = await deleteTodoService(id);
    if(!deletedTask) {
      const error = new Error("Todo not found for this id!");
      error.status = 404;
      throw error; 
    }
    const cache = `${process.env.REDIS_CACHE_KEY}:${userId}`;
    await client.del(cache);

    res.json({message: "This task is deleted!",deletedTask});     
  } catch (error) {
    next(error);
  }
   
}

export const editTask = async(req, res, next)=>{
   try {
    const id = req.params.id;
    const userId = req.user.id;

    console.log(id)
    const {task, isCompleted} = req.body;
    console.log(task);

    const validateData = {
          task,
          isCompleted
    }

    const validatedData = validation.taskUpdateSchema.safeParse(validateData);

    if(!validatedData.success) {
      const error = new Error('Validation Failed!');
      error.status = 400;
      error.error = validatedData.error;
      throw error;
    } 

    const attachment = req.file ? req.file.path : undefined;
    const updatedTask = await updateTodoService(id, task, isCompleted, attachment);
    
    if(!updatedTask) {
      const error = new Error("No todo found for this id!");
      error.status = 404;
      throw error;
    }

    if(updatedTask.isCompleted && !updatedTask.archived) {
      await archiveQueue.add(
        {
          taskId: updatedTask._id,
        },
        {
          delay: parseInt(process.env.ARCHIVE_DELAY),
        }
      );
    }

    const cache = `${process.env.REDIS_CACHE_KEY}:${userId}`;
    await client.del(cache);

    res.json({message:"Todo is updated!", updatedTask});
   } catch (error) {
     next(error);
   }

}