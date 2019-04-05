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

// HELPER FUNCTIONS 

function findById(id) {
    return db('projects')
      .where({ id })
      .first()
      .then(project => {
        if (project) {
          return getProjectActions(id).then(actions => {
            project.actions = actions;
  
            return project;
          });
        } else {
          return null;
        }
      });
  }

function getProjectActions(projectId) {
    return db('actions')
      .where({ project_id: projectId })
      .then(actions => {
        return actions;
      });
  }

// GET PROJECTS 

router.get('/', (req, res) => {
    db('projects')
    .then(projects => {
        res.status(200)
        .json(projects)
    })
    .catch(error => {
        res.status(500)
        .json({
            message: `ERROR! ${error}`
        })
    })
})


// GET PROJECT BY ID

router.get('/:id', (req, res) => {
    findById(req.params.id)
    .then( project => {
        res.status(200)
        .json(project)
    })
    .catch(error => {
        res.status(500)
        .json({
            message: `Error! ${error}`
        })
    })
}); 

// POST PROJECT 
// fields required in json post: 
// project_name - text
// project_description - text 
// completed -- boolean (will return 1 for complete and 0 for incomplete) 

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
            .json({
                message: `Error! ${error}`
            })
        })
    })
})




module.exports = router;