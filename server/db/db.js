const Sequelize = require('sequelize')

const databaseUrl = process.env.DATABASE_URL || 'postgres:localhost:5432/stackathon'

const db = new Sequelize(databaseUrl, {
  logging: false,
  operatorsAliases: false,
  operatorsAliases: 0
})

module.exports = db
