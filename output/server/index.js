const express = require('express')
const app = express()
const port = 3001
const employee_model = require('./employee_model')
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