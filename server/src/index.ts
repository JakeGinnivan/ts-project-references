import http from 'http'
import { app } from './app'

const server = http.createServer(app)

const port = 5300

server.listen(port, () => {
    console.info(`Express is listening to http://localhost:${port}`)
})
