import { Router } from "express"
import userRoutes from './userRoutes.js'
import filesRoutes from './filesRoutes.js'

const appRouter = new Router()

appRouter.use('/user', userRoutes)
appRouter.use('/files', filesRoutes)

export default appRouter
