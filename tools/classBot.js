const keys = require('../keys/keys.prod')

class Bot {
    constructor(text) {
        this.text = text;
    }

    static confirm (res) {
        res.send(keys.CONFIRM)
    }
    static send200 (res) {
        res.status(200).send("ok")
    }
}

module.exports = Bot