import express from 'express'
import cors from 'cors'
import appRouter from '../routes/index.js'
import * as path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const createServer = () => {
    const app = express()
    app.use(cors())
    app.use(express.json())
    app.use('/static', express.static(path.join(__dirname, 'uploads')))
    app.use('/api', appRouter)
    return app
}

export default createServer
