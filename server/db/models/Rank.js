const Sequelize = require('sequelize')
const db = require('../db')

const { STRING, INTEGER } = Sequelize

const Rank = db.define('rank', {
  title: {
    type: STRING,
    unique: true,
    validate: {
      notEmpty: true
    }
  },
  meritRequired: {
    type: INTEGER,
    validate: {
      notEmpty: true
    }
  },
  scoreMultiplier: {
    type: INTEGER,
    validate: {
      notEmpty: true
    }
  },
  timer: {
    type: INTEGER,
    validate: {
      notEmpty: true
    }
  },
  markHits: {
    type: INTEGER,
    validate: {
      notEmpty: true
    }
  },
  hunterPercent: {
    type: INTEGER,
    validate: {
      min: 0,
      max: 100,
      notEmpty: true
    }
  }
})

module.exports = Rank
