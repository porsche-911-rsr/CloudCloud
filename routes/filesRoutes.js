import {Router} from 'express'
import {downloadFile, getAllUserFiles, getUserStorageInfo, uploadFile} from "../controllers/filesController.js";
import {checkAuthMiddleware} from "../middlewares/checkAuthMiddleware.js";
import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage: storage })


const filesRoutes = new Router()

filesRoutes.post('/upload',checkAuthMiddleware, upload.single('file'), uploadFile)
filesRoutes.post('/info', checkAuthMiddleware, getUserStorageInfo)
filesRoutes.post('/all', checkAuthMiddleware, getAllUserFiles)
filesRoutes.post('/get_download_link', checkAuthMiddleware, downloadFile)

export default filesRoutes
