import userModel from "../auth/auth.model.js";
import client from "../todo/redis/redis.js";
import archiveQueue from "../utils/archiveSchedule.js";
import { validation } from "../validation/todoValidation.js";
import { deleteTodoService, getTodoByIdService, getTodosService, getUserByIdService, getUsersService, updateTodoService, updateUserService } from "./admin.service.js";

export const getTasks = async(req, res,next)=> {
    try {
      const userId = req.user.id;
      const cache = `${process.env.REDIS_CACHE_KEY} : ${userId}`;
      const cachedTodos = await client.get(cache);
      if(cachedTodos) {
        console.log("Cache found!");
        return res.status(200).json({message:"Todo fetched successfully!", Tasks: JSON.parse(cachedTodos)});
      }

      const todos = await getTodosService();
      console.log("todos",todos);
      if(!todos || todos.length === 0) {
        return res.json({message: "No todos to complete!"}); 
      }
      const delay = process.env.ARCHIVE_DELAY;
      await client.setEx(cache,delay,JSON.stringify(todos));
      return res.status(200).json({message:"All the todos are fetched successfully!",Tasks: todos});
    } catch (error) {
      next(error);
    }
}

export const getTasksByUserId = async(req, res,next)=> {
    try {
      const id = req.params.id;  
      const cache = `${process.env.REDIS_CACHE_KEY} : ${id}`;
      const cachedTodos = await client.get(cache);
      if(cachedTodos) {
        console.log("Cache found!");
        return res.status(200).json({message:"Todo fetched successfully!", Tasks: JSON.parse(cachedTodos)});
      }
      const todos = await getTodoByIdService(id);
      console.log("todos",todos);

      if(!todos || todos.length === 0) {
        return res.json({message: "No todos to complete!"}); 
      }
      const delay = process.env.ARCHIVE_DELAY;
      await client.setEx(cache,delay,JSON.stringify(todos));
      return res.status(200).json({message:"Todo fetched successfully!",Tasks: todos});
    } catch (error) {
      next(error);
    }
}

export const deleteTask = async(req, res, next)=>{
  try {
    const id = req.params.id;
    const deletedTask = await deleteTodoService(id);
    if(!deletedTask) {
      const error = new Error("Todo not found for this id!");
      error.status = 404;
      throw error; 
    }
    const cache = `${process.env.REDIS_CACHE_KEY}:${id}`;
    await client.del(cache);

    const userId = req.user.id;
    const cacheFromAlltasks = `${process.env.REDIS_CACHE_KEY} : ${userId}`;
    await client.del(cacheFromAlltasks);

    res.json({message: "This task is deleted!",deletedTask});     
  } catch (error) {
    next(error);
  }
}

export const editTask = async(req, res, next)=>{
   try {
    const id = req.params.id;
    const {task, isCompleted} = req.body;

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

    const cache = `${process.env.REDIS_CACHE_KEY}:${id}`;
    await client.del(cache);

    const userId = req.user.id;
    const cacheFromAlltasks = `${process.env.REDIS_CACHE_KEY} : ${userId}`;
    await client.del(cacheFromAlltasks);

    res.json({message:"Todo is updated!", updatedTask});
   } catch (error) {
     next(error);
   }
}

export const deleteUser = async(req, res, next) => {
      try {
         const userId = req.params.id;
         const deletedUser = await userModel.findByIdAndDelete(userId);
         if(!deletedUser) {
            return res.status(404).json({message: "User not found!"});
         }
         const {password, ...rest} = deletedUser.toObject();
         return res.status(200).json({message: "User deleted successfully!", deletedUser:rest});

      } catch (error) {
         next(error);
      }
}

export const updateUser = async(req, res, next) => {
     try {
        const userId = req.params.id;
        const {username, email, role} = req.body;
        const user = await userModel.findById(userId);
        if(!user) {
            return res.status(404).json({message:"user not found!"});
        }

        if(username !== undefined) {
            user.username = username;
        }
        if(email !== undefined) {
            user.email = email;
        }
        if(role !== undefined) {
            user.role = role;
        }
        const updatedUser = await updateUserService(user);
        const {password, ...rest} = updatedUser.toObject();
        return res.status(200).json({message: "User updated successfully!", updatedUser:rest});
         
     } catch (error) {
       next(error); 
     }
}

export const getUsers = async(req, res, next) => {
       try {
          const users = await getUsersService();
            if(!users || users.length === 0) {
                return res.status(404).json({message: "No users found!"});
            }
            return res.status(200).json({message: "All the users are fetched successfully!", users});
       } catch (error) {
         next(error);
       }
}

export const getUserById = async(req,res,next) => {
    try {
        const userId = req.params.id;
        const user = await getUserByIdService(userId);
        if(!user) {
            return res.status(404).json({message: "User not found!"});
        }
        return res.status(200).json({message: "User found successfully!", user});
    } catch (error) {
      next(error);  
    }
}

