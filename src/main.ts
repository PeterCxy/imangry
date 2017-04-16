import * as express from "express"
import { Text } from "./text"

main()
function main() {
    let app = express()
    Text.setupRoutes(app)
    app.listen(2017)
}