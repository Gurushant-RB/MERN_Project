const express= require('express');
const app = express();
const mongoose =require('mongoose');
const User = require('./model/users');
const cors=require('cors');

//middleware( must be used while transfering data from front to backend)
app.use(cors());
app.use(express.urlencoded({extended:false}))
app.use(express.json());

//1. Connect to MongoDB
const db_url = "mongodb://0.0.0.0:27017/users";
mongoose.connect(db_url).then(()=>{
    console.log('Connected to MongoDB');
})
// User Login

app.post('/log', async(req,resp)=>{
    await User.findOne({email: req.body.email}).then((uData)=>{
        console.log(uData);
        if(uData)
        {
           if( uData.password === req.body.password)
           {
            resp.send({message:'login success' , status:200});
           }
           else{
            resp.send({message:'please enter correct password'});
           }
        }
        else{
            resp.send({message:'user not found, please register'});
        }
    })
})

/// Registering users
app.post('/reg', async (req, resp)=>{
    User.findOne({email:req.body.email}).then((userData)=>{
        if(userData)
        {
            //error message
            resp.send({message:'user already exists'});
        }
        else{
            //add user to the db
            const uData=new User({
                firstName: req.body.name,
                lastName: req.body.last,
                email: req.body.email,
                password: req.body.pass
            })
            //saving the data
            uData.save().then(()=>{
                resp.send({message:'user added successfully'})
            }).catch(()=>{
                resp.send({message:'user registration failed. Try again'});
            });
        }
    })
})
app.listen(4000,()=>{console.log('running in 4000');})