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


// GET PROJECTS BY ID 
router.get('/:id', (req, res) => {
    db('projects')
    .where({id: req.params.id}) 
    .then(project => {
        res.status(200)
        .json(project) 
    })
    .catch(error => {
        res.status(500)
        .json({ message: `ERROR! ${error}`}) 
    })
});

// POST PROJECT 

router.post('/', (req, res) => {
    db('projects') 
    .insert(req.body)
    .then(ids => {
        const [id] = ids 
        db('projects')
        .where({id})
        .first()
        .then(project => {
            res.status(200)
            .json(project)
        })
        .catch(error => {
            res.status(500)
            .json(error)
        })
    })
})

// POST ACTION 



module.exports = router; 