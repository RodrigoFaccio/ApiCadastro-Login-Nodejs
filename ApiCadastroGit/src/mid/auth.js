
const  jwt = require('jsonwebtoken');
const auth = require('../config/auth.json');

module.exports = (req,res,next)=>{
 const authHeader = req.headers.authorization;

 if(!authHeader)
 return res.status(401).send({error:'No token  provide'});

 const parts = authHeader.split(' ');

// verifica se o post tem o Bearer e o token 
 if(!parts.length ===2 )
 return res.status(401).send({erro:"Token invalido"});
// divide scheme = Bearer e o token o token 
 const[scheme,token] = parts;

 if(!/^Bearer$/i.test(scheme))

 return res.status(401).send({error:'Token mal formatado'})

 jwt.verify(token,auth.secret,(err, decode )=>{
    if(err)  return res.status(401).send({error:'Token invalido'})

    req.userId =decode.id;

    return next();



 });




};