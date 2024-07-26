import Todo from '../models/todo.js';

export const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find().limit(10);
        console.log('Fetched todos:', todos);
        res.render('index', { todos });
    } catch (error) {
        console.error('Error fetching todos:', error);
        res.status(500).send('Internal Server Error');
    }
};

export const createTodo = async (req, res) => {
    try {
        const newTodo = await Todo.create(req.body);
        res.status(201).json(newTodo);
    } catch (error) {
        console.error('Error creating todo:', error);
        res.status(500).send('Internal Server Error');
    }
};

export const getTodo = async (req, res) => {
    try {
        const foundTodo = await Todo.findById(req.params.todoId);
        if (!foundTodo) {
            return res.status(404).send('Todo not found');
        }
        console.log('Fetched todo:', foundTodo);
        res.render('todoDetail', { todo: foundTodo });
    } catch (error) {
        console.error('Error fetching todo:', error);
        res.status(500).send('Internal Server Error');
    }
};

export const updateTodo = async (req, res) => {
    try {
        const updatedTodo = await Todo.findOneAndUpdate({ _id: req.params.todoId }, req.body, { new: true });
        if (!updatedTodo) {
            return res.status(404).send('Todo not found');
        }
        console.log('Updated todo:', updatedTodo);
        res.render('todoDetail', { todo: updatedTodo });
    } catch (error) {
        console.error('Error updating todo:', error);
        res.status(500).send('Internal Server Error');
    }
};

export const deleteTodo = async (req, res) => {
    try {
        const deleteTodo = await Todo.findByIdAndDelete(req.params.todoId);
        if (!deleteTodo) {
            return res.status(404).send('Todo not found');
        }
        console.log('Deleted todo:', deleteTodo);
        res.send({ message: 'Todo deleted successfully' });
    } catch (error) {
        console.error('Error deleting todo:', error);
        res.status(500).send('Internal Server Error');
    }
};
