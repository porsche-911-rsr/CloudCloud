import {dbPool} from "../db/db.js";
import {redisClient} from "../db/redis.js";
import axios from "axios";

export const getUserInfoByTelegramId = async (req, res) => {
    try {
        const { telegram_id } = req.params;
        redisClient.get(telegram_id)
            .then((result) => {
                if(!!result) {
                    res.status(200).json(JSON.parse(result))
                }
                else {
                    const query = 'SELECT * FROM users WHERE telegram_id = $1';
                    dbPool.query(query, [telegram_id])
                        .then((result) => {
                            if (result.rows.length === 0) {
                                return res.status(404).send('User not found')
                            }
                            else {
                                res.status(200).json(result.rows[0])
                            }
                        })
                }
            })
    }
    catch (error) {
        console.error('Error executing query', error)
        res.status(500).send('Internal server error')
    }
}
export const registerUser = async (req, res) => {
    try {
        const { telegram_id } = req.body
        const { rows } = await dbPool.query('SELECT * FROM users WHERE telegram_id = $1', [telegram_id]);

        if (rows.length === 0) {
            axios.put(`https://cloud-api.yandex.net/v1/disk/resources?path=${telegram_id}`, null, {
                headers: { "Authorization": `OAuth ${process.env.YANDEX_ACCESS}` }
            })
            .then(() => {
                const query = 'INSERT INTO Users (telegram_id, disk_space) VALUES ($1, $2) RETURNING *';
                dbPool.query(query, [telegram_id, 536870912])
                    .then((result) => {
                        redisClient.set(telegram_id, JSON.stringify(result.rows[0]))
                        res.status(201).json(result.rows[0])
                    })
            })
        }
        else {
            res.status(400).json("Вы уже зарегестрированы");
        }
    } catch (error) {
        console.error('Error executing query', error);
        res.status(500).send(error);
    }
}