
const bodyParser = require("body-parser");
const sensor=require("../sensorCrud")
module.exports = function(app) {
    app.use(bodyParser.json());
    app.use("/sensor", sensor);
}
