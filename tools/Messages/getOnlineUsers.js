const request = require('request')

const getOnlineUsers = (req) => {
    const getUsersInChat =
        `${process.env.BASE_URL}messages.getConversationMembers?&peer_id=${req.body.object.message.peer_id}&access_token=${process.env.TOKEN}&v=${process.env.VER}`

    request(getUsersInChat, async (err, response, body) => {
        if (err) {
            console.log('error', err)
        }
        const answerText = JSON.parse(response.body).response.profiles.filter(el => el.online === 1).map(el => (`${el.first_name} ${el.last_name}`)).reduce((acc, el, i) => {
            return acc + `\n ${i + 1}: ${el}`
        }, '📜 | Сейчас онлайн: ')

        const answer =
            `${process.env.BASE_URL}messages.send?message=${encodeURIComponent(answerText)}&peer_id=${req.body.object.message.peer_id}&group_id=${req.body.group_id}&random_id=${req.body.object.message.random_id}&access_token=${process.env.TOKEN}&v=${process.env.VER}`

        request(answer, (err, response, body) => {
                if (err) {
                    console.log('error', err)
                }
            }
        )
    })
}

module.exports = getOnlineUsers
