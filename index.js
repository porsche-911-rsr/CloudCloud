import dotenv from 'dotenv'
import createServer from "./server/index.js?";

dotenv.config()

const APP_PORT = process.env.APP_PORT
const app = createServer()

const start = async () => {
    try{
        app.listen(APP_PORT, () => console.log(`Server started on ${APP_PORT}`))
    } catch(e) {
        console.log(e)
    }
}

start()
