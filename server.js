const express = require('express');
const server = express();
const projectRouter = require('./routers/projectRouter')
const resourceRouter = require('./routers/resourceRouter')
const taskRouter = require('./routers/taskRouter')

server.use(express.json()); 

server.use('/projects', projectRouter);
server.use('/resources', resourceRouter);
server.use('/tasks', taskRouter);

const port = process.env.PORT || 6666;

server.listen(port, () => console.log(`\nserver listening on port ${port}....\n`));


