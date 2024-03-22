import {minioClient} from "../db/minio.js";

export const uploadFileAndGetLink = (fileName, file) => {
    return new Promise((resolve, reject) => {
        const filePath = file.path
        minioClient.fPutObject('logs', fileName, filePath, {}, function(err, etag) {
            if (err)  return reject(err)
            const url = minioClient.protocol + '://' + minioClient.host + ':' + minioClient.port + '/' + bucketName + '/' + fileName
            resolve(url)
        })
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