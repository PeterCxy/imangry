import * as express from "express"
import { Text } from "./text"
import { Url } from "./url"
import { Life } from "./life"

main()
function main() {
    let app = express()
    Text.setupRoutes(app)
    Url.setupRoutes(app)
    Life.setupRoutes(app)
    app.listen(2017)
}