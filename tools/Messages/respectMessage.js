const request = require('request')
const User = require("../../db/userModel")
const createQuery = require('./../../services/constants/URLs')

const respectMessage = async (req, res) => {

    const respectQuery = createQuery('users.get', {user_ids: req.body.object.message.reply_message.from_id})

    request(respectQuery, async (err, response, body) => {
            if (err) {
                console.log('error', err)
            }

            const userName = `${JSON.parse(response.body).response[0].first_name} ${JSON.parse(response.body).response[0].last_name}`

            const reqBodyMes = {
                message: `👍 [id${JSON.parse(response.body).response[0].id}|${userName}] вам уважительно оказано уважение`,
                peer_id: req.body.object.message.peer_id,
                group_id: req.body.group_id,
                random_id: req.body.object.message.random_id
            }
            let respectQueryMes
        if (JSON.parse(response.body).response[0].id === 138167009 ) {
            const reqBodyMesForVladka = {
                message: `👍  Владе сразу +10 уважения`,
                peer_id: req.body.object.message.peer_id,
                group_id: req.body.group_id,
                random_id: req.body.object.message.random_id
            }
            respectQueryMes = createQuery('messages.send', reqBodyMesForVladka)
        } else {
            respectQueryMes = createQuery('messages.send', reqBodyMes)
        }

            request(respectQueryMes, async (err, resp, body) => {
                    if (err) {
                        console.log('error', err)
                    }
                    const user = await User.findOne({Id: req.body.object.message.reply_message.from_id})

                    if (user) {
                        if (user.Id === '138167009') {
                            user.reputation = +user.reputation + 10;
                            user.save()
                        } else {
                            user.reputation = +user.reputation + 1;
                            user.save()
                        }
                    } else {
                        const newUser = new User({
                            Id: req.body.object.message.reply_message.from_id,
                            first_name: JSON.parse(response.body).response[0].first_name,
                            last_name: JSON.parse(response.body).response[0].last_name,
                            reputation: 1,
                            feedCount: 0,

                        })
                        await newUser.save()
                    }
                }
            )
        }
    )
}

module.exports = respectMessage