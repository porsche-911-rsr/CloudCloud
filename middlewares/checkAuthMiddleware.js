import {getUserFromRedis} from "../ulits/getUserFromRedis.js";
import {dbPool} from "../db/db.js";

export const checkAuthMiddleware = async (req, res, next) => {
    const { telegram_id } = req.body

    const result = await getUserFromRedis(telegram_id)
    if(!!result) return next()

    const { rows } = await dbPool.query('SELECT * FROM users WHERE telegram_id = $1', [telegram_id]);
    if (rows.length !== 0) return next()

    res.status(403).send('unauth');
}
