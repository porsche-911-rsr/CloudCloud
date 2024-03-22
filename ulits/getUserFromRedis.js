import {redisClient} from "../db/redis.js";

export const getUserFromRedis = (telegram_id) => {
    return new Promise((resolve, reject) => {
        redisClient.get(telegram_id, (err, data) => {
            if (err) reject(err)
            if(data !== null) {
                resolve(JSON.parse(data))
            }
            else {
                resolve(null)
            }
        })
    })
}