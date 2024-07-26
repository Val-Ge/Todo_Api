import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import todoRoutes from './routes/todos.js'; // Updated import path
import Todo from './models/todo.js'; // Ensure this path is correct

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/todoApi', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // In case you're sending JSON

// Serve static files (optional)
app.use(express.static(path.join(__dirname, 'public')));

// Use todo routes
app.use('/api/todos', todoRoutes);

// Define the index route for initial rendering
app.get('/', async (req, res) => {
    try {
        const todos = await Todo.find().limit(10);
        res.render('index', { todos });
    } catch (error) {
        console.error('Error fetching todos:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Catch-all error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.patch('/api/todos/:id', (req, res) => {
    const { id } = req.params;
    const { completed } = req.body;

    // Update the todo item in the database
    Todo.findByIdAndUpdate(id, { completed }, { new: true })
        .then(todo => res.json(todo))
        .catch(err => res.status(500).json({ error: 'An error occurred' }));
}); 

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
