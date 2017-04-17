import * as express from "express"
import * as fs from "fs"
import * as path from "path"
import * as bodyParser from "body-parser"
import { saveFile } from "./util"

const TEXT_DATA = path.join(process.cwd(), "./data/text/")
const URL_TEXT_PREFIX = "/t/"
export module Text {
    export function setupRoutes(app: express.Express) {
        app.use(bodyParser.text())
        app.post('/p/text', (req, res, next) => {
            let str = req.body
            if (str != null && typeof(str) == "string" && str.trim() != "") {
                saveFile(TEXT_DATA, "txt", str, (err, u) => {
                    if (err != null) {
                        res.status(500)
                        res.send(err.message)
                    } else {
                        res.status(200)
                        res.send(`${req.protocol}://${req.hostname}${URL_TEXT_PREFIX}${u}`)
                    }
                })
            } else {
                res.sendStatus(204)
            }
        })
        app.get(`${URL_TEXT_PREFIX}:id`, (req, res, next) => {
            let id = req.params.id
            let file = `${TEXT_DATA}${id}.txt`
            fs.exists(file, (exists) => {
                if (exists) {
                    // TODO: Return HTML for browser agents
                    res.setHeader("Content-Type", "text/plain")
                    res.sendFile(file)
                } else {
                    res.sendStatus(404)
                }
            })
        })
    }
}