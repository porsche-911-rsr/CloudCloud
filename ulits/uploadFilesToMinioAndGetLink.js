import {minioClient} from "../db/minio.js";


export const uploadFileAndGetLink = (fileName, filePath, file) => {
    return new Promise((resolve, reject) => {
        minioClient.fPutObject('logs', fileName, filePath, {'Content-Type': file.mimetype,}, function(err, etag) {
            if (err)  return reject(err)
        })
        const url = encodeURIComponent(minioClient.presignedGetObject('logs', fileName))
        resolve(url)
    })
}

export const deleteFileAndLink = async (fileName) => {
    try {
        await minioClient.removeObject('logs', fileName);
        console.log('Файл успешно удален');
    } catch (error) {
        console.error('Ошибка удаления файла:', error);
    }
}