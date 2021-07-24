const request = require('request')

const getCommands = (req) => {

    const textBody = 'На данный момент я знаю следующие джуси команды: ' +
        '\n 😾 | - джуси ' +
        '\n ✌ | - джуси привет' +
        '\n 👍 | - +' +
        '\n 👏 | - джуси уважение' +
        '\n 🍻 | - джуси тост' +
        '\n 📱 | - джуси онлайн'

    const answer =
        `${process.env.BASE_URL}messages.send?message=${encodeURIComponent(textBody)}&peer_id=${req.body.object.message.peer_id}&group_id=${req.body.group_id}&random_id=${req.body.object.message.random_id}&access_token=${process.env.TOKEN}&v=${process.env.VER}`

    request(answer, async (err, response, body) => {
        if (err) {
            console.log('error', err)
        }
    })
}

module.exports = getCommands