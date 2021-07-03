const mongoose = require('mongoose')
const bcrypt = require("bcryptjs")
const  jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    Email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    cpassword:{
        type:String,
        require:true
    },
    tokens :[
        {
        token:{
        type:String,
        required:true
        }
    }]
})

// We r hashing the password and ConformPassword :)

userSchema.pre( 'save' , async function(next) {
    if  (this.isModified ('password')){
 
        this.password = await bcrypt.hash(this.password , 12);
        this.cpassword =  await bcrypt.hash(this.cpassword , 12);
 
    }
    next();
 });

 //we r generating jwt token-------

userSchema.methods.generateAuthToken = async function(){
    try{
        let token  = jwt.sign({_id:this._id}, process.env. SECRET_KEY);
        this.tokens = this.tokens.concat( { token:token } ) 
        await this.save();
        return token; 
    }catch(err){
        console.log(err);
    }
}

const User = mongoose.model("USER" , userSchema);

module.exports = User