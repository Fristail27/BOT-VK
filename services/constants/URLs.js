const queryString = require('query-string');
const keys = require('../../keys/keys.prod')

const createQuery = (method, query) => {
    const queryParams = queryString.stringify(query);
    return `${keys.BASE_URL}${method}?${queryParams}&access_token=${keys.TOKEN}&v=${keys.VER}`
}

module.exports = createQuery