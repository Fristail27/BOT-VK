const request = require('request')
const User = require("../../db/userModel")
const createQuery = require('./../../services/constants/URLs')

const respectMessage = async (req, res) => {

    const respectQuery = createQuery('users.get', {user_ids: req.body.object.message.reply_message.from_id})

    request(respectQuery, async (err, response, body) => {
            if (err) {
                console.log('error', err)
            }
            const getChatUrl = createQuery('messages.getConversationsById', {peer_ids: 2})
        request(getChatUrl, async (err, response, body) => {
            if (err) {
                console.log('error', err)
            }
        })
            const userName = `${JSON.parse(response.body).response[0].first_name} ${JSON.parse(response.body).response[0].last_name}`

            const reqBodyMes = {
                message: `👍 [id${JSON.parse(response.body).response[0].id}|${userName}] вам уважительно оказано уважение`,
                peer_id: req.body.object.message.peer_id,
                group_id: req.body.group_id,
                random_id: req.body.object.message.random_id
            }

            const respectQueryMes = createQuery('messages.send', reqBodyMes)

            request(respectQueryMes, async (err, resp, body) => {
                    if (err) {
                        console.log('error', err)
                    }
                    const user = await User.findOne({Id: req.body.object.message.reply_message.from_id})

                    if (user) {
                        user.reputation = +user.reputation + 1;
                        user.save()
                    } else {
                        const newUser = new User({
                            Id: req.body.object.message.reply_message.from_id,
                            first_name: JSON.parse(response.body).response[0].first_name,
                            last_name: JSON.parse(response.body).response[0].last_name,
                            reputation: 1
                        })
                        await newUser.save()
                    }
                }
            )
        }
    )
}

module.exports = respectMessage