const queryString = require('query-string');

const createQuery = (method, query) => {
    const queryParams = queryString.stringify(query);
    return `${process.env.BASE_URL}${method}?${queryParams}&access_token=${process.env.TOKEN}&v=${process.env.VER}`
}

module.exports = createQuery