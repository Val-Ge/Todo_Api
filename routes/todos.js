import express from 'express';
const router = express.Router();
import Todo from '../models/todo.js';

// GET route to fetch and render todos
router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find().limit(10); // Adjust query as needed
        console.log('Fetched todos:', todos); // Log fetched todos
        res.render('index', { todos }); // Pass todos data to EJS template
    } catch (error) {
        console.error('Error fetching todos:', error);
        res.status(500).send('Internal Server Error');
    }
});

// POST route to create a new todo
router.post('/', async (req, res) => {
    try {
        const newTodo = await Todo.create(req.body);
        res.status(201).json(newTodo); // Send the created todo as response
    } catch (error) {
        console.error('Error creating todo:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/:todoId', async (req, res) => {
    try {
        const foundTodo = await Todo.findById(req.params.todoId); // Fetch todo by ID
        if (!foundTodo) {
            return res.status(404).send('Todo not found'); // Handle case where todo is not found
        }
        console.log('Fetched todo:', foundTodo); // Log fetched todo
        res.render('todoDetail', { todo: foundTodo }); // Pass the single todo to EJS template
    } catch (error) {
        console.error('Error fetching todo:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.put('/:todoId', async (req, res) => {
    try{
    const updatedTodo = await Todo.findOneAndUpdate({_id: req.params.todoId }, req.body, { new: true } ); //find the todo, update data, return the updated document
    if (!updatedTodo) {
        return res.status(404).send('Todo not found'); // Handle case where todo is not found
    }
    console.log('updated todo:', updatedTodo); // Log updated todo
    res.render('todoDetail', { todo: updatedTodo }); // Pass the updated todo to EJS template
} catch (error) {
    console.error('Error fetching todo:', error);
    res.status(500).send('Internal Server Error');
}
});

router.delete('/:todoId', async (req, res) => {
    try{
    const deleteTodo = await Todo.findByIdAndDelete({_id: req.params.todoId }); //find the todo and delete
    if (!deleteTodo) {
        return res.status(404).send('Todo not found'); // Handle case where todo is not found
    }
    console.log('Deleted todo:', deleteTodo); // Log deleted todo
    res.send({message: 'Todo deleted successfully '})
    
} catch (error) {
    console.error('Error fetching todo:', error);
    res.status(500).send('Internal Server Error');
}
});

export default router;
