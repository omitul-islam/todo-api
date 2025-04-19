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
export const getTodos = async (userId) => {
    return await todoModel.find({user:userId});
}

export const  createTodo = async({task, userId}) => {
    const newTask = {
        task,
        isCompleted: false,
        user:userId
    };
    const todo = new todoModel(newTask);
    console.log(todo);
    return await todo.save();
}

export const  updateTodo = async(id, task, isCompleted) => {
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

export function deleteTodo(id) {
    const todo = todoModel.findById(id);
    if(!todo)return null;
    return todoModel.findByIdAndDelete(id);
}

