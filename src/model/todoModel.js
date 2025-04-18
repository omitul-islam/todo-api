import mongoose from 'mongoose';

const {schema, model} = mongoose;

const todoSchema = new schema({
     task: {
          type: String,
          required: true,
          trim:true,
     },
     isCompleted: {
          type: Boolean,
          default: false,
     }
    
}, {
    timestamps: true,
});

export default model('Todo', todoSchema);