import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import todoRoutes from './routes/todos.js';
import Todo from './models/todo.js'; // Ensure this path is correct

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
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // In case you're sending JSON

// Serve static files (optional)
// app.use(express.static('public'));

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

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
