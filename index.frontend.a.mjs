import path from "path";
import dotenv from "dotenv"
import express from "express";
import cors from "cors";
import Enqueue from "express-enqueue";
import compression from "compression";
import bodyParser from 'body-parser'
let __dirname = path.dirname(process.argv[1]);
__dirname = __dirname.replace(/\/node_modules\/pm2\/lib/gi, '')
dotenv.config()
const highWaterMark =  2;
let app = express();
app.use(compression())
app.use(bodyParser.json())
app.use(cors({ credentials: true }));
const queue = new Enqueue({
    concurrentWorkers: 4,
    maxSize: 200,
    timeout: 30000
});
app.use(queue.getMiddleware());

app.use( express.static('core-frontend'));

app.get('/*', async (req, res) => {
    res.sendFile('/core-frontend/index.html', { root: __dirname });
})

app.use(queue.getErrorMiddleware())
export default app

