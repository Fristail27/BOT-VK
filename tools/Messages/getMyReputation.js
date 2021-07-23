const request = require('request')
const Bot = require('./../classBot')
const User = require("../../db/userModel")


const getMyReputation = async (req, res) => {

    const user = await User.findOne({Id: req.body.object.message.from_id})

    if (user) {
        const userName = `${user.first_name} ${user.last_name}`

        const answer =
            `${process.env.BASE_URL}messages.send?message=${encodeURIComponent(`🤘 ${userName} твое уважение - ${user.reputation}`)}&peer_id=${req.body.object.message.peer_id}&group_id=${req.body.group_id}&random_id=${req.body.object.message.random_id}&access_token=${process.env.TOKEN}&v=${process.env.VER}`

        request(answer, (err, response, body) => {
                if (err) {
                    console.log('error', err)
                }
                // Bot.send200(response);
            }
        )

    } else {

        const negativeAnswer =
            `${process.env.BASE_URL}messages.send?message=${encodeURIComponent(`😧 у вас еще нет уважения`)}&peer_id=${req.body.object.message.peer_id}&group_id=${req.body.group_id}&random_id=${req.body.object.message.random_id}&access_token=${process.env.TOKEN}&v=${process.env.VER}`


        request(negativeAnswer, (err, response, body) => {
                if (err) {
                    console.log('error', err)
                }
                // Bot.send200(response);
            }
        )
    }
    // Bot.send200(res);
}

module.exports = getMyReputation