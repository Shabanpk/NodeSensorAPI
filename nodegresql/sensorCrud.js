const Pool = require('pg').Pool
const express = require("express");
const router = express.Router();
var config = {
  user: 'postgres', 
  host: 'localhost',
  database: 'NodeAPI',
  password: 'admin',
  port: 5432
  //max: 10, // max number of clients in the pool
  //idleTimeoutMillis: 30000
};
const pool = new Pool(config);

router.get('/getAllSensors',(request, response)=>{
  pool.query('SELECT * FROM sensorinfo ORDER BY id asc', (error, results) => {
    
      if (error) {
        throw error
      }
      //Json.stringify(results.rows);
      //response.json(result.rows);
      
      return response.status(200).json(results.rows)
      
      
      //return response.send(results.rows);
    })

});

 router.get('/getSensorById/:id',(request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM sensorinfo WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
});

router.post ('/createSensor',(request, response) => {
  const {id,bus_code,datetime,longitude,latitude,AH_Full_zone,Average_H_upper_zone,Average_H_center_zone,Average_H_lower_zone,z1,z2,z3,z4,z5,z6,z7,z8,z9,z10,z12,AT_Full_zone,Average_T_upper_zone,Average_T_center_zone,Average_T_lower_zone,z112,z21,z31,z41,z51,z61,z71,z81,z91,z101,z111,z121,HtoT_Moisture,HtoT_Temp,magnitud_full_zone,magnitud_upper_zone,magnitud_center_zone,magnitud_lower_zone,HtoT_self_turn,patient_id
 } = request.body
  pool.query('INSERT INTO sensorinfo(Id,bus_code,datetime,longitude,latitude,AH_Full_zone,Average_H_upper_zone,Average_H_center_zone,Average_H_lower_zone,z1,z2,z3,z4,z5,z6,z7,z8,z9,z10,z11,z12,AT_Full_zone,Average_T_upper_zone,Average_T_center_zone,Average_T_lower_zone,z112,z21,z31,z41,z51,z61,z71,z81,z91,z101,z111,z121,HtoT_Moisture,HtoT_Temp,magnitud_full_zone,magnitud_upper_zone,magnitud_center_zone,magnitud_lower_zone,HtoT_self_turn,patient_id) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29,$30,$31,$32,$33,$34,$35,$36,$37,$38,$39,$40,$41,$42,$43,$44,$45) RETURNING *', [id, bus_code,datetime,longitude,latitude,AH_Full_zone,Average_H_upper_zone,Average_H_center_zone,Average_H_lower_zone,z1,z2,z3,z4,z5,z6,z7,z8,z9,z10,z12,z12,AT_Full_zone,Average_T_upper_zone,Average_T_center_zone,Average_T_lower_zone,z112,z21,z31,z41,z51,z61,z71,z81,z91,z101,z111,z121,HtoT_Moisture,HtoT_Temp,magnitud_full_zone,magnitud_upper_zone,magnitud_center_zone,magnitud_lower_zone,HtoT_self_turn,patient_id], (error, results) => {
    if (error) {
      throw error
    } else if (!Array.isArray(results.rows) || results.rows.length < 1) {
    	throw error
    }
    response.status(201).send(`sensor added with ID: ${results.rows[0].id}`)
  })
});

router.put( '/updateSensor/:id',(request, response) => {
  const id = parseInt(request.params.id)
  const { bus_code,datetime,longitude,latitude,AH_Full_zone,Average_H_upper_zone,Average_H_center_zone,Average_H_lower_zone,z1,z2,z3,z4,z5,z6,z7,z8,z9,z10,z11,z12,AT_Full_zone,Average_T_upper_zone,Average_T_center_zone,Average_T_lower_zone,z112,z21,z31,z41,z51,z61,z71,z81,z91,z101,z111,z121,HtoT_Moisture,HtoT_Temp,magnitud_full_zone,magnitud_upper_zone,magnitud_center_zone,magnitud_lower_zone,HtoT_self_turn,patient_id } = request.body

  pool.query(
    'UPDATE sensorinfo SET bus_code=$1,datetime=$2,longitude=$3,latitude=$4,AH_Full_zone=$5,Average_H_upper_zone=$6,Average_H_center_zone=$7,Average_H_lower_zone=$8,z1=$9,z2=$10,z3=$11,z4=$12,z5=$13,z6=$14,z7=$15,z8=$16,z9=$17,z10=$18,z11=$19,z12=$20,AT_Full_zone=$21,Average_T_upper_zone=$22,Average_T_center_zone=$23,Average_T_lower_zone=$24,z112=$25,z21=$26,z31=$27,z41=$28,z51=$29,z61=$30,z71=$31,z81=$32,z91=$33,z101=$34,z111=$35,z121=$36,HtoT_Moisture=$37,HtoT_Temp=$38,magnitud_full_zone=$39,magnitud_upper_zone=$40,magnitud_center_zone=$41,magnitud_lower_zone=$42,HtoT_self_turn=$43,patient_id=$44 WHERE id = $45 RETURNING *',
    [bus_code,datetime,longitude,latitude,AH_Full_zone,Average_H_upper_zone,Average_H_center_zone,Average_H_lower_zone,z1,z2,z3,z4,z5,z6,z7,z8,z9,z10,z11,z12,AT_Full_zone,Average_T_upper_zone,Average_T_center_zone,Average_T_lower_zone,z112,z21,z31,z41,z51,z61,z71,z81,z91,z101,z111,z121,HtoT_Moisture,HtoT_Temp,magnitud_full_zone,magnitud_upper_zone,magnitud_center_zone,magnitud_lower_zone,HtoT_self_turn,patient_id,id],
    (error, results) => {
      if (error) { 
        throw error
      } 
      if (typeof results.rows == 'undefined') {
      	response.status(404).send(`Resource not found`);
      } else if (Array.isArray(results.rows) && results.rows.length < 1) {
      	response.status(404).send(`sensor not found`);
      } else {
  	 	  response.status(200).send(`Sensor modified with ID: ${results.rows[0].id}`)         	
      }
    }
  )
});

router.delete('/deleteSensor/:id',(request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM sensorinfo WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Sensor deleted with ID: ${id}`)
  })
});

module.exports = router;

