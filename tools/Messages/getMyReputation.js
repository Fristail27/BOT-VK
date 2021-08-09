const request = require('request')
const User = require("../../db/userModel")
const createQuery = require('./../../services/constants/URLs')


const getMyReputation = async (req, res) => {

    const user = await User.findOne({Id: req.body.object.message.from_id})

    if (user) {
        const userName = `${user.first_name} ${user.last_name}`

        const reqBody = {
            message: `🤘 ${userName} твое уважение - ${user.reputation} \n 
                        🍕 ${user.feedCount ? `тебя покормили - ${user.feedCount} раз` : "тебя еще ни разу не покормили"}`,
            peer_id: req.body.object.message.peer_id,
            group_id: req.body.group_id,
            random_id: req.body.object.message.random_id
        }

        const respectQuery = createQuery('messages.send', reqBody)

        request(respectQuery, (err, response, body) => {
                if (err) {
                    console.log('error', err)
                }
            }
        )
    } else {

        const reqBody = {
            message: `😧 у вас еще нет уважения`,
            peer_id: req.body.object.message.peer_id,
            group_id: req.body.group_id,
            random_id: req.body.object.message.random_id
        }

        const respectQuery = createQuery('messages.send', reqBody)

        request(respectQuery, (err, response, body) => {
                if (err) {
                    console.log('error', err)
                }
            }
        )
    }
}

module.exports = getMyReputation