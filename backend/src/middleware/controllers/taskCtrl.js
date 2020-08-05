const Task = require('../../models/task')

module.exports = {
    addTask,
    getTask,
    updateOrder,
    getById,
    updateTask,
    deleteTask
}

async function addTask(req, res) {
    await req.user.populate({
        path: 'tasks'
    }).execPopulate()

    const task = new Task({
        ...req.body,
        owner: req.user._id,
        order: req.user.tasks ? req.user.tasks.length + 1 : 0
    })

    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }

}

async function getTask(req, res) {
    const match = {}
    const sort = {}
    if (req.query.completed) {
        match.completed = req.query.completed === 'true'
    }

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }
    try {
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort: 'order'
            }
        }).execPopulate()
        res.send(req.user.tasks)
    } catch (e) {
        res.status(500).send()
    }
}

async function updateOrder(req, res) {
    const tasks = req.body;
    try {
        for (let i = 0; i < tasks.length; i++) {
            const task = await Task.findOne({_id: tasks[i]._id})
            task.order = i + 1;
            await task.save()
        }
        res.status(200).send()
    } catch (e) {
        res.status(500).send(e)
    }

}

async function getById(req, res) {
    const _id = req.params.id
    try {
        const task = await Task.findOne({_id, owner: req.user._id})

        if (!task) {
            return res.status(404).send()
        }
        res.send(task)

    } catch (e) {
        res.status(500).send(e)
    }
}

async function updateTask(req, res) {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({error: 'Invalid operation'})
    }

    try {

        const task = await Task.findOne({_id: req.params.id, owner: req.user._id})

        if (!task) {
            return res.status(404).send('Task not found')
        }

        updates.forEach(update => {
            task[update] = req.body[update]
        })
        await task.save()

        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
}

async function deleteTask(req, res) {
    try {
        const task = await Task.findOneAndDelete({_id: req.params.id, owner: req.user._id})

        if (!task) {
            return res.status(404).send()
        }
        res.send(task)

    } catch (e) {
        res.status(500).send(e)
    }
}
