import * as express from "express"
import { Text } from "./text"
import { Url } from "./url"

main()
function main() {
    let app = express()
    Text.setupRoutes(app)
    Url.setupRoutes(app)
    app.listen(2017)
}