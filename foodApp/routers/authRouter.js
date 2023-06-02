const express = require('express');
const app = express();
const authRouter=express.Router();
const userModel=require('../models/userModel');

authRouter
.route('/signup')
.get(getSignup)
.post(postSignup);

authRouter
.route('/login')
.post(postLogin);

//Function for Auth Routes
function getSignup (req, res) {
    return res.sendFile('../foodPages/signupform.html',{root:__dirname});
}
async function postSignup (req, res) {
    let obj=req.body;
    // console.log("Backend",obj);
    let resp=await userModel.create(obj);
   
    res.json({
        message:"Data posted Successfully! ",
        data:resp
    });
}

async function postLogin(req, res) {
    try{
        let data=req.body;
    if(data.email){
        let user=await userModel.findOne({email:data.email});
        if(user){
            if(data.password==user.password){
                res.cookie('isLoggedIn',true,{httpOnly:true});
               return res.json({
                    message:"User Logged in successfully!",
                    data:user,
                })
            }
            else{
               return  res.json({
                    message:"Invalid credentials!"
                })
            }


        }else{
            return res.json({
                message:"No user found! "
            })
        }

    }
    else{
        return res.json({
            message:"empty data received!"
        })
    }
    }catch(err){
        return res.status(501).json({
            message:err.message
        })
    }
    

}

module.exports =authRouter;