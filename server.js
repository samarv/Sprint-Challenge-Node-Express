const express = require('express');
const cors = require('cors');
const actionDB = require('./data/helpers/actionModel');
const projectDB = require('./data/helpers/projectModel');

const server = express();


const sendUserError = (status, message, res) => {
 res.status(status).json(message);
}

var port = 5555;

server.use(express.json());
server.use(cors())

server.get('/api/project', (req,res) =>{
  projectDB.get()
  .then(users => {
    res.status(200).json(users);
  })
  .catch( error => {
    sendUserError(500, { error: "The project information could not be retrieved." }, res)
  })

})

server.post('/api/project', (req,res) => {
  console.log(req.body)
  const { name, description, completed } = req.body;
  if(!name || !description || !completed ){
    sendUserError(400, { errorMessage: "Please provide name,description and completed for the project." }, res)
    return;
  }
  projectDB.insert({ name, description, completed })
  .then(users => {
    res.status(201).json(users);
  })
  .catch( error => {
    sendUserError(500, "internal server error!", res)
  })

})


server.put('/api/project/:id', (req,res) => {
  const { id } = req.params;
  const { name, description, completed } = req.body;
  if(!name || !description || !completed ){
    sendUserError(400, { errorMessage: "Please provide name,description and completed for the project." }, res)
    return;
  }
  projectDB.update(id, { name, description, completed })
  .then(users => {
    if(response === 0){
      sendUserError(404,{ message: "The project with the specified ID does not exist." }, res)
      return;
    }
    res.status(200).json(users);
  })
  .catch( error => {
    sendUserError(500, { error: "The post could not be modified" }, res)
  })
})


server.delete('/api/project/:id', (req,res) => {
  const { id } = req.params;

  projectDB.remove(id)
  .then(users => {
    if(response === 0){
      sendUserError(404,{ message: "The project with the specified ID does not exist." }, res)
      return;
    }
    res.status(200).json(users);
  })
  .catch( error => {
    sendUserError(500, { error: "The post could not be removed" }, res)
  })

})

server.get('/api/project/:id', (req,res) => {
  const { id } = req.params;

  projectDB.get(id)
  .then(users => {
    res.status(200).json(users);
  })
  .catch( error => {
    sendUserError(500, { error: "The post information could not be retrieved." }, res)
  })
})

server.get('/api/project/:id/action', (req,res) => {
  const { id } = req.params;

  projectDB.getProjectActions(id)
  .then(users => {
    res.status(200).json(users);
  })
  .catch( error => {
    sendUserError(500, "internal server error!", res)
  })
})



//Actions



server.get('/api/action', (req,res) =>{
  actionDB.get()
  .then(users => {
    res.status(200).json(users);
  })
  .catch( error => {
    sendUserError(500, { error: "The action information could not be retrieved." }, res)
  })

})

server.post('/api/action', (req,res) => {
  const { project_id,description, notes, completed } = req.body;
  if(!project_id || !description || !notes || completed ){
    sendUserError(400, { errorMessage: "Please providefull information for the actions." }, res)
    return;
  }
  actionDB.insert({ project_id, description, notes, completed })
  .then(users => {
    res.status(201).json(users);
  })
  .catch( error => {
    sendUserError(500, "internal server error!", res)
  })

})


server.put('/api/action/:id', (req,res) => {
  const { id } = req.params;
  const { project_id,description, notes, completed } = req.body;

  if(!project_id || !description || !notes || completed ){
    sendUserError(400, { errorMessage: "Please providefull information for the actions." }, res)
    return;
  }

  actionDB.update(id, { project_id,description, notes, completed })
  .then(users => {
    if(response.length === 0){
      sendUserError(404,{ message: "The action with the specified ID does not exist." }, res)
      return;
    }
    res.status(200).json(users);
  })
  .catch( error => {
    sendUserError(500, "internal server error!", res)
  })
})


server.delete('/api/action/:id', (req,res) => {
  const { id } = req.params;

  actionDB.remove(id)
  .then(users => {
    if(response.length === 0){
      sendUserError(404,{ message: "The action with the specified ID does not exist." }, res)
      return;
    }
    res.status(200).json(users);
  })
  .catch( error => {
    sendUserError(500, "internal server error!", res)
  })

})

server.get('/api/action/:id', (req,res) => {
  const { id } = req.params;

  actionDB.get(id)
  .then(users => {
    res.status(200).json(users);
  })
  .catch( error => {
    sendUserError(500, "internal server error!", res)
  })
})


server.listen(port, () => console.log(`server running on port ${port}`))
