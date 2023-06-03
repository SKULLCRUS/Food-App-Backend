const userModel=require('../models/userModel');
const jwt=require('jsonwebtoken');
//Function for Auth Routes
module.exports.getSignup=function getSignup (req, res) {
    return res.sendFile('../foodPages/signupform.html',{root:__dirname});
}
module.exports.postSignup=async function postSignup (req, res) {
    let obj=req.body;
    // console.log("Backend",obj);
    let resp=await userModel.create(obj);
   
    res.json({
        message:"Data posted Successfully! ",
        data:resp
    });
}

module.exports.postLogin=async function postLogin(req, res) {
    try{
        let data=req.body;
    if(data.email){
        let user=await userModel.findOne({email:data.email});
        if(user){
            if(data.password==user.password){
                let token=jwt.sign({payload:user['_id']},require('../../secrets').JWT_KEY)
                res.cookie('login',token,{httpOnly:true});
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