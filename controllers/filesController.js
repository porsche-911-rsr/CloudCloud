import axios from "axios";
import dotenv from "dotenv";
import * as fs from "fs";

dotenv.config()

export const uploadFile = async (req, res) => {
    try {
        const { telegram_id } = req.body;
        const file = req.file

        const fileUrl = `${process.env.APP_HOST}/uploads/${req.file.filename}`;
        console.log(fileUrl)
        if(telegram_id) {
            axios.post(`https://cloud-api.yandex.net/v1/disk/resources/upload?path=${telegram_id}/${file.name}&url=${fileUrl}`, null, {
                headers: { "Authorization": `OAuth ${process.env.YANDEX_ACCESS}`}
            }).then(() => {
                fs.unlink(req.file.path, (err) => {
                    if (err) {
                        console.error("Ошибка при удалении файла:", err);
                        return;
                    }
                    console.log("Файл успешно удален");
                });
            })
            .catch((err) => {
                console.log(err)
                res.status(500).send('Ошибка при загрузке файла');
            })
        }
        else {
            res.status(400).send('Неверный tg id');
        }
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