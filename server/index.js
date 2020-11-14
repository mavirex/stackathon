const express = require('express')
const app = express()

const path = require('path')
const morgan = require('morgan')
const cookieParser = require('cookie-parser');
const { db } = require('./db');
const api = require('./api')

app.use(morgan('dev'))
app.use(cookieParser())
app.use(express.json())

app.use(express.static(path.join(__dirname, '/public')))
app.use('/api', api);
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'))
})

app.use((req, res, next) => {
  const err = new Error('Not found')
  err.status = 404
  next(err)
})
app.use((err, req, res, next) => {
  console.error(err, err.stack)
  res.status(err.status || 500)
  res.send(`Something wrong: ${err.message}`)
})

async function init () {
  try {
    await db.sync()
    const PORT = process.env.PORT || 3000
    app.listen(PORT, () => {
      console.log(`Listening at http//localhost:${PORT}`)
    })
  } catch (err) {
    console.error(err)
  }
};

init()
