import { getTodos, createTodo, deleteTodo, updateTodo } from "../service/service.js";
import { validation } from "../validation/validation.js";


export const getTasks = (req, res)=> {
     const todos = getTodos();
     if(todos.length === 0) {
       return res.json({message: "No todos to complete!"}); 
     }
     //console.log("todos",todos);
     return res.status(200).json({message:"All the todos are fetched successfully!","Tasks": todos});
}

export const addTask = async(req, res) => {
     const {task} = req.body
    //  if(task === undefined) {
    //    return res.status(404).json({message:"Task is required to make a todo!"}); 
    //  }
     const validatedData = validation.taskCreateSchema.safeParse({task});

     if(!validatedData.success) {
        return res.status(400).json({
        message:"Validation Failed!",
        error: validatedData.error
      })
     } 

     const newTask = createTodo(task);

     setTimeout(() => {
        console.log(`Task ${newTask.task} created with the id: ${newTask.id}`);
     }, 0);

     const taskPromise = new Promise((resolve, reject) => {
           setTimeout(() => {
              if(!newTask.task) {
                return reject({status:404,message:"There is no task data to assign!"});
              }
              resolve({task: newTask});
           }, 200); 
     });

     try {
        const saveTask = await taskPromise;
        return res.status(201).json({message:"Task created succesfully!", task:saveTask.task});
     } 
     catch (error) {
        return res.status(500).json({message:"Error occured when saving task",error});
     }
 
}

export const deleteTask = (req, res)=>{
    const id = req.params.id;
    const deletedTask = deleteTodo(Number(id));
    if(!deletedTask) {
      return res.status(404).json({message: "Todo not found for this id!"});  
    }
    res.json({message: "This task is deleted!",deletedTask});      
}

export const editTask = (req, res)=>{
    const id = req.params.id;
    console.log(id);
    const {task, isCompleted} = req.body;
    console.log(task);

    const validateData = {
          task,
          isCompleted
    }
     
    const validatedData = validation.taskUpdateSchema.safeParse(validateData);
    if(!validatedData.success) {
      return res.status(400).json({
        message:"Validation Failed!",
        error: validatedData.error
      })
    } 

    const updatedTask = updateTodo(Number(id), task, isCompleted);
    
    if(!updatedTask) {
      res.status(404).json({message:"No todo found for this id!"});  
    }
    else 
    res.json({message:"Todo is updated!", updatedTask});
}