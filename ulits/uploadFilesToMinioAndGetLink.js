import {minioClient} from "../db/minio.js";


export const uploadFileAndGetLink = (fileName, filePath, file) => {
    return new Promise((resolve, reject) => {
        minioClient.fPutObject('logs', fileName, filePath, {'Content-Type': file.mimetype,}, function(err, etag) {
            if (err)  return reject(err)
            if (etag) console.log(etag)
        })
        const url = minioClient.presignedGetObject('logs', fileName)
        resolve(url)
    })
}