const Sequelize = require('sequelize')
const db = require('../db')

const { STRING, ENUM, INTEGER } = Sequelize

const User = db.define('user', {
  userType: {
    type: ENUM('player', 'admin'),
    defaultValue: 'player'
  },
  firstName: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  lastName: {
    type: STRING,
    validate: {
      notEmpty: true
    }
  },
  email: {
    type: STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
      notEmpty: true
    }
  },
  username: {
    type: STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true
    }
  },
  password: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  credits: {
    type: INTEGER,
    defaultValue: 500
  },
  quantumBlasts: {
    type: INTEGER,
    defaultValue: 10
  },
  dailyScore: {
    type: INTEGER,
    defaultValue: 0
  },
  weeklyScore: {
    type: INTEGER,
    defaultValue: 0
  },
  merit: {
    type: INTEGER,
    defaultValue: 0
  }
})

module.exports = User
