const express = require('express')
require('dotenv').config()
const bodyparse = require('body-parser')
const app = express()
const port = process.env.PORT
const projectRouter = require('./src/routers/projects')

// Middleware
app.use(bodyparse.urlencoded({ extended: false }))

app.use('/project', projectRouter)

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.listen(port)
