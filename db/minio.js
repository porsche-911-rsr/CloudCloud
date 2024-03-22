import * as Minio from 'minio';
import dotenv from "dotenv";
dotenv.config()
export const minioClient = new Minio.Client({
    endPoint: process.env.MINIO_HOST,
    port: 9000,
    useSSL: false,
    accessKey: process.env.MINIO_ACCESS,
    secretKey: process.env.MINIO_SECRET
})