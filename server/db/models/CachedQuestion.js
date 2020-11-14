const Sequelize = require('sequelize')
const db = require('../db')

const { STRING, BOOLEAN, ENUM, INTEGER } = Sequelize

const CachedQuestion = db.define('cachedQuestion', {
  category: {
    type: STRING
  },
  correct: {
    type: BOOLEAN
  },
  usedBlasts: {
    type: INTEGER
  },
  time: {
    type: INTEGER
  }
})

module.exports = CachedQuestion
