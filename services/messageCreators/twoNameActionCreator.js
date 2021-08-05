const request = require('request')
const createQuery = require('./../../services/constants/URLs')

const twoNameActionCreator = (req, actionTextForOther, actionTextForHimself, actionTextForOtherSmile, actionTextForHimselfSmile) => {

    const respectQuery = createQuery('users.get', {
        user_ids: req.body.object.message.reply_message.from_id,
        name_case: 'acc',
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
                const doerName = `${JSON.parse(resp.body).response[0].first_name} ${JSON.parse(resp.body).response[0].last_name}`
                const doerId = JSON.parse(resp.body).response[0].id

                const userName = `${JSON.parse(response.body).response[0].first_name} ${JSON.parse(response.body).response[0].last_name}`

                const message = doerId === JSON.parse(response.body).response[0].id
                    ? `${actionTextForHimselfSmile} [id${doerId}|${doerName}]  ${actionTextForHimself}`
                    : `${actionTextForOtherSmile} [id${doerId}|${doerName}] ${actionTextForOther} [id${JSON.parse(response.body).response[0].id}|${userName}]`
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

module.exports = twoNameActionCreator