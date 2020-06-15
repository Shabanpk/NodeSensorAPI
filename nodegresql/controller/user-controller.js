var express = require('express');
var router = express.Router();
const User = require('../model/user')
const Helper = require('./helper')

router.get('/all', async (req, res) => {
    try {
        Helper.decodeToken(req.headers['authorization'], async function (err, decoded) {
            if (err) {
                res.status(401).send('Failed to authorize request')
            } else {
                const user = await User.findOne({
                    where: {
                        id: decoded.id,
                        email: decoded.email
                    }
                });
                if (!user) {
                    res.status(401).send('Failed to authorize request')
                } else {
                    const users = await User.findAll();
                    return res.send({
                        users
                    });
                }
            }
        })
    } catch (error) {
        return res.send(error);
    }
});

router.post('/auth', async (req, res) => {
    if (!(Helper.isValidEmail(req.body.email))) {
        res.status(400).send('Invalid Email address provided')
    } else if (!req.body.password) {
        res.status(400).send('Invalid Password provided')
    } else {
        try {
            const user = await User.findOne({
                where: {
                    email: req.body.email
                }
            });
            const error = "Error! Incorrect email or password";
            if (!user) {
                res.status(400).send(error);
            } else if (Helper.comparePassword(user.password, req.body.password)) {
                console.log(user);
                result = {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt

                }
                result.token = Helper.generateToken(result)
                return res.send({
                    result
                });
            } else {
                res.status(400).send(error);
            }
        } catch (error) {
            console.log(error);
            return res.status(500).send("Error occurred on processing request");
        }
    }
});

router.get("/", async (req, res) => {
    if (!req.headers['authorization']) {
        res.status(401).send("Failed to authorize request")
    } else {
        Helper.decodeToken(req.headers['authorization'], function (err, decoded) {
            if (err) {
                res.status(401).send('Failed to authorize request')
            } else {
                delete decoded.iat;
                return res.send({
                    decoded
                });
            }
        });
    }
});

module.exports = router;