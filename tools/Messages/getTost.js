const request = require('request');
const Bot = require('./../classBot');



const getTost = async (req, res) => {
    const getTostUrl = `https://xwap.me/humor/toasts/rand`

    await request(getTostUrl, async(err, response, body) => {
            if (err) {
                console.log('error', err)
            }
            const xmlBody = response.body
             const str = xmlBody.indexOf('class="block text">')
                const str2 = xmlBody.indexOf("</div><ul class=\"nav border-top\"")
            const tost = xmlBody.slice((str + 19) , str2).replace(/<\/?[^>]+>/g,'').replace("&quot;.",'')

            const answer =
                `${process.env.BASE_URL}messages.send?message=${encodeURIComponent(`${tost}`)}&peer_id=${req.body.object.message.peer_id}&group_id=${req.body.group_id}&random_id=${req.body.object.message.random_id}&access_token=${process.env.TOKEN}&v=${process.env.VER}`
       // await Bot.send200(response);

        request(answer, (err, response, body) => {
                    if (err) {
                        console.log('error', err)
                    }
                    // Bot.send200(response);
                }
            )
        }
    )
    // await Bot.send200(res);

}

module.exports = getTost