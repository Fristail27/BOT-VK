const request = require('request')
const createQuery = require('./../../services/constants/URLs')

const notFindCommand = async (req, res) => {

    const reqBodyMes = {
        message: `😭 | такой джуси команды пока нет`,
        peer_id: req.body.object.message.peer_id,
        group_id: req.body.group_id,
        random_id: req.body.object.message.random_id
    }

    const respectQueryMes = createQuery('messages.send', reqBodyMes)

    request(respectQueryMes, async (err, resp, body) => {
            if (err) {
                console.log('error', err)
            }
        }
    )
}

module.exports = notFindCommand