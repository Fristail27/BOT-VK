const createQuery = require('./../../services/constants/URLs')
const axios = require('axios')
const randomPhraseCreator = require('./../../tools/randomPhraseCreator')
const arrayNouns = require('./../../constants/arrayNouns')
const arrayAdjectives = require('./../../constants/arrayOfAdjectives')
const arrayOfParticiple = require('../../constants/arrayOfParticiple')


const whoAreIMessage = async (req, message) => {

    const userInfo = await axios.post(createQuery('users.get', {user_ids: req.body.object.message.from_id}))

    const userName = `${userInfo.data.response[0].first_name} ${userInfo.data.response[0].last_name}`

    const youAre = randomPhraseCreator(arrayNouns, arrayAdjectives, arrayOfParticiple)

    const reqBodyMes = {
        message: `💭 [id${userInfo.data.response[0].id}|${userName}] вы - ${youAre}`,
        peer_id: req.body.object.message.peer_id,
        group_id: req.body.group_id,
        random_id: req.body.object.message.random_id
    }
    await axios.post(createQuery('messages.send', reqBodyMes))
}

module.exports = whoAreIMessage