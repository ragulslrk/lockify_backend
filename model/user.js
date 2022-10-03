const mongoose=require("mongoose")
const  user_schema= mongoose.Schema({
    username:{
        type:String,
        required:false
    },
    password:{
        type:String,
        required:false

    },
    email:{
        type:String,
        required:false
    },
    credentials:[{
       
        cred_title:String,
        cred_username:String,
        cred_password:String
    }]
},{versionKey:false})



const  user_model=mongoose.model('users',user_schema)

module.exports=user_model