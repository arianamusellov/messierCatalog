const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const mysql = require('mysql');
const cors = require('cors')

/*const connection = mysql.createConnection({
    host: 'localhost',
    user: 'newuser',
    password: 'newpassword',
    database: 'messier_database'
  });

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL Server!');
  });*/

const db = mysql.createPool({
    host: 'localhost',
    user: 'newuser',
    password: 'newpassword',
    database: 'messier_database'
});

app.use(cors())
app.use(express.json())

app.use(bodyParser.urlencoded({extended: true}))

messierID = ''; // no me dejó hacerle const

// Get info from front end to back end connected to DB
app.post('/api/insert', (req,res) => {

  messierID = req.body.messierID 
  console.log(messierID)

  //const sqlInsert = "SELECT * FROM messier_objects WHERE m_id = (?)"

  /*db.query(sqlInsert, messierID, (err, result) => {
    console.log(result)
  })*/
})

// Send info from back-end (DB) to front-end
app.get('/api/get', (req, res) => { //get es siempre que quiero res.send? Y post siempre que quiero req.body?
  console.log(messierID)
  const sqlInsert = "SELECT * FROM messier_objects WHERE m_id = (?)"

  db.query(sqlInsert, messierID, (err, result) => {
    res.send(result)
  })
})



//app.get('/', (req,res) => {
    //const sqlInsert = "INSERT INTO messier_objects (m_id, ngc, obj_type, cons, common_name) VALUES ('2', '7089', 'GC', 'Aqr', 'ajdkf');"
    //db.query(sqlInsert, (err, result) => {
    //    res.send('hello ariana lkhi');
    //});
//});

app.listen(3001, ()=>{
    console.log("running on port 3001")
});