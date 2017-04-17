import * as express from "express"
import { Text } from "./text"
import { Url } from "./url"
import { Life } from "./life"
import * as RateLimit from "express-rate-limit"

main()
function main() {
    let app = express()
    app.enable('trust proxy')
    app.use(express.static("./static"))
    app.use('/p/', new RateLimit({
        windowMs: 10 * 1000,
        max: 10,
        delayMs: 0,
        message: 'Violently moha is not suggested.'
    }))
    Text.setupRoutes(app)
    Url.setupRoutes(app)
    Life.setupRoutes(app)
    app.listen(2017)
}