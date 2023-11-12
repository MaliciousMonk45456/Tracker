const express=require('express');
const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const User=mongoose.model('User');

const router=express.Router();

router.post('/signup',async (req,res)=>{
    // console.log(req.body);
    const {email,password}=req.body;

    try{
        const user=new User({email,password});
        await user.save();
        const token=jwt.sign({userId:user._id},'MY_SECRET_KEY');
        res.send({token:token});
    }catch(err){
        return res.status(422).send(err.message);
    }
    
});

router.post('/signin',async (req,res)=>{
    const {email,password}=req.body;

    if(!email || !password){
        return res.status(422).send({error:'Must provide email and password'});
    }

    await User.findOne({email:email}).then(function(user){
        if(!user){
            return res.status(422).send({error:'Invalid password or email'});
        }
        try{
            user.comparePassword(password);
            const token=jwt.sign({userId:user._id},'MY_SECRET_KEY');
            res.send({token:token});
        }catch(err){
            return res.status(422).send({error:'Invalid password or email'});
        }
    }).catch(function(err){
        return res.status(422).send({error:'Must provide email and password'});
    });

    
});

module.exports=router;