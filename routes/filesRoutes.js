import {Router} from 'express'
import {downloadFile, getAllUserFiles, getUserStorageInfo, uploadFile} from "../controllers/filesController.js";
import {checkAuthMiddleware} from "../middlewares/checkAuthMiddleware.js";

const filesRoutes = new Router()

filesRoutes.post('/upload', uploadFile)
filesRoutes.post('/info', checkAuthMiddleware, getUserStorageInfo)
filesRoutes.post('/all', checkAuthMiddleware, getAllUserFiles)
filesRoutes.post('/get_download_link', checkAuthMiddleware, downloadFile)

export default filesRoutes
