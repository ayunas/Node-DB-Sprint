const db = require('./dbConfig');

module.exports = {
    get,
    getByID
}

function get(table) {
   return db.select('*').from(`${table}`).then(results => boolConverter(results))
}

function getByID(id,table) {
    return db.select('*').from(table).where({id : id}).then(result => boolConverter(result))
}

function boolConverter(results) {
    results.forEach(result => {
        if (result.completed) {
            result.completed = true;
        } else if (result.completed === 0) {
            result.completed = false;
        }
    })
    return results;
}