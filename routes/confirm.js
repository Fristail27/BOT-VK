const Bot = require('./../tools/classBot')
const helloMessage = require("../tools/Messages/helloMessage");
const respectMessage = require("../tools/Messages/respectMessage");
const getMyReputation = require("../tools/Messages/getMyReputation");
const getTost = require('../tools/Messages/getTost')
const getOnlineUsers = require('../tools/Messages/getOnlineUsers.js')
const getCommands = require('../tools/Messages/getCommands.js')
const sampleAnswerMessage = require('../tools/Messages/sampleAnswerMessage.js')
const killMessage = require('../tools/Messages/killMessage.js')
const twoNameActionCreator = require('./../services/messageCreators/twoNameActionCreator')
const getQuote = require("../tools/Messages/getQuote");


async function confirm(req, res, next) {
    switch (req.body.type) {
        case 'confirmation':
            Bot.confirm(res);
            break;
        case 'message_new':
            // console.log(req.body.object)
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
            } else if (req.body.object.message.text.toUpperCase().trim() === "ДЖУСИ ЦИТАТА") {
                getQuote(req, res)
                Bot.send200(res);
            } else if (req.body.object.message.text.toUpperCase().trim() === "ДЖУСИ ОНЛАЙН") {
                getOnlineUsers(req)
                Bot.send200(res);
            } else if (req.body.object.message.text.toUpperCase().trim() === "ДЖУСИ") {
                getCommands(req)
                Bot.send200(res);
            } else if (req.body.object.message.text.toUpperCase().trim() === "УБИТЬ") {
                twoNameActionCreator(req, "вы убили" ,"вы выпилились, вы молодец!", "🔪", "👍")
                Bot.send200(res);
            } else if (req.body.object.message.text.toUpperCase().trim() === "ОБНЯТЬ") {
                twoNameActionCreator(req, "вы обняли" ,"зачем обнимать себя?!", "🤗", "😦")
                Bot.send200(res);
            } else if (req.body.object.message.text.toUpperCase().trim() === "ПОЦЕЛОВАТЬ") {
                twoNameActionCreator(req, "вы поцеловали" ,"кхммм?!", "😘", "🤬")
                Bot.send200(res);
            } else if (req.body.object.message.text.toUpperCase().trim() === "ПОКОРМИТЬ") {
                twoNameActionCreator(req, "вы покормили" ,"вкусно?", "🍔", "🍉")
                Bot.send200(res);
            } else {
                if (req.body.object.message.text.toUpperCase().includes("ДЖУСИ")) {
                    sampleAnswerMessage(req, `😭 | такой джуси команды пока нет`)
                }
                Bot.send200(res);
            }
            break;
        default:
            break;
    }
}

module.exports = confirm

