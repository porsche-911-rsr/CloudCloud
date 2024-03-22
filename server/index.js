import express from 'express'
import cors from 'cors'
import appRouter from '../routes/index.js'

const createServer = () => {
    const app = express()
    app.use(cors())
    app.use(express.json())
    app.use('/api', appRouter)
    return app
}

export default createServer
