import { getTodos, createTodo, deleteTodo, updateTodo } from "../service/service.js";


export const getTasks = (req, res)=> {
     const todos = getTodos();
     if(todos.length === 0) {
       return res.json({message: "No todos to complete!"}); 
     }
     //console.log("todos",todos);
     return res.status(200).json({message:"All the todos are fetched successfully!","Tasks": todos});
}

export const addTask = (req, res) => {
     const {task} = req.body
     if(task === undefined) {
       return res.status(404).json({message:"Task is required to make a todo!"}); 
     }
     const newTask = createTodo(task);

     return res.status(201).json(newTask);
}

export const deleteTask = (req, res)=>{
    const id = req.params.id;
    const deletedTask = deleteTodo(Number(id));
    if(!deletedTask) {
      return res.status(404).json({message: "Todo not found for this id!"});  
    }
    res.json({message: "This task is deleted!",deletedTask});      
}

export const EditTask = (req, res)=>{
    const id = req.params.id;
    console.log(id);
    const {task, isCompleted} = req.body;
    console.log(task);
    const updatedTask = updateTodo(Number(id), task, isCompleted);
    
    if(!updatedTask) {
      res.status(404).json({message:"No todo found for this id!"});  
    }
    else 
    res.json({message:"Todo is updated!", updatedTask});
}