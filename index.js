const express = require('express')

const ObjectId = require('mongodb').ObjectID;
var bodyParser = require('body-parser')
var cors = require('cors')
require('dotenv').config()
const app = express()
const port = process.env.PORT || 5055;

app.use(cors())
app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.send('Hello World!')
})



const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://organicUser2:amarnamkivai@cluster0.1tcgs.mongodb.net/organicdb5?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
            const collection = client.db("organicdb5").collection("products");

          app.post('/addEvent', (req,res) => {
            const newEvent = req.body;
            console.log('adding new event ', newEvent);
            collection.insertOne(newEvent)
            .then(result => console.log(result.insertedCountn))
          })


          app.get('/allProducts',(req,res) => {
            collection.find()
            .toArray((err,items) => {
              res.send(items);
            })
          })
          
          app.get("/product/:id",(req,res) => {
            collection.find({_id : ObjectId(req.params.id)})
            .toArray((err,document) => {
              res.send(document);
            })
          })

          app.patch('/update/:id', (req,res) => {
            console.log("Hei I am fixed");
            collection.updateOne({_id : ObjectId(req.params.id)},
            {
              $set: {date: req.body.date , email: req.body.email}
            })
            .then(result => {
              console.log(result)
            })
          })

          app.get('/order/:emailAddress',(req,res) => {
            collection.find({email : req.params.emailAddress})
            .toArray((err,doc) => {
              res.send(doc);
            })
          })
          

          console.log("Database connected successfully");
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})




// collection.find({}, { projection: { _id: 0, name: 1 } })
// collection.find({name : 'Onion'})
// collection.find({name : req.params.id})