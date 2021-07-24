const request = require('request')

const helloMessage = async (req, res) => {
    const getUserUrl =
        `${process.env.BASE_URL}users.get?&user_ids=${req.body.object.message.from_id}&access_token=${process.env.TOKEN}&v=${process.env.VER}`

    await request(getUserUrl, async (err, response, body) => {
            if (err) {
                console.log('error', err)
            }
            const userName = `${JSON.parse(response.body).response[0].first_name} ${JSON.parse(response.body).response[0].last_name}`
            const answer =
                `${process.env.BASE_URL}messages.send?message=${encodeURIComponent(`✌️| Здраздэ ${userName}`)}&peer_id=${req.body.object.message.peer_id}&group_id=${req.body.group_id}&random_id=${req.body.object.message.random_id}&access_token=${process.env.TOKEN}&v=${process.env.VER}`

            request(answer, (err, response, body) => {
                    if (err) {
                        console.log('error', err)
                    }
                }
            )
        }
    )
}

module.exports = helloMessage