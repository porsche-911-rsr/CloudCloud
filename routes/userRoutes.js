import {Router} from 'express'
import {getUserInfoByTelegramId, registerUser} from "../controllers/userController.js";
import {checkAuthMiddleware} from "../middlewares/checkAuthMiddleware.js";

const userRoutes = new Router()

userRoutes.get('/:telegram_id', checkAuthMiddleware, getUserInfoByTelegramId)
userRoutes.post('/register', registerUser)

export default userRoutes
