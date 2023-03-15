const express = require('express')
const cors = require('cors')
const mysql = require('mysql2')

const connection = mysql.createConnection({
  host: '157.245.59.56',
  user: 'u6205336',
  password: '6205336',
  database: 'u6205336',
  port: 3366
})

var app = express()
app.use(cors())
app.use(express.json())

app.get('/', function(req, res) {
  res.json({
    "status": "ok",
    "message": "Hello World"
  })
})

app.get('/customer', function(req, res) {
    connection.query(
      'SELECT * FROM a1_customer',
      function(err, results) {
        console.log(results) //แสดงผลที่ console
        res.json(results) //ตอบกลับ request
      }
    )
  })
  
  app.get('/item', function(req, res) {
    connection.query(
      `SELECT * FROM a1_item`,
       function(err, results) {
        res.json(results)
       }
    )
  })

  app.get('/order', function(req, res) {
    connection.query(
      `SELECT * FROM a1_order`,
       function(err, results) {
        res.json(results)
       }
    )
  })
  
  app.post('/users', function(req, res) {
    const email = req.body.email
    const fullname = req.body.fullname
    const city = req.body.city
    connection.query(
      `INSERT INTO user (email, fullname, city) VALUES (?, ?, ?)`,
      [email, fullname, city],
      function(err, results) {
        if (err) { res.json(err) }
        res.json(results)
      }
    )
  })
  
  app.get('/item_price', function(req, res){
    connection.query(
      `SELECT id, name, price
      FROM a1_item
      ORDER BY price;`,
       function(err, results) {
        res.json(results)
       }
    )
  })
  
  app.get('/pets_price_chart', function(req, res){
    connection.query(
      `SELECT id, petName, price
       FROM pet
       ORDER BY price;`,
       function(err, results) {
        const petNames = []
        const prices = []
        for (let i = 0; i < results.length; i++) {
          petNames.push(results[i]['petName'])
          prices.push(parseFloat(results[i]['price']))
        }
        res.json({
          petNames, prices
        })
       }
    )
  })
  
  app.listen(5000, () => {
    console.log('Server is started.')
  })
  
