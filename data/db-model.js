const db = require('./dbConfig');

module.exports = {
    get,
    getByID,
    add,
    addResToProj
}

function get(table) {
    console.log(table);
    if (table === 'resources') {
        return db.select('*').from(table).join('PR_Manager as PR','PR.resource_id','Resources.id');
        // return db.raw('SELECT * FROM Resources JOIN PR_Manager ON Resources.id = PR_Manager.resource_id;')
    }
   return db.select('*').from(table).then(results => boolConverter(results))
}

function getByID(id,table) {
    return db.select('*').from(table).where({id : id}).then(result => boolConverter(result))
}

function add(data, table) {
    const {project_id} = data;
    delete data.project_id;
    return db.insert(data).into(table)
    .then(([id]) => {
        return getByID(id,table);
    })
}

function addResToProj(resource, projID) {
    return db.insert(resource).into('resources').where({id : projID})
        .then(([resID]) => {
            console.log(resID);
           return db.insert({project_id: projID, resource_id : resID}).into('PR_Manager')
           .then((resp) => {console.log('added into PR_MGR', resp); return getByID(resID, 'resources'); })
           .catch(err => err.message)
        })
    // await db.insert(resource).into('PR_Manager')
}

function boolConverter(results) {
    console.log('resource in boolConverter', results);
    results.forEach(result => {
        if (result.completed) {
            result.completed = true;
        } else if (result.completed === 0) {
            result.completed = false;
        }
    })
    return results;
}