import mongoose from 'mongoose';

const {schema, model} = mongoose;

const todoSchema = new schema({
     task: {
          type: String,
          required: [true,'Task is required'],
          trim:true,
          minlength: [10, 'Task must be at least 10 characters long'],
     },
     isCompleted: {
          type: Boolean,
          default: false,
     }
    
}, {
    timestamps: true,
});

const todoModel = model('Todo', todoSchema);
export default todoModel