// 我就告诉你们：I am angry! わかりますか？
// LifeExtender (TM)
import * as express from "express"
import * as fs from "fs"
import * as path from "path"

const LIFE_DATA = path.join(process.cwd(), "./data/life/life.json")
let LIFE_STATUS = {
    seconds: 0
}
if (fs.existsSync(LIFE_DATA)) {
    LIFE_STATUS = JSON.parse(fs.readFileSync(LIFE_DATA, "utf-8"))
}
export module Life {
    export function setupRoutes(app: express.Express) {
        app.get("/p/life", (req, res, next) => {
            res.send("" + LIFE_STATUS.seconds)
        })
        app.post("/p/life", (req, res, next) => {
            LIFE_STATUS.seconds += 1
            res.send("" + LIFE_STATUS.seconds)
        })
    }
    
    export function writeBack() {
        fs.writeFile(LIFE_DATA, JSON.stringify(LIFE_STATUS), (err) => {
            // Do nothing
        })
    }
}

setInterval(Life.writeBack, 10 * 1000)