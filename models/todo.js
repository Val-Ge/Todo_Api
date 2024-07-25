
import mongoose from 'mongoose';
const { Schema } = mongoose;

const todoSchema = new Schema({
    name: { type: String, required: 'Name cannot be blank!'},
    completed:{ type: Boolean, default: false },
    created_date: { type: Date, default: Date.now() },
    
});

const Todo = mongoose.model("Todo", todoSchema);
export default Todo;