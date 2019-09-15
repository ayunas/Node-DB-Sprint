const db = require('./dbConfig');

module.exports = {
    get,
    getByID
}

function get(table) {
    if (table === 'resources') {
        return db.select('*').from(table).join('PR_Manager as PR','PR.resource_id','Resources.id');
        // return db.raw('SELECT * FROM Resources JOIN PR_Manager ON Resources.id = PR_Manager.resource_id;')
    }
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