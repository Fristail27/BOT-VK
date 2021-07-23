const request = require('request');

class Bot {
    constructor(text) {
        this.text = text;
    }

    static confirm (res) {
        res.send(process.env.CONFIRM)
    }
    static send200 (res) {
        res.status(200).send("ok")
    }
}

module.exports = Bot