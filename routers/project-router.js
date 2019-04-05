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


// GET PROJECTS BY ID 

// i think my closest attempt vv
// router.get('/:id', (req, res) => {
    // db('projects').join('actions', {'projects.id': 'actions.project_id'})
    // .where({project_id: req.params.id})
    // .then(project => res.status(200)
    //     .json({
    //         'id': project[0].project_id,
    //         'name': project[0].project_name,
    //         'description': project[0].project_description,
    //         'actions': project.forEach(action => 
    //                 { return (
    //                     {'id': action.id,
    //                     'description': action.action_description, 
    //                     'notes': action.action_notes,
    //                     'completed': action.completed}
    //                     )
    //                 }
    //                 )
    //     }) 
    //     ).catch(error => {
    //     res.status(500)
    //     .json({ message: `ERROR! ${error}`}) 
    // }); 


    // another attempt that isn't right vv
// router.get('/:id', (req, res) => {
//     db('projects').join('actions', function() {
//         this.on('projects.id', '=', 'actions.project_id')  
//     .where({project_id: req.params.id})
//     .then( project => {
//      res.status(200)
//      .json(project)   
//     }) 
//     .catch(error => {
//         res.status(500)
//         .json({
//             message: `error! ${error}`
//         })
//     })
    
// })

// RETURNS AN ARRAY OF OBJECTS WITH UNIQUE ACTIONS AND REPEATING PROJECT INFO
// router.get('/:id', (req, res) => {
//     db('projects').join('actions', {'projects.id': 'actions.project_id'})
//     .where({project_id: req.params.id}) 
//     .then(project => {
//         res.status(200)
//         .json(project)
//     })
//     .catch(error => {
//         res.status(500)
//         .json({
//             message: `ERROR!${error}` 
//     })
// })
// }); 

// got stuck in loading zone vv
// router.get('/:id', (req, res) => {
//     db('projects').join('actions', {'projects.id': 'actions.project_id'})
//     .where({project_id: req.params.id}) 
//     .then(project => {
//        const actions = project.forEach( () => 
//         (
//         {
//         'id': project.id, 
//         'description': project.action_description,
//         'notes': project.action_notes 
//         }))
//         return (
//             {
//                 'id': project[0].id,
//                 'name': project[0].name,
//                 'description': project[0].description,
//                 'actions': actions
//             }
//         )
//     })
//     .catch(error => {
//         res.status(500)
//         .json({
//             message: `ERROR!${error}` 
//     })
// })
// }); 

router.get('/:id', (req, res) => {
    db('projects').join('actions', {'projects.id': 'actions.project_id'})
    .where({project_id: req.params.id}) 
    .then(project => {
       res.status(200)
        .json(project)
    })

    .catch(error => {
        res.status(500)
        .json({
            message: `ERROR!${error}` 
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
            .json(error)
        })
    })
})




module.exports = router;