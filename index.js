const express = require('express'); 
const helmet = require('helmet');
const server = express(); 

const ProjectRouter = require('./routers/project-router.js'); 
const ActionRouter = require('./routers/action-router.js'); 

server.use(express.json()); 
server.use(helmet()); 

server.use('/api/projects', ProjectRouter); 
server.use('/api/actions', ActionRouter); 

const port = process.env.PORT || 5012; 

server.listen(port, () => {
    console.log(`\n** API listening on http://localhost:${port} **\n`)
}); 

