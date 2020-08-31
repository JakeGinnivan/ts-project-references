export interface Todo {
    id: string
    name: string
    done: boolean
}

export function completedTasks(tasks: Todo[]) {
    return tasks.filter((task) => task.done)
}

export function incompletedTasks(tasks: Todo[]) {
    return tasks.filter((task) => !task.done)
}
