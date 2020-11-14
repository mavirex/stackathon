const db = require('./db')
const User = require('./models/User')
const Session = require('./models/Session')
const Rank = require('./models/Rank')
const CachedQuestion = require('./models/CachedQuestion')

Session.hasOne(User)
User.belongsTo(Session)

User.belongsTo(Rank)
Rank.hasMany(User)

CachedQuestion.belongsTo(User)
User.hasMany(CachedQuestion)

module.exports = {
  db, User, Session, Rank, CachedQuestion
}
