const request = require('request')
const User = require("../../db/userModel")
const createQuery = require('./../../services/constants/URLs')

const feedMessage = async (req, res) => {

    const respectQuery = createQuery('users.get', {user_ids: req.body.object.message.reply_message.from_id})

    request(respectQuery, async (err, response, body) => {
            if (err) {
                console.log('error', err)
            }

            const userName = `${JSON.parse(response.body).response[0].first_name} ${JSON.parse(response.body).response[0].last_name}`

            const reqBodyMes = {
                message: `👍 [id${JSON.parse(response.body).response[0].id}|${userName}] вас уважительно покормили`,
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
                        user.feedCount = user.feedCount ? (+user.feedCount + 1) : 1;
                        user.save()
                    } else {
                        const newUser = new User({
                            Id: req.body.object.message.reply_message.from_id,
                            first_name: JSON.parse(response.body).response[0].first_name,
                            last_name: JSON.parse(response.body).response[0].last_name,
                            feedCount: 0,
                            reputation: 1
                        })
                        await newUser.save()
                    }
                }
            )
        }
    )
}

module.exports = feedMessage