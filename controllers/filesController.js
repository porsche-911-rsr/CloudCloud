import axios from "axios";
import dotenv from "dotenv";
import {uploadFileAndGetLink} from "../ulits/uploadFilesToMinioAndGetLink.js";
import fs from "node:fs"

dotenv.config()

export const uploadFile = async (req, res) => {
    try {
        const { telegram_id } = req.body;
        const file = req.files.file
        const fileName = Date.now() + '-' + file.name
        const filePath = `./uploads/${fileName}`
        const getAsyncOperation = async (result, url_to_yandex_query) => {
            axios.get(result.href, {
                headers: { "Authorization": `OAuth ${process.env.YANDEX_ACCESS}`}
            }).then((async_result) => {
                res.status(200).send({...result, url_to_yandex_query, async_result: async_result.data})
            })
            .catch((err) => {
                console.log(err)
                res.status(500).send({...result, url_to_yandex_query, err})
            })
        }

        fs.writeFile(filePath, file.data, (err) => {
            if (err) {
                console.error('Error saving file:', err);
            }
        })

        uploadFileAndGetLink(fileName, filePath, file)
            .then((res) => {
                const fileLink = encodeURIComponent(res)
                const URL_TO_YANDEX_UPLOAD_QUERY = `https://cloud-api.yandex.net/v1/disk/resources/upload?path=${telegram_id}%2F${file.name}&url=${fileLink}`
                if(telegram_id) {
                    axios.post(URL_TO_YANDEX_UPLOAD_QUERY, null, {
                        headers: { "Authorization": `OAuth ${process.env.YANDEX_ACCESS}`}
                    }).then((result) => {
                        getAsyncOperation(result.data, URL_TO_YANDEX_UPLOAD_QUERY)
                    })
                        .catch((err) => {
                            console.log(err)
                            res.status(500).send('Ошибка при загрузке файла', err);
                        })
                }
                else {
                    res.status(400).send('Неверный tg id');
                }
            })

        // fs.unlink(filePath, (err) => {
        //     if (err) {
        //         console.error('Error deleting file:', err);
        //     }
        // })
    } catch (error) {
        console.error('Error executing query', error);
        res.status(500).send('Internal server error');
    }
}

export const getUserStorageInfo = async (req, res) => {
    try {
        // Просмотреть профиль: показывается сколько файлов находится у пользователя на диске, краткая информация и сколько осталь места на диске для хранения
        const {telegram_id} = req.body
        axios.get(`https://cloud-api.yandex.net/v1/disk/resources?path=${telegram_id}`, {
            headers: {"Authorization": `OAuth ${process.env.YANDEX_ACCESS}`}
        }).then(result => {
            const data = result.data._embedded

            const files_total = data.total
            const storage_used = data.items.reduce((accumulator, currentValue) => {
                return accumulator + currentValue.size;
            }, 0)

            res.status(200).send({files_total, storage_used})
        })
    } catch (error) {
        console.error('Error executing query', error);
        res.status(500).send('Internal server error');
    }
}

export const getAllUserFiles = async (req, res) => {
    try {
        const {telegram_id} = req.body
        axios.get(`https://cloud-api.yandex.net/v1/disk/resources?path=${telegram_id}`, {
            headers: {"Authorization": `OAuth ${process.env.YANDEX_ACCESS}`}
        }).then(result => {
            const data = result.data._embedded
            res.status(200).send({items: data.items})
        })
    } catch (error) {
        console.error('Error executing query', error);
        res.status(500).send('Internal server error');
    }
}

export const downloadFile = async (req, res) => {
    try {
        const {telegram_id, filename} = req.body
        axios.get(`https://cloud-api.yandex.net/v1/disk/resources/download?path=${telegram_id}/${filename}`, {
            headers: {"Authorization": `OAuth ${process.env.YANDEX_ACCESS}`}
        }).then(result => {
            console.log(result)
            res.status(200).send({href: result.data.href})
        })
    } catch (error) {
        console.error('Error executing query', error);
        res.status(500).send('Internal server error');
    }
}
export const getAnalytics = async (req, res) => {
    try {
        //  бот составляет график файлов на диске
    } catch (error) {
        console.error('Error executing query', error);
        res.status(500).send('Internal server error');
    }
}