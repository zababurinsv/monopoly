import path from "path";
import express from "express";
import cors from "cors";
import Enqueue from "express-enqueue";
import compression from "compression";
import bodyParser from 'body-parser'
import {promisify} from "util";
import dotenv from "dotenv"
import whitelist from './whitelist/whitelist.mjs'
let __dirname = path.dirname(process.argv[1]);
dotenv.config()
const highWaterMark =  2;
let app = express();
app.use(compression())
app.use(cors({ credentials: true }));
const queue = new Enqueue({
    concurrentWorkers: 4,
    maxSize: 200,
    timeout: 30000
});
app.use(queue.getMiddleware());
let corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

app.use(bodyParser.json())
app.use( express.static('docs'));

app.options('/import', cors(corsOptions))
app.get('/import', async (req, res) => {
    res.sendFile('/docs/import.html', { root: __dirname });
})

app.options('/post', cors(corsOptions))
app.get('/post', async (req, res) => {
    res.sendFile('/docs/import.html', { root: __dirname });
})

app.options('/*', cors(corsOptions))
app.get('/*', async (req, res) => {
    res.sendFile('/docs/index.html', { root: __dirname });
})
app.use(queue.getErrorMiddleware())
export default app

