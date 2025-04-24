// import { todos } from "../localTodosStore.js";
// export function getTodos() {
//     // console.log(todos);
//     return todos;
// }

// export function createTodo(task) {
//     const newTask = {
//         id: todos.length + 1,
//         task,
//         isCompleted: false
//     };
//     todos.push(newTask);
//     // console.log(todos);
//     return newTask;
// }

// export function updateTodo(id, task, isCompleted) {
//      const index = todos.findIndex(t => t.id === id);
//      if(index === -1)return null;
//      let updatedTask = [];
//      if(task !== undefined) {
//       updatedTask = {...todos[index], task: task};
//      }
//      else {
//       updatedTask = todos[index];
//      }

//      if(isCompleted !== undefined) {
//        updatedTask.isCompleted = isCompleted; 
//      }

//      todos.splice(index, 1, updatedTask);     
//      console.log(todos); 
//      return updatedTask;
// }

// export function deleteTodo(id) {
//     const index = todos.findIndex(t => t.id === id);

//     if(index === -1)return null;
//     const RemoveTask = todos.splice(index, 1);
//     return RemoveTask[0];
// }

//// the above code is for the local todos store using memory or a local array 


import todoModel from "../model/todoModel.js";
export const getTodosService = async (userId) => {
    return await todoModel.find({user:userId, archived:false});
}

export const getArchivedTasksService = async (userId) => {
    return await todoModel.find({user:userId, archived:true});
}

export const  createTodoService = async({task, userId,attachment}) => {
    const newTask = {
        task,
        isCompleted: false,
        user:userId,
        attachment
    };
    const todo = new todoModel(newTask);
    console.log(todo);
    return await todo.save();
}

export const  updateTodoService = async(id, task, isCompleted, attachment) => {
     const todo = await todoModel.findById(id);
     
     if(!todo) return null;

     if(task !== undefined) {
         todo.task = task;
     }

     if(isCompleted !== undefined) {
       todo.isCompleted = isCompleted; 
     }
     if(attachment !== undefined) {
        todo.attachment = attachment; 
     }

     console.log(todo); 
     return await todo.save();
}

export async function deleteTodoService(id) {
    const todo = todoModel.findById(id);
    if(!todo)return null;
    return await todoModel.findByIdAndDelete(id);
}

