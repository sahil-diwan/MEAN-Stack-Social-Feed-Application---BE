var express = require('express');
var cors = require('cors');
var app = express();
var bodyParser=require('body-parser');
var mongoose = require('mongoose');
var User = require('./models/User.js');
var jwt = require('jwt-simple')


app.use(cors());
app.use(bodyParser.json());

var posts = [
    {message:'hello'},
    {message:'hi'}
]

app.get('/posts',(req,res)=>{
    res.send(posts);
})


app.post('/register',(req,res)=>{
    var userData = req.body;
    var user = new User(userData);
    user.save((err,result)=>{
        if(err)
            console.log('saving user error');
        res.sendStatus(200);
    })   
})


app.post('/login',async (req,res)=>{
    var userData = req.body;
    var user = await User.findOne({email: userData.email});
    if(!user)
        return res.status(401).send({message:'Email or Password is invalid'});

    if(userData.password!=user.password)
        return res.status(401).send({message:'Email or Password is invalid'});

    var payload = {}
    var token = jwt.encode(payload,'123')
    console.log(token);

    console.log(user);
    res.status(200).send({token:token});
})



mongoose.connect('mongodb+srv://sahildiwan1992:test@cluster0-z2a5c.mongodb.net/pssocial?retryWrites=true&w=majority',{ useUnifiedTopology: true },(err)=>{
    if(!err){
        console.log('Connected to Mongo');
    }
    else{
        console.log('Not Connected to Mongo');
    }
})

app.listen(3000,()=>{
    console.log('Server is running');
});