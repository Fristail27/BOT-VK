const request = require('request')
const createQuery = require('./../../services/constants/URLs')

const killMessage = (req, res) => {

    const respectQuery = createQuery('users.get', {
        user_ids: req.body.object.message.reply_message.from_id,
        name_case: 'gen',
        fields: 'sex'
    })

    request(respectQuery, async (err, response) => {
            if (err) {
                console.log('error', err)
            }

            const respectQueryFrom = createQuery('users.get', {user_ids: req.body.object.message.from_id, fields: 'sex'})

            request(respectQueryFrom, async (err, resp, body) => {
                if (err) {
                    console.log('error', err)
                }
                const killerName = `${JSON.parse(resp.body).response[0].first_name} ${JSON.parse(resp.body).response[0].last_name}`
                const killerId = JSON.parse(resp.body).response[0].id

                const userName = `${JSON.parse(response.body).response[0].first_name} ${JSON.parse(response.body).response[0].last_name}`

                const message = killerId === JSON.parse(response.body).response[0].id
                    ? `👍 [id${killerId}|${killerName}]  вы выпилились, вы молодец!`
                    : `🔪 [id${killerId}|${killerName}] вы убили [id${JSON.parse(response.body).response[0].id}|${userName}]`
                const reqBodyMes = {
                    message: message,
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
            });
        }
    )
}

module.exports = killMessage