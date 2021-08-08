const request = require('request');
const createQuery = require('./../../services/constants/URLs')


const getQuote = async (req, res) => {
    const getTostUrl = `https://citaty.info/random`

    await request(getTostUrl, async (err, response, body) => {
            if (err) {
                console.log('error', err)
            }
            const xmlBody = response.body
            const str = xmlBody.indexOf('div class="field-item even last">')
            const str2 = xmlBody.indexOf("<div class=\"field field-name-taxonomy")
            const quote = xmlBody.slice((str + 33), str2).replace(/<\/?[^>]+>/g, '').replace(/&(l|g|quo)t;/g, " ").replace(/&nbsp;/g, " ").replace(/&mdash;/g, " ")

            const quoteSourcePartStart = xmlBody.indexOf('<div class="field field-name-taxonomy')
            const quoteSourcePartEnd = quoteSourcePartStart + 600 // хардкод что бы гарантированно захватить небходимый участок кода с информацией
            const quoteSourcePart = xmlBody.slice(quoteSourcePartStart, quoteSourcePartEnd)

            const noQuoteSourse = quoteSourcePart.indexOf('title=\"') === -1

            const quoteSourceStart = quoteSourcePart.indexOf('title=\"')
            const quoteSourceEnd = quoteSourcePart.indexOf('</a>')
            const quoteSource = quoteSourcePart.slice(quoteSourceStart + 7, quoteSourceEnd).replace('">', " ")

            const reqBody = {
                message: `☝ ${quote} \n ${!noQuoteSourse ? quoteSource : ''}`,
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

module.exports = getQuote