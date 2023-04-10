const Pool = require('pg').Pool

const pool = new Pool({
  user: 'my_user',
  host: 'localhost',
  database: 'my_database',
  password: 'root',
  port: 5432,
});

const getStudents = () => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM students ORDER BY id ASC', (error, results) => {
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
    pool.query('INSERT INTO employees (name, email, password) VALUES ($1, $2, $3) RETURNING *', [ Name, Email, Password ], (error, results) => {
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
    pool.query('SELECT * FROM employees WHERE email = $1', [Email], (error, results) => {
      //console.log('the results are',results,error)
      if (results.rows && results.rows[0] && results.rows[0].password===Password) {
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


const deleteStudent = (studentId) => {
  return new Promise(function(resolve, reject) {
    const id = parseInt(studentId)

    pool.query('DELETE FROM students WHERE id = $1', [id], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`Student deleted with ID: ${id}`)
    })
  })
}

module.exports = {
  getStudents,
  createEmployee,
  deleteStudent,
  loginEmployee
}