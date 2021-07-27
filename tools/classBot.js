const keys = require('../keys/keys.prod.js')

class Bot {
    constructor(text) {
        this.text = text;
    }

    static confirm (res) {
        console.log(keys)
        res.send(keys.CONFIRM)
    }
    static send200 (res) {
        res.status(200).send("ok")
    }
}

module.exports = Bot