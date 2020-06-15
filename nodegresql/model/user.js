const Sequelize = require('sequelize');
const sequelize = require('../db');
const Helper = require('../controller/helper')

const User = sequelize.define(
    'User', {
        name: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING,
            unique: true
        },
        password: {
            type: Sequelize.STRING
        }
    }
);

User.prototype.toJSON = function () {
    var values = Object.assign({}, this.get());

    delete values.password;
    return values;
}

// executes successfully only once since email is unique
User.seed = async () => {
    try {
        await User.create({
            name: "Shaban",
            email: "shaban@admin.com",
            password: Helper.hashPassword("admin")
        });
    } catch (e) {
        console.log(e);
    }
}

module.exports = User;