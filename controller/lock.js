const  route =require("express").Router()
const  jwt  =require("jsonwebtoken")
const  user =require('../model/user')
const Cryptr = require('cryptr');
const cryptr = new Cryptr('lockify');
route.post('/add_credential',(req,res)=>{
    if(req.body.cred_username && req.body.cred_password && req.body.cred_title &&req.body.token)
    {   console.log('in add');
        const token=jwt.verify(req.body.token,process.env.secret_token)
        console.log(token);
        const encryptedString = cryptr.encrypt(req.body.cred_password);
        user.updateOne({_id:token.user_id},
            {
                $push:{

                    credentials:{
                        cred_title:req.body.cred_title,
                        cred_username:req.body.cred_username,
                        cred_password:encryptedString

                    }
                }
            })
            .then(()=>{
                res.send('inserted succesfully')
            })
            .catch((err)=>{
                console.log(err);
            })

    }
    else{
        res.sendStatus(400)
    }
})


route.get('/get_credential/:token',(req,res)=>{

    if(req.params.token)
    {
      jwt.verify(req.params.token,process.env.secret_token,(err,token)=>{
        if(err)
        {
            res.send(403)
        }
        else{
            user.findOne({_id:token.user_id},{credentials:1,_id:0})
            .then((result)=>{
                // console.log(result);
                const cred=result.credentials
               for(var i=0;i<cred.length;i++)
               {
                cred[i].cred_password=cryptr.decrypt(cred[i].cred_password);
               }
                console.log(cred);
               res.send(cred)
            })
            .catch((err)=>{
                console.log(err);
            })
        }
      })
        
    }
    else{
        res.sendStatus(400)
        }
})



route.post('/update_credential',(req,res)=>{
    if(req.body.cred_username && req.body.cred_password && req.body.cred_title &&req.body.token,req.body.cred_id){

        jwt.verify(req.body.token,process.env.secret_token,(err,token)=>{
            if(err)
            {   console.log(err);
                res.sendStatus(403)
            }
            else{
                const encryptedString = cryptr.encrypt(req.body.cred_password)
            user.updateOne({_id:token.user_id,"credentials._id":req.body.cred_id},{
                $set:{
                    "credentials.$.cred_username":req.body.cred_username,
                    "credentials.$.cred_password":encryptedString,
                    "credentials.$.cred_title":req.body.cred_title

            }
            })
            .then(()=>{
                res.send('updated sucessfully')
            })
            .catch((err)=>{
                console.log(err);
            })
            }

            
    })

}
    else{
        res.sendStatus(400)
        }
})
module.exports=route