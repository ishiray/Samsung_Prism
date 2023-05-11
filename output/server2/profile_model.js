const Pool = require('pg').Pool

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Prism',
  password: 'ishi2702',
  port: 5432,
});

const getProfiles = () => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM sim_details ORDER BY sim_id ASC', (error, results) => {
      if (error) {
        reject(error)
      }
      console.log('the output is going to be ',results.rows)
      resolve(results.rows);
    })
  }) 
}

module.exports = {
    getProfiles,
  }