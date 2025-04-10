let todos = [];


export function getTodos() {
    return todos;
}

export function createTodo(task) {
    const newTask = {
        id: todos.length + 1,
        task,
        isCompleted: false
    };
    todos.push(newTask);
    return newTask;
}

export function updateTodo(id, ModifiedTask) {
     const todo = todo.find(t => t.id === id);
     if(!todo)return null;
     
     todo.task = ModifiedTask;
     return todo;
}

export function deleteTodo(id) {
    const index = todos.findIndex(t => t.id === id);

    if(index === -1)return null;
    const RemoveTask = todos.splice(index, 1);
    return removeTodo[0];
}