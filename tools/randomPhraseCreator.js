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
        const randomNum1 = (Math.floor(Math.random() * 100))
        const randomNum2 = (Math.floor(Math.random() * 100))
        const randomNum3 = (Math.floor(Math.random() * 100))

        const noun = getRandomArrayElement(arrayNouns)

        const adjective = getRandomArrayElement(arrayAdjectives)[noun.type]

        const participle = participleCreator(noun.type, getRandomArrayElement(arrayOfParticiple))

        // if (!participle || !adjective || !noun.word) {
        //     return  randomPhraseCreator(arrayNouns, arrayAdjectives, arrayOfParticiple)
        // }

        return `${participle} ${adjective} ${noun.word}`
    } catch (err) {
        return 'Что-то непонятное)'
    }

}

module.exports = randomPhraseCreator