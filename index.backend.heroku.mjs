import fs from "fs";
import path from "path";
import dotenv from "dotenv"
import express from "express";
import cors from "cors";
import Enqueue from "express-enqueue";
import compression from "compression";
import bodyParser from 'body-parser'
import chronium from "./core-backend/static/html/components/component_modules/ssr/ssr.mjs";
import whitelist from './whitelist/whitelist.mjs'
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
let corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

app.use( express.static('core-backend'));

app.use( express.static('core-backend'));

app.options('/import', cors(corsOptions))
app.get('/import', async (req, res) => {
    res.sendFile('/core-backend/import.html', { root: __dirname });
})

app.options('/*', cors(corsOptions))
app.get('/*', async (req, res) => {
    res.sendFile('/core-backend/index.html', { root: __dirname });
})

app.options('/render', cors(corsOptions))
app.post('/render', async (req, res) => {
    try{
        let object =  await chronium(true,'','6', 'https://zababurinsv.github.io/dex/',req.url)
        res.send(object['html'])
    }catch (e) {
        console.log('----->', e)
        res.send('error', e)
    }
})

app.use(queue.getErrorMiddleware())
export default app

