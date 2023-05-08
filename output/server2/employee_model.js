const Pool = require('pg').Pool

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Prism_trial_db',
  password: 'test123',
  port: 5432,
});

const getEmployees = () => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM user_details ORDER BY user_id ASC', (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  }) 
}

const createEmployee = (body) => {
  return new Promise(function(resolve, reject) {
    const Name=body.name
    const Email=body.email
    const Password=body.pw
    console.log('the data in empl_mod is', Name, Email, Password, body, body.name )
    pool.query('INSERT INTO user_details (user_name, user_id, user_pwd) VALUES ($1, $2, $3) RETURNING *', [ Name, Email, Password ], (error, results) => {
      if (error) {
        //console.log('error', error)
        reject(error)
      }
      resolve(`A new employee has been added`)
      console.log('resolve done')
    })
  })
}

const loginEmployee = (body) => {
  return new Promise(function(resolve, reject) {
    const Email=body.email
    const Password=body.pw
    console.log('the data in empl_mod is',Email, Password, body )
    pool.query('SELECT * FROM user_details WHERE user_id = $1', [Email], (error, results) => {
      console.log('the results are',results,error)
      console.log('checking if conditions',results.rows,results.rows[0],results.rows[0].user_pwd===Password)
      console.log('password data type:', typeof results.rows[0].user_pwd, typeof Password);
      if (results.rows && results.rows[0] && results.rows[0].user_pwd===Password) {
        console.log('inside if')
        resolve(results)
      }
      else{
        console.log('inside else')
        reject('no')
      }
      reject(error)
    })
  })
}


const deleteEmployee = (employeeId) => {
  return new Promise(function(resolve, reject) {
    const id = employeeId

    pool.query('DELETE FROM user_details WHERE user_id = $1', [id], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`Employee deleted with ID: ${id}`)
    })
  })
}

module.exports = {
  getEmployees,
  createEmployee,
  deleteEmployee,
  loginEmployee
}