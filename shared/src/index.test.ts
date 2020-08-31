import { completedTasks } from '.'

describe('completedTasks', () => {
    it('should only return completed tasks', () => {
        const completed = completedTasks([
            { name: 'one', done: true, id: '1' },
            { name: 'two', done: false, id: '2' },
        ])

        expect(completed).toEqual([{ name: 'one', done: true, id: '1' }])
    })
})
