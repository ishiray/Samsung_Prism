const Pool = require('pg').Pool

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'prism_trial_db',
  password: 'test123',
  port: 5432,
});

const getSims = () => {
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

const getSelectiveSims = (body) => {
  return new Promise(function(resolve, reject) {
    const Sut=body.sut
    pool.query('SELECT sim_name FROM interface_details WHERE sut_name = $1', [Sut], (error, results) => {
      if (error) {
        reject(error)
      }
      console.log('the output is going to be ',results.rows)
      resolve(results.rows);
    })
  }) 
}

const getSuts = () => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT DISTINCT sut_name FROM interface_details;', (error, results) => {
      if (error) {
        reject(error)
      }
      console.log('the output is going to be ',results.rows)
      resolve(results.rows);
    })
  }) 
}

const getPtclIntfID = (body) => {
  return new Promise(function(resolve, reject) {
    const Sut=body.sut
    const Sim=body.sim
    pool.query('SELECT intf_id,ptcl_id FROM interface_details WHERE (sut_name,sim_name) = ($1,$2)', [Sut,Sim], (error, results) => {
      if (error) {
        reject(error)
      }
      console.log('the output is going to be ',results.rows)
      resolve(results.rows);
    })
  }) 
}

const getMsgNameList = (body) => {
  return new Promise(function(resolve, reject) {
    const ptclId=body.ptcl_id
    pool.query('SELECT msg_xsd_id,msg_name FROM default_msg_details WHERE ptcl_id = $1', [ptclId], (error, results) => {
      if (error) {
        reject(error)
      }
      //console.log('the output is going to be ',results.rows)
      resolve(results.rows);
    })
  }) 
}

const getMsgXsd = (body) => {
  return new Promise(function(resolve, reject) {
    const msgxsdid=body.msg_xsd_id
    pool.query('SELECT msg_xsd FROM default_msg_details WHERE msg_xsd_id = $1', [msgxsdid], (error, results) => {
      if (error) {
        reject(error)
      }
      //console.log('the output is going to be ',results.rows)
      resolve(results.rows);
    })
  }) 
}

const getProfileInputs = (body) => {
  return new Promise(function(resolve, reject) {
    const intfID = body.intf_id;
    const ptclID = body.ptcl_id;
    const configParamType = body.config_param_type;

    console.log('the input is ', intfID, ptclID, configParamType);

    pool.query(
      'SELECT config_param_name, default_value FROM profile_config_param_master WHERE (config_param_type, intf_id, ptcl_id) = ($1, $2, $3)',
      [configParamType, intfID, ptclID],
      (error, results) => {
        if (error) {
          reject(error);
        }
        
        console.log('the output is going to be ', results.rows);


        resolve(results.rows);
    });
  });
};

module.exports = {
    getSims,
    getSuts,
    getSelectiveSims,
    getPtclIntfID,
    getMsgNameList,
    getMsgXsd,
    getProfileInputs,
  }