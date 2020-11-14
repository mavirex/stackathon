const {
  db, User, Rank
} = require('./server/db')
const hash = require('./server/hash');

const ranks = [
  {
    title: 'D',
    meritRequired: 0,
    scoreMultiplier: 1,
    timer: 9,
    markHits: 6,
    hunterPercent: 0
  },
  {
    title: 'C',
    meritRequired: 100,
    scoreMultiplier: 2,
    timer: 8,
    markHits: 6,
    hunterPercent: 0
  },
  {
    title: 'B',
    meritRequired: 300,
    scoreMultiplier: 3,
    timer: 8,
    markHits: 7,
    hunterPercent: 7.5
  },
  {
    title: 'A',
    meritRequired: 600,
    scoreMultiplier: 4,
    timer: 7,
    markHits: 7,
    hunterPercent: 15
  },
  {
    title: 'AA',
    meritRequired: 1000,
    scoreMultiplier: 5,
    timer: 6,
    markHits: 8,
    hunterPercent: 22.5
  },
  {
    title: 'AAA',
    meritRequired: 1500,
    scoreMultiplier: 6,
    timer: 5,
    markHits: 9,
    hunterPercent: 30
  },
  {
    title: 'S',
    meritRequired: 2100,
    scoreMultiplier: 6,
    timer: 5,
    markHits: 10,
    hunterPercent: 45
  }
]

const users = [
  {
    userType: 'admin',
    firstName: 'Mark',
    lastName: 'Guinn',
    email: 'mxavier927@gmail.com',
    username: 'mxavier927',
    password: '',
    rankId: 1
  }
]

async function hashPasswords() {
  for (let i = 0; i < users.length; i++) {
    const { username } = users[i];
    users[i].password = await hash(username)
  }
}

const seed = async () => {
  try {
    console.log('seeding')
    await hashPasswords(),
    await db.sync({ force: true })
    await Promise.all([ 
      Rank.bulkCreate(ranks),
      User.bulkCreate(users)
    ])
  } catch (err) {
    console.error(err)
  }
}

seed()
