const express = require('express');
const app = express();


const bodyParser = require('body-parser');

const methodOverride = require('method-override');

const mongo = require('mongodb');

const MongoClient = require('mongodb').MongoClient;

const cors = require('cors');

const fileUpload = require('express-fileupload');

app.use(fileUpload());

const connectionString =
  "mongodb+srv://kishan123:kishan841406@cluster0.pt7me.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(connectionString);

app.use(methodOverride('_method'));

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.json());

app.use(cors());

var db, users, products, messages;

MongoClient.connect(connectionString,{useUnifiedTopology:true}).then(client=>{
    console.log("Connected to Database");
    db = client.db("Project2");
    users = db.collection("Users");
    products = db.collection("Products");
    messages = db.collection("Messages");
})

app.listen(80, ()=>{
    console.log("Server Started");
})

app.post('/checkuser',(req,res)=>{
    users.findOne({
        Email:req.body.Email
    }).then(function(succ){
        if(succ==null){
            res.send('true');
        }else{
            res.send('false');
        }
    })
})

app.post('/registerUser',(req,res)=>{
    users.insertOne({
        Name:req.body.Name,
        Email:req.body.Email,
        Password:req.body.Password
    }).then(function(succ){
        res.send('true')
    }).catch(function(err){
        console.log(err);
        res.send('false');
    })
})

app.post('/userLogin',(req,res)=>{
    users.findOne({
        Email:req.body.Email,
        Password:req.body.Password
    }).then(function(succ){
        res.send(succ);
    }).catch(function(err){
        console.log(err);
        res.send('false');
    })
})

app.post('/userAutoLogin',(req,res)=>{
    users.findOne({
        Email:req.body.Email
    }).then(function(succ){
        res.send(succ);
    }).catch(function(err){
        console.log(err);
        res.send('false');
    })
})

app.post('/getUser',(req,res)=>{
    users.findOne({
        Email:req.body.Email
    }).then(function(succ){
        res.send(succ);
    })
})

app.get('/getProducts',(req,res)=>{
    products.find().toArray().then(function(succ){
        res.send(succ);
    })
})


app.post('/insertMessage',(req,res)=>{
    messages.insertOne({
        Name:req.body.Name,
        Email:req.body.Email,
        Message:req.body.Message
    }).then(function(succ){
        res.send('true');
    }).catch(function(err){
        console.log(err);
        res.send('false');
    })
})
