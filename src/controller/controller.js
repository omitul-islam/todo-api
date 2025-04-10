import { getTodos, createTodo, deleteTodo, updateTodo } from "../service/service.js";


export const getTasks = (req, res)=> {
     const todos = getTodos();
    //  console.log("todos",todos);
     return res.status(200).json({message:"All the todos are fetched successfully!","Tasks": todos});
}

export const addTask = (req, res) => {
     const {task} = req.body;
     const newTask = createTodo(task);

    return res.status(201).json(newTask);
}

export const deleteTask = ()=>{
    const id = req.param;
    const deletedTask = deleteTodo(Number(id));
    if(!deleteTask) {
      return res.status(404).json({message: "Todo not found for this id!"});  
    }
    res.json({message: "This task is deleted!"}, deleteTask);      
}

export const EditTask = (req, res)=>{
    const id = req.param;
    const {modifiedTask} = req.body;
    const updatedTask = updateTodo(Number(id), modifiedTask);
    
    if(!updatedTask) {
      res.status(404).json({message:"No todo found for this id!"});  
    }
    res.json({message:"Todo is updated!"}, updatedTask);
}