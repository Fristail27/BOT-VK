const Bot = require('./../tools/classBot')
const helloMessage = require("../tools/Messages/helloMessage");
const respectMessage = require("../tools/Messages/respectMessage");
const getMyReputation = require("../tools/Messages/getMyReputation");
const getTost = require('../tools/Messages/getTost')

async function confirm (req, res, next) {
    switch (req.body.type) {
        case 'confirmation':
            Bot.confirm(res);
            Bot.send200(res);
            break;
        case 'message_new':
            if (req.body.object.message.text.toUpperCase().trim() === "ПРИВЕТ БОТ") {
                helloMessage(req, res);
                Bot.send200(res);
            } else if (req.body.object.message.text.toUpperCase().trim() === "+" && req.body.object.message.reply_message) {
                respectMessage(req, res);
                Bot.send200(res);
            } else if (req.body.object.message.text.toUpperCase().trim() === "МОЯ РЕПУТАЦИЯ") {
                getMyReputation(req, res)
                Bot.send200(res);
            } else if (req.body.object.message.text.toUpperCase().trim() === "ТОСТ") {
                getTost(req, res)
                Bot.send200(res);
            } else {
                Bot.send200(res);
            }

            break;
        default:
            break;
    }
}

module.exports = confirm

