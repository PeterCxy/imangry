import * as express from "express"
import * as fs from "fs"
import * as path from "path"
import * as bodyParser from "body-parser"
import { saveFile } from "./util"
import * as useragent from "useragent"

const BROWSER_FAMILIES = [
    "chrome",
    "chrome mobile",
    "chrome mobile ios",
    "msie",
    "trident",
    "firefox",
    "firefox mobile",
    "firefox mobile ios",
    "safari",
    "safari mobile",
    "mobile safari"
]
const TEXT_DATA = path.join(process.cwd(), "./data/text/")
const URL_TEXT_PREFIX = "/t/"
const TEMPLATE = fs.readFileSync(path.join(process.cwd(), "./template/code.html"), "utf-8")
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
                    res.charset = "utf-8"
                    if (BROWSER_FAMILIES.indexOf(useragent.parse(req.headers['user-agent']).family.toLowerCase()) > -1) {
                        // Browser request. Return a beautiful HTML.
                        renderHTML(file, (err, html) => {
                            if (err) {
                                res.sendStatus(404)
                            } else {
                                res.contentType("text/html")
                                res.send(html)
                            }
                        })
                    } else {
                        res.contentType("text/plain")
                        res.sendFile(file)
                    }
                } else {
                    res.sendStatus(404)
                }
            })
        })
    }

    function renderHTML(file: string, callback: (err: Error, html: string) => void) {
        fs.readFile(file, "utf-8", (err, content) => {
            if (err) {
                callback(err, null)
            } else {
                callback(null, TEMPLATE.replace("{{code}}", content))
            }
        })
    }
}