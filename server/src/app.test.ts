import request from 'supertest'
import { app, todos } from './app'
import { Todo } from 'shared'

beforeEach(() => {
    // Reset todos
    todos.length = 0
})

test('can complete todo lifecycle', async () => {
    let todo1: Todo
    let todo2: Todo
    const appInstance = request(app)
    await appInstance
        .post('/todo')
        .send({ name: 'One' })
        .set('Content-Type', 'application/json')
        .expect(200)
        .then((response) => {
            todo1 = response.body
        })

    await appInstance
        .post('/todo')
        .send({ name: 'Two' })
        .set('Content-Type', 'application/json')
        .expect(200)
        .then((response) => {
            todo2 = response.body
        })

    await appInstance
        .get('/todo')
        .expect(200)
        .then((response) => {
            expect(response.body).toEqual([todo1, todo2])
        })

    await appInstance.put(`/todo/${todo1!.id}`).send({ done: true }).expect(200)

    await appInstance
        .get('/todo?complete')
        .expect(200)
        .then((response) => {
            expect(response.body).toEqual([{ ...todo1, done: true }])
        })

    await appInstance
        .get('/todo?incomplete')
        .expect(200)
        .then((response) => {
            expect(response.body).toEqual([todo2])
        })
})
