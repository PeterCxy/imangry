import * as express from "express"
import * as fs from "fs"
import * as path from "path"
import * as bodyParser from "body-parser"
import { isWebUri } from "valid-url"
import { saveFile } from "./util"

const URL_DATA = path.join(process.cwd(), "./data/url/")
const URL_URL_PREFIX = "/u/"
export module Url {
    export function setupRoutes(app: express.Express) {
        app.use(bodyParser.urlencoded({ extended: true }))
        app.post('/p/url', (req, res, next) => {
            let url = req.body['u']
            if (url != null && url.trim() != "" && isWebUri(url)) {
                saveFile(URL_DATA, "url", url, (err, u) => {
                    if (err != null) {
                        res.status(500)
                        res.send(err.message)
                    } else {
                        res.status(200)
                        res.send(`${req.protocol}://${req.hostname}${URL_URL_PREFIX}${u}`)
                    }
                })
            } else {
                res.sendStatus(204)
            }
        })
        app.get(`${URL_URL_PREFIX}:id`, (req, res, next) => {
            let id = req.params.id
            let file = `${URL_DATA}${id}.url`
            fs.exists(file, (exists) => {
                if (exists) {
                    fs.readFile(file, "utf-8", (err, data) => {
                        if (err != null) {
                            res.sendStatus(404)
                        } else {
                            res.redirect(301, data)
                        }
                    })
                } else {
                    res.sendStatus(404)
                }
            })
        })
    }
}