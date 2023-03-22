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
  
  app.get('/item_top', function(req, res){
    connection.query(
      `SELECT i.orderId, SUM(o.quantity) AS TopSell
      FROM a1_item i
      LEFT JOIN a1_order o
      ON o.orderId = i.orderId
      GROUP BY i.orderId  
      ORDER BY TopSell DESC`,
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


  app.post('/order', function(req, res) {
    const values = req.body
    console.log(values)
    connection.query(
      'INSERT INTO a1_order (orderId, customerId, product_order, quantity) VALUES ?', [values],
      function(err, results) {
        console.log(results) //แสดงผลที่ console
        res.json(results) //ตอบกลับ request
      }
    )
  })
  
  
  
  app.listen(5000, () => {
    console.log('Server is started.')
  })
  
