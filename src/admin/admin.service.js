import userModel from "../auth/auth.model.js";
import todoModel from "../todo/model/todoModel.js";

export const getTodosService = async () => {
    return await todoModel.find();
}

export const getTodoByIdService = async (id) => {
    return await todoModel.find({user:id, archived:false});
}

export function deleteTodoService(id) {
    const todo = todoModel.findById(id);
    if(!todo)return null;
    return todoModel.findByIdAndDelete(id);
}

export const  updateTodoService = async(id, task, isCompleted) => {
     const todo = await todoModel.findById(id);
     
     if(!todo) return null;

     if(task !== undefined) {
         todo.task = task;
     }

     if(isCompleted !== undefined) {
       todo.isCompleted = isCompleted; 
     }

     console.log(todo); 
     return await todo.save();
}

export const deleteUserService = async (id) => {
    const todo = await todoModel.findById(id);
    if(!todo) return null;
    return await todoModel.findByIdAndDelete(id);
}

export const updateUserService = async(user) =>{
    return await user.save()
}

export const getUsersService = async () => {
    return await userModel.find().select("-password");
}

export const getUserByIdService = async (id) => {
    return await userModel.findById(id).select('-password');
}