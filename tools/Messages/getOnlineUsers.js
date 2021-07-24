const request = require('request')
const createQuery = require('./../../services/constants/URLs')

const getOnlineUsers = (req) => {

    const respectQuery = createQuery('messages.getConversationMembers', {peer_id: req.body.object.message.peer_id})

    request(respectQuery, async (err, response, body) => {
        if (err) {
            console.log('error', err)
        }
        const answerText = JSON.parse(response.body).response.profiles.filter(el => el.online === 1).map(el => (`${el.first_name} ${el.last_name}`)).reduce((acc, el, i) => {
            return acc + `\n ${i + 1}: ${el}`
        }, '📜 | Сейчас онлайн: ')

        const reqBodyMes = {
            message: answerText,
            peer_id: req.body.object.message.peer_id,
            group_id: req.body.group_id,
            random_id: req.body.object.message.random_id
        }

        const respectQueryMes = createQuery('messages.send', reqBodyMes)

        request(respectQueryMes, (err, response, body) => {
                if (err) {
                    console.log('error', err)
                }
            }
        )
    })
}

module.exports = getOnlineUsers
