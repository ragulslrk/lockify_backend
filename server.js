const express=require('express')
const mongoose=require("mongoose") 
const app =express()

const cors = require('cors');
app.use(express.urlencoded({extended:true}));
app.use(express.json({limit:'1mb'}))
app.use(cors());
require("dotenv").config()


app.use(express.urlencoded({extended:true}));
app.use(express.json({limit:'1mb'}))


mongoose.connect( 'mongodb+srv://ragulNolan:%23Ragul4444@cluster0.6qh9t.mongodb.net/lockify?retryWrites=true&w=majority',{useNewUrlParser: true,useUnifiedTopology: true})
.then((res)=>{
    app.listen(process.env.PORT ||3232,()=>{
        console.log('this lockify project ')
})
console.log('success lockify project ')})
.catch((err)=>{console.log(err)})


app.get('/test',(req,res)=>{

    console.log('request  recieved');
    res.json({msg:'to frontend'})
})

//route  to  login  
const  login=require('./controller/login')
app.use(login)

//route  to  signup
const  signup=require('./controller/signup')
app.use(signup)


//route  to lock  password  
const  lock =require('./controller/lock')
app.use(lock)