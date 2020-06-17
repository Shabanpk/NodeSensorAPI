
const bodyParser = require("body-parser");
const sensor=require("../sensorCrud");
//const { json } = require("sequelize/types");
const { route } = require("../controller/user-controller");
module.exports = function(app) {
    app.use(bodyParser.json());
    app.use("/sensor", sensor);
}
//module.exports=router;
