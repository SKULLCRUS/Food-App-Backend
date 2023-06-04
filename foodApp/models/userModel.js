const mongoose=require('mongoose');
const emailValidator = require('email-validator');
const bcrypt = require('bcrypt');


let db_link=require('../../secrets').DB_LINK;


mongoose.connect(db_link)
.then(function(db){
console.log('DB connected successfully! ')
})
.catch(function(err){
    console.log(err);
})
//Schema
const  userSchema =mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:function(){
            return emailValidator.validate(this.email);
        }
    },
    password:{
        type:String,
        required:true,
        minLength:8
    },
    confirmPassword:{
        type:String,
        // required:true,
        minLength:8,
        validate:function(){
            return this.confirmPassword==this.password;
        }
    },
    role:{
        type:String,
        enum:['admin','user','restaurant_Owner ','Delivery'],
        default:'user'
    },
    profileImage:{
        type:String,
        default:'img/users/default.png'
    }

});
//Pre Hook is used jisse hum confirm password waali jko redundant field hai use db mein na store karien.
//Aise hi  Post Hook bhi hota hai jo specified task ke baad run hota hai(yahan specified taskk hai save).
userSchema.pre('save', function(){
    this.confirmPassword=undefined;
})

//Pre Hook is made.
// userSchema.pre('save',async function(){
//     let salt=await bcrypt.genSalt();
//     let hashedString=await bcrypt.hash(this.password,salt);
//     // console.log('Hashed Password is ',hashedString);
//     this.password = hashedString;
// })
//Model
const userModel=mongoose.model('userModel',userSchema);
//Adding User
// (async function createUser(){
//     let user={
//         name:'Riddhima',
//         email:'abc@gmail.com',
//         password:'12345678',
//         confirmPassword:'12345678'
//     }
//     let data=await userModel.create(user);
//     console.log(data);
// })();//Immediately invoked function.
module.exports =userModel;//to make user model available globally to the project.
