const express = require('express')
const user = require('./controller/user-controller')
const User = require('./model/user')
const app = express()
const sequelize = require('./db');


require("./routes/routes")(app);

const port = 3001

app.use(express.json());

app.use('/user', user)

app.get('*', (req, res) => {
    res.send('<h1 style="margin:0 auto;">Welcome</h1>');
});
// function gettoken(){
//     const token = jwt.sign(
//         {name: this.name}
//         )
//         return token;
// }
// app.post('/login',(req,res)=>{
//     const User={
//         name:req.body.name,
//         password:req.body.password
//     }
//     res.send(User)
//     res.header("x-auth-token",token).send(user);
 
// })
sequelize.sync({
    alter: true
}).then(result => {
    User.seed()
}).catch(err => {
    // console.log(err);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

