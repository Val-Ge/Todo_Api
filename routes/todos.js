import express from 'express';
const router = express.Router();
import { getTodos, createTodo, getTodo, updateTodo, deleteTodo } from '../controllers/todoControllers.js';

router.route('/')
.get(getTodos)
.post(createTodo)

router.route('/:todoId')
.get(getTodo)
.put(updateTodo)
.delete(deleteTodo)

export default router;
