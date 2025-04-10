import { todos } from "../localTodosStore.js";

export function getTodos() {
    // console.log(todos);
    return todos;
}

export function createTodo(task) {
    const newTask = {
        id: todos.length + 1,
        task,
        isCompleted: false
    };
    todos.push(newTask);
    // console.log(todos);
    return newTask;
}

export function updateTodo(id, task, isCompleted) {
     const index = todos.findIndex(t => t.id === id);
     if(index === -1)return null;
     let updatedTask = [];
     if(task !== undefined) {
      updatedTask = {...todos[index], task: task};
     }
     else {
      updatedTask = todos[index];
     }

     if(isCompleted !== undefined) {
       updatedTask.isCompleted = isCompleted; 
     }

     todos.splice(index, 1, updatedTask);     
     console.log(todos); 
     return updatedTask;
}

export function deleteTodo(id) {
    const index = todos.findIndex(t => t.id === id);

    if(index === -1)return null;
    const RemoveTask = todos.splice(index, 1);
    return RemoveTask[0];
}