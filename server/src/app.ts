import express from 'express'
import { v4 } from 'uuid'
import { Todo, completedTasks, incompletedTasks } from 'shared'

export const app = express()
app.use(express.json())

export const todos: Todo[] = []
app.get('/todo', (req, res) => {
    if ('complete' in req.query) {
        return res.status(200).json(completedTasks(todos))
    }
    if ('incomplete' in req.query) {
        return res.status(200).json(incompletedTasks(todos))
    }
    return res.status(200).json(todos)
})
app.post('/todo', (req, res) => {
    if (!req.body.name) {
        return res.status(400).json({ message: 'name' })
    }

    const todo = {
        name: req.body.name,
        done: false,
        id: v4(),
    }
    todos.push(todo)

    res.status(200).json(todo)
})
app.put('/todo/:id', (req, res) => {
    if (!req.params.id && !req.body.name) {
        return res.status(400).json({ message: 'no updates' })
    }

    const existing = todos.find((todo) => todo.id === req.params.id)
    if (!existing) {
        return res.status(404).send()
    }

    if (req.body.name) {
        existing.name = req.body.name
    }
    if (req.body.done !== undefined) {
        existing.done = !!req.body.done
    }

    res.status(200).send()
})
