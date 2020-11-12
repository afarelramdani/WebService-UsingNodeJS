const express = require('express')
const db = require('./src/helpers/db')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
  })

app.get('/project', (req, res) => {
    db.query(`SELECT * FROM android`, (err, results, fields) => {
      if(!err) {
        if(results.length) {
          res.status(200).send({
            success: true,
            message: 'Project List',
            data: results
          })
        } 
        else {
          res.status(404).send({
            success: true,
            message: 'Item Project Not Found'
          })
        }
        
    }
      else {
        res.status(500).send({
          success: true,
          message: 'Internal Server Erro'
        })
        
      }

    })
  })
  
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })

  