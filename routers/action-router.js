const router = require('express').Router(); 

const knex = require('knex'); 

const knexConfig = {
    client: 'sqlite3', 
    useNullAsDefault: true,
    connection: {
        filename: './data/projectDB.sqlite3'
    }
}

const db = knex(knexConfig); 
 
// POST ACTION 

// fields required in json post: 
// action_description - text
// action_notes - text 
// completed -- boolean (will return 1 for complete and 0 for incomplete) 
// project_id - integer 



router.post('/', (req, res) => {
    db('actions') 
    .insert(req.body)
    .then(ids => {
        const [id] = ids 
        db('actions')
        .where({id})
        .first()
        .then(action => {
            res.status(200)
            .json(action)
        })
        .catch(error => {
            res.status(500)
            .json(error)
        })
    })
})


module.exports = router;