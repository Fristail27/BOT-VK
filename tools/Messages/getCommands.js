const request = require('request')
const createQuery = require('./../../services/constants/URLs')
const axios = require('axios')

const getCommands = async (req) => {

    const textBody = 'На данный момент я знаю следующие джуси команды: ' +
        '\n 😾 | - джуси ' +
        '\n ✌ | - джуси привет' +
        '\n 👍 | - +' +
        '\n 👏 | - джуси уважение' +
        '\n 🍻 | - джуси тост' +
        '\n 📱 | - джуси онлайн' +
        '\n 🔪 | - убить'

    const reqBody = {
        message: textBody,
        peer_id: req.body.object.message.peer_id,
        group_id: req.body.group_id,
        random_id: req.body.object.message.random_id
    }

    const respectQuery = createQuery('messages.send', reqBody)

    request(respectQuery, async (err, response, body) => {
        if (err) {
            console.log('error', err)
        }
    })
}

module.exports = getCommands