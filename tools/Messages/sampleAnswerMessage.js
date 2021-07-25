const request = require('request')
const createQuery = require('./../../services/constants/URLs')

const sampleAnswerMessage = async (req, message) => {

    const reqBodyMes = {
        message: message,
        peer_id: req.body.object.message.peer_id,
        group_id: req.body.group_id,
        random_id: req.body.object.message.random_id
    }

    const respectQueryMes = createQuery('messages.send', reqBodyMes)

    request(respectQueryMes, async (err) => {
            if (err) {
                console.log('error', err)
            }
        }
    )
}

module.exports = sampleAnswerMessage