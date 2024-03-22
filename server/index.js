import express from 'express'
import cors from 'cors'
import appRouter from '../routes/index.js'
import * as path from "path";

const createServer = () => {
    const app = express()
    app.use(cors())
    app.use(express.json())
    app.use('/static', express.static(path.join(__dirname, 'uploads')))
    app.use('/api', appRouter)
    return app
}

export default createServer
