const BodyParser= require('body-parser');
const mongoose = require('../database');
const  bcypt = require('bcryptjs');


const UserSchema = new mongoose.Schema ({
    name:{
        type:String ,
        require:true,
    },
    email:{
        type:String ,
        require:true,
        unique:true,
        lowrcase:true,
    },
    password:{
        type:String ,
        require:true,
        select:false,
    },
    createAt:{
        type:Date ,
       default:Date.now,
    },
});
UserSchema.pre('save',async function(next){
    const hash = await bcypt.hash(this.password,10);
    this.password = hash;
    next();
}); 

const User = mongoose.model('User',UserSchema);

module.exports = User;