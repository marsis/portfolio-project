const express = require('express');
const router = new express.Router();

const Task = require('../middleware/controllers/taskCtrl')
const auth = require('../middleware/auth')

router.post('/api/tasks', auth, Task.addTask)
// GET /tasks?completed=true
// GET /task?limit=10&skip=20
// GET /tasks?sortBy=cteatedAt:desc

router.get('/api/tasks', auth, Task.getTask);

router.put('/api/tasks/change-order', auth, Task.updateOrder);

router.get('/api/tasks/:id', auth, Task.getById);

router.patch('/api/tasks/:id', auth, Task.updateTask);

router.delete('/api/tasks/:id', auth,Task.deleteTask);

module.exports = router
