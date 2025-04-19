import mongoose from 'mongoose';

const {Schema, model} = mongoose;

const todoSchema = new Schema({
     task: {
          type: String,
          required: [true,'Task is required'],
          trim:true,
          minlength: [10, 'Task must be at least 10 characters long'],
     },
     isCompleted: {
          type: Boolean,
          default: false,
     },
     
     user: {
          type:mongoose.Schema.Types.ObjectId,
          ref:'User',
     },

     attachment: {
          type: String,
          default: null,
     },
    
}, {
    timestamps: true,
});

const todoModel = model('Todo', todoSchema);
export default todoModel;