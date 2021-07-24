const Bot = require('./../tools/classBot')
const helloMessage = require("../tools/Messages/helloMessage");
const respectMessage = require("../tools/Messages/respectMessage");
const getMyReputation = require("../tools/Messages/getMyReputation");
const getTost = require('../tools/Messages/getTost')
const getOnlineUsers = require('../tools/Messages/getOnlineUsers.js')
const getCommands = require('../tools/Messages/getCommands.js')


async function confirm(req, res, next) {
    switch (req.body.type) {
        case 'confirmation':
            Bot.confirm(res);
            break;
        case 'message_new':
            // console.log(req.body.object.message)
            if (req.body.object.message.text.toUpperCase().trim() === "ДЖУСИ ПРИВЕТ") {
                helloMessage(req, res);
                Bot.send200(res);
            } else if (req.body.object.message.text.toUpperCase().trim() === "+" && req.body.object.message.reply_message) {
                respectMessage(req, res);
                Bot.send200(res);
            } else if (req.body.object.message.text.toUpperCase().trim() === "ДЖУСИ УВАЖЕНИЕ") {
                getMyReputation(req, res)
                Bot.send200(res);
            } else if (req.body.object.message.text.toUpperCase().trim() === "ДЖУСИ ТОСТ") {
                getTost(req, res)
                Bot.send200(res);
            } else if (req.body.object.message.text.toUpperCase().trim() === "ДЖУСИ ОНЛАЙН") {
                getOnlineUsers(req)
                Bot.send200(res);
            } else if (req.body.object.message.text.toUpperCase().trim() === "ДЖУСИ") {
                getCommands(req)
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

