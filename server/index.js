import express from 'express'
import cors from 'cors'
import appRouter from '../routes/index.js'
import fileUpload from 'express-fileupload'

const createServer = () => {
    const app = express()
    app.use(cors())
    app.use(express.json())
    app.use(fileUpload({}))
    app.use('/api', appRouter)
    return app
}

export default createServer
