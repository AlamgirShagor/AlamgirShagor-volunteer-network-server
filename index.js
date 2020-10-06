const express = require('express')

const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config()
const port = 5000;


const app = express()
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jkj2o.mongodb.net/volunteer-network?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const homeCollection = client.db("volunteer-network").collection("home-page-data");
  const registerCollection = client.db("volunteer-network").collection("registerData");

  app.get('/helpItem', (req, res) =>{
    homeCollection.find({})
    .toArray((err, document) => {
      res.send(document);
    })
  })

  app.get('/userData', (req, res) =>{
    registerCollection.find({})
    .toArray((err, document) => {
      res.send(document);
    })
  })
  app.post("/addRegister", (req, res) =>{
    const register = req.body;
    console.log(register);
    registerCollection.insertOne(register)
    .then( result => {
      res.send(result)
    })
  })

  app.get('/resItems', (req, res) =>{
    registerCollection.find({email: req.query.email})
    .toArray( (err, documents) =>{
      res.send(documents);
    })
  })

  
});







app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(process.env.Port || port)
