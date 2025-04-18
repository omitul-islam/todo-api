import { getTodos, createTodo, deleteTodo, updateTodo } from "../service/todoService.js";
import { validation } from "../validation/todoValidation.js";


export const getTasks = async(req, res,next)=> {
    try {
      const todos = await getTodos();
      if(todos.length === 0) {
        return res.json({message: "No todos to complete!"}); 
      }
      //console.log("todos",todos);
      return res.status(200).json({message:"All the todos are fetched successfully!",Tasks: todos});
    } catch (error) {
      next(error);
    }
}

export const addTask = async(req, res, next) => {
  try{
     const {task} = req.body
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

     const newTask = await createTodo(task);
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
        return res.status(201).json({message:"Task created succesfully!", task:saveTask.task});
    }
     catch (error) {
      next(error);
     }
}

export const deleteTask = async(req, res, next)=>{
  try {
    const id = req.params.id;
    const deletedTask = await deleteTodo(id);
    if(!deletedTask) {
      const error = new Error("Todo not found for this id!");
      error.status = 404;
      throw error; 
    }
    res.json({message: "This task is deleted!",deletedTask});     
  } catch (error) {
    next(error);
  }
   
}

export const editTask = async(req, res, next)=>{
   try {
    const id = req.params.id;
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

    const updatedTask = await updateTodo(id, task, isCompleted);
    
    if(!updatedTask) {
      const error = new Error("No todo found for this id!");
      error.status = 404;
      throw error;
    }
    res.json({message:"Todo is updated!", updatedTask});
   } catch (error) {
     next(error);
   }

}