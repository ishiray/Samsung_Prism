const express = require('express')
const app = express()
const port = 3001
const employee_model = require('./employee_model')
const profile_model = require('./profile_model')
app.use(express.json())
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000', 'http://localhost:3002');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});

app.get('/', (req, res) => {
  employee_model.getEmployees()
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.post('/register', (req, res) => {
  //console.log('in server index',req)
  employee_model.createEmployee(req.body)
  .then(response => {
    //console.log(response)
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.post('/login', (req, res) => {
  employee_model.loginEmployee(req.body)
  .then(response => {
    //console.log(response)
    res.status(200).send(response);
  })
  .catch(error => {
    //console.log(error)
    res.status(500).send(error);
  })
})

app.delete('/employees/:id', (req, res) => {
  employee_model.deleteEmployee(req.params.id)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})


app.get('/simList', (req, res) => {
  profile_model.getSims()
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.get('/selectiveSimList', (req, res) => {
  console.log("received request is "+req.query.sut)
  profile_model.getSelectiveSims(req.query)
  .then(response => {
    //console.log(response)
    res.status(200).send(response);
  })
  .catch(error => {
    //console.log(error)
    res.status(500).send(error);
  })
})

app.get('/sutList', (req, res) => {
  profile_model.getSuts()
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.get('/getPtclIntfID', (req, res) => {
  console.log("received request is "+req.query.sut+" and "+req.query.sim)
  profile_model.getPtclIntfID(req.query)
  .then(response => {
    //console.log(response)
    res.status(200).send(response);
  })
  .catch(error => {
    //console.log(error)
    res.status(500).send(error);
  })
})

app.get('/getMsgNameList', (req, res) => {
  console.log("received request is "+req.query.ptcl_id)
  profile_model.getMsgNameList(req.query)
  .then(response => {
    //console.log(response)
    res.status(200).send(response);
  })
  .catch(error => {
    //console.log(error)
    res.status(500).send(error);
  })
})

app.get('/getMsgXsd', (req, res) => {
  console.log("received request is "+req.query.msg_xsd_id)
  profile_model.getMsgXsd(req.query)
  .then(response => {
    //console.log(response)
    res.status(200).send(response);
  })
  .catch(error => {
    //console.log(error)
    res.status(500).send(error);
  })
})

app.get('/getProfileInputs', (req, res) => {
  console.log("received request is "+req.query.intf_id+req.query.ptcl_id+req.query.control_label)
  profile_model.getProfileInputs(req.query)
  .then(response => {
    //console.log(response)
    res.status(200).send(response);
  })
  .catch(error => {
    //console.log(error)
    res.status(500).send(error);
  })
})
