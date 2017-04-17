import * as fs from "fs"

const dict = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
export function generateID() {
    let str = ""
    for (let i = 0; i < 6; i++) {
        str += dict.charAt(Math.floor(Math.random() * dict.length))
    }
    return str
}


export function saveFile(dataPath: string, ext: string, data: any, callback: (err: Error, u: string) => void) {
    let id = generateID()
    let file = `${dataPath}${id}.${ext}`
    fs.exists(file, (exists) => {
        if (exists) {
            saveFile(dataPath, ext, data, callback) // File exists, try again.
        } else {
            fs.writeFile(file, data, (err) => {
                if (err != null) {
                    callback(err, null)
                } else {
                    callback(null, id)
                }
            })
        }
    })
}