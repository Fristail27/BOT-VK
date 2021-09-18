const TypeWordsEnum = require('./../constants/enums/TypeWordsEnum')

const participleCreator = (type, participle) => {
    if (type === TypeWordsEnum.women) {
        return participle.replace('ий', 'ая')
    }
    if (type === TypeWordsEnum.middle) {
        return participle.replace('ий', 'ее')
    }
    return participle
}

const randomPhraseCreator = (arrayNouns, arrayAdjectives, arrayOfParticiple) => {
    try {
        const randomNum1 = (Math.floor(Math.random() * 100))
        const randomNum2 = (Math.floor(Math.random() * 100))
        const randomNum3 = (Math.floor(Math.random() * 100))
        if (arrayNouns.length < randomNum1) {
            return  randomPhraseCreator(arrayNouns, arrayAdjectives, arrayOfParticiple)
        } else if (arrayAdjectives.length < randomNum2) {
            return  randomPhraseCreator(arrayNouns, arrayAdjectives, arrayOfParticiple)
        } else if (arrayOfParticiple.length < randomNum3) {
            return  randomPhraseCreator(arrayNouns, arrayAdjectives, arrayOfParticiple)
        } else {
            const noun = arrayNouns[randomNum1]

            const adjective = arrayAdjectives[randomNum2][noun.type]

            const participle = participleCreator(noun.type, arrayOfParticiple[randomNum3])

            if (!participle || !adjective || !noun.word) {
                return  randomPhraseCreator(arrayNouns, arrayAdjectives, arrayOfParticiple)
            }

            return `${participle} ${adjective} ${noun.word}`
        }
    } catch (err) {
        return 'Что-то непонятное)'
    }

}

module.exports = randomPhraseCreator