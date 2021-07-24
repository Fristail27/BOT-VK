const request = require('request')
const createQuery = require('./../../services/constants/URLs')

const helloMessage = async (req, res) => {


    const respectQuery = createQuery('users.get', {user_ids: req.body.object.message.from_id})

    await request(respectQuery, async (err, response, body) => {
            if (err) {
                console.log('error', err)
            }
            const userName = `${JSON.parse(response.body).response[0].first_name} ${JSON.parse(response.body).response[0].last_name}`

            const reqBodyMes = {
                message: `✌️| Здраздэ ${userName}`,
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
        }
    )
}

module.exports = helloMessage