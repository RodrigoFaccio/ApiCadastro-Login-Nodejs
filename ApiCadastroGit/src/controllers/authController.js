const express = require('express');
const  bcypt = require('bcryptjs');
const  jwt = require('jsonwebtoken');
const auth = require('../config/auth.json');
const User = require('../modells/user.js');

const router = express.Router();

router.post('/register',async (req,res )=>{
    const {email} = req.body;
try{
    if(await User.findOne({email})){
        return res.status(400).send({error:'Usuario ja existe'})
    }
    // add usuarios na tabela
    const user  = await User.create(req.body);
    user.password = undefined;

    return res.send({user,
        token:generateToken({id:user.id})
    });

}catch(err){
    return res.status(400).send({error:'Regiter failed'});
}
});

function generateToken(params= {}){
   return  jwt.sign(params, auth.secret,{
        expiresIn:86400,
    });

}
router.post('/authe',async (req,res)=>{
    const {email,password} = req.body;

    const user = await User.findOne({email}).select('+password');

    if(!user)
    return res.status(400).send({error:'Usuario não existe'})
    
    if(!await bcypt.compare(password,user.password))
    return res.status(400).send({error:'senha invalida'});
    user.password = undefined;
    


    res.send({user,
        token:generateToken({id:user.id})
    });

});

module.exports = app => app.use('/auth',router);