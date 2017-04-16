const dict = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
export function generateID() {
    let str = ""
    for (let i = 0; i < 6; i++) {
        str += dict.charAt(Math.floor(Math.random() * dict.length))
    }
    return str
}