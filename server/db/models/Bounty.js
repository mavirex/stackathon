const Sequelize = require('sequelize')
const db = require('../db')

const { STRING, ENUM, INTEGER } = Sequelize

const Bounty = db.define('bounty', {
    userType: {
      type: ENUM('easy', 'medium', 'hard'),
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    markName: {
      type: STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    planet: {
      type: STRING,
      validate: {
        notEmpty: true
      }
    },
    wantedFor: {
      type: STRING,
      validate: {
        notEmpty: true
      }
    }
  })
  
  module.exports = Bounty
