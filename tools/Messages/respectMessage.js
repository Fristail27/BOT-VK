const request = require('request')
const Bot = require('./../classBot')
const User = require("../../db/userModel")


const respectMessage = async (req, res) => {
    const getUserUrl =
        `${process.env.BASE_URL}users.get?&user_ids=${req.body.object.message.reply_message.from_id}&access_token=${process.env.TOKEN}&v=${process.env.VER}`

    await request(getUserUrl, async (err, response, body) => {
            if (err) {
                console.log('error', err)
            }
            const userName = `${JSON.parse(response.body).response[0].first_name} ${JSON.parse(response.body).response[0].last_name}`
            const answer =
                `${process.env.BASE_URL}messages.send?message=${encodeURIComponent(`👍 ${userName} вам уважительно оказано уважение`)}&peer_id=${req.body.object.message.peer_id}&group_id=${req.body.group_id}&random_id=${req.body.object.message.random_id}&access_token=${process.env.TOKEN}&v=${process.env.VER}`

            // await Bot.send200(response);
            request(answer, async (err, resp, body) => {
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

                    // await Bot.send200(resp);
                }
            )
        }
    )
    // await Bot.send200(res);
}

module.exports = respectMessage