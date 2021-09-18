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

function getRandomArrayElement(arr){
    return arr[Math.floor(Math.random()*arr.length)]
}

const randomPhraseCreator = (arrayNouns, arrayAdjectives, arrayOfParticiple) => {
    try {
        const noun = getRandomArrayElement(arrayNouns)

        const adjective = getRandomArrayElement(arrayAdjectives)[noun.type]

        const participle = participleCreator(noun.type, getRandomArrayElement(arrayOfParticiple))

        return `${participle} ${adjective} ${noun.word}`
    } catch (err) {
        return 'Что-то непонятное)'
    }

}

module.exports = randomPhraseCreator