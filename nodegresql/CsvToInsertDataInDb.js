const fs = require("fs");
const Pool = require("pg").Pool;
const fastcsv = require("fast-csv");

let stream = fs.createReadStream("Senors_TEMP_099.csv");
let csvData = [];
let csvStream = fastcsv
  .parse()
  .on("data", function(data) {
    csvData.push(data);
  })
  .on("end", function() {
    
    csvData.shift();
    //DATABASE_URL = 'postgres://postgres:admin@localhost:5432/nodegre';
    
    
    const pool = new Pool({
      host: "localhost",
      user: "postgres",
      database: "nodegre",
      password: "admin",
      port: 5432
    });


//master password root1234
    const query =
      "INSERT INTO sensorinfo(Id,bus_code,datetime,longitude,latitude,AH_Full_zone,Average_H_upper_zone,Average_H_center_zone,Average_H_lower_zone,z1,z2,z3,z4,z5,z6,z7,z8,z9,z10,z11,z12,AT_Full_zone,Average_T_upper_zone,Average_T_center_zone,Average_T_lower_zone,z112,z21,z31,z41,z51,z61,z71,z81,z91,z101,z111,z121,HtoT_Moisture,HtoT_Temp,magnitud_full_zone,magnitud_upper_zone,magnitud_center_zone,magnitud_lower_zone,HtoT_self_turn,patient_id) VALUES ($1, $2, $3, $4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29,$30,$31,$32,$33,$34,$35,$36,$37,$38,$39,$40,$41,$42,$43,$44,$45)";

    pool.connect((err, client, done) => {
      if (err) throw err;

      try {
        csvData.forEach(row => {
          client.query(query, row, (err, res) => {
            if (err) {
              console.log(err.stack);
            } else {
              console.log("inserted " + res.rowCount + " row:", row);
            }
          });
        });
      } finally {
        done();
      }
    });
  });

stream.pipe(csvStream);
