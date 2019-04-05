const express = require('express'); 
const helmet = require('helmet');
const server = express(); 
const ProjectRouter = require('./project-router.js'); 

server.use(express.json()); 
server.use(helmet()); 

server.use('/api/projects', ProjectRouter);  

const port = process.env.PORT || 5012; 

server.listen(port, () => {
    console.log(`\n** API listening on http://localhost:${port} **\n`)
}); 

