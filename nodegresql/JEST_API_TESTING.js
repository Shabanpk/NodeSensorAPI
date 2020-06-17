'use strict';

var express = require('express');
const Pool = require('pg').Pool
var app =express();
var config = {
  user: 'postgres', 
  host: 'localhost',
  database: 'NodeAPI',
  password: 'admin',
  port: 5432
};


const pool = new Pool(config);

app.get('/getSpecificData',(request, response)=>{
  pool.query('Select id,bus_code,latitude from sensorinfo where id =1', (error, results) => {
//Select id,bus_code,latitude from sensorinfo where id =1
//SELECT * FROM sensorinfo ORDER BY id asc
      if (error) {
        throw error
      } 
      response.json(results.rows)     
      //return response.status(200).json(results.rows)
      
    })
});

module.exports = app;
