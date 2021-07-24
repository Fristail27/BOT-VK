const request = require('request');
const createQuery = require('./../../services/constants/URLs')

const getTost = async (req, res) => {
    const getTostUrl = `https://xwap.me/humor/toasts/rand`

    await request(getTostUrl, async (err, response, body) => {
            if (err) {
                console.log('error', err)
            }
            const xmlBody = response.body
            const str = xmlBody.indexOf('class="block text">')
            const str2 = xmlBody.indexOf("</div><ul class=\"nav border-top\"")
            const tost = xmlBody.slice((str + 19), str2).replace(/<\/?[^>]+>/g, '').replace(/&(l|g|quo)t;/g, "")

            const reqBody = {
                message: `🍷 ${tost}`,
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
    )
}

module.exports = getTost