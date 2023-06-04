const userModel=require('../models/userModel');

//Functions for User routes
module.exports.getUser=async function getUser(req, res) {
    try{
        // let payload=jwt.verify(token,require('../../secrets').JWT_KEY);
        let id=req.id;
        let user=await userModel.findById(id);
        if(user)
        {
            return res.json(user);
        }
        else{
            return res.json({
                message:"User not found!"   
            })
        }
    }catch(err){
        return res.status(501).json({
            message:err.message
        })
    }
    }
module.exports.updateUser=async function updateUser(req, res) {
        try{
            let id=req.params.id;
            let user=await userModel.findById(id);
            let dataToBeUpdated=req.body;
            if(user)
            { let keys=[];
                for(let key in dataToBeUpdated)
                {
                    keys.push(key);//*keys array mein jo cheezein humein update karni hain uski key store ho jaengi
                    //*fir hum keys array ko use karke wo hi key ki values ko update kar denge user object ke.
                }
                for(let i=0; i<keys.length;i++)
                {
                    user[keys[i]]=dataToBeUpdated[keys[i]];
                }
                const  updatedUser=await user.save();
                return res.json({
                    message:" Data updated successfully! ",
                    data: updatedUser
                })
            }
            else{
                return res.json({
                    message:" User not found!"
                    
                }) 
            }}catch(err){

                return res.status(501).json({
                    message:err.message
                })
            }
    }
module.exports.deleteUser=async function deleteUser(req, res) {
        try{let id=req.params.id;
            let user=await userModel.findByIdAndDelete(id);
            if(!user)
            {
                return res.json({
                    message:"User not found!"
                })
            }
            else{
                return res.json({
                    message:"User deleted successfully!",
                    data: user
                })
            }}catch(err){
                return res.status(501).json({
                    message:err.message
                })
            }
    }
module.exports.getAllUser =async function getAllUser(req, res) {
    try{let users=await userModel.find();//it will give us all the users that are stored in our DB.
        if(users)
        {
            return res.json({
                message:"User retrieved successfully! ",
                data:users
            });
        }
        else{
            return res.json({
                message:"No users to show!"
            });
        }}catch(err){
            return res.status(501).json({
                message:err.message
            })
        }
    
}    
    
    // module.exports.setCookies=function setCookies(req, res) {
    //     // res.setHeader('Set-Cookie','isLoggedIn=true');//*Initial way to set cookies
    //     //*Setting cookie using cookie-parser Library
    //     res.cookie('isLoggedIn',true,{maxAge:24*60*60*1000,secure:true,httpOnly:true});//?secure-->https ke liye, httponly-->jisse hum browser se apni cookie na dekh sakein
    //     res.send('Cookies sent successfully!');
    // }
    // module.exports.getCookies=function getCookies(req, res) {
    //     let cookies = req.cookies;
    //     console.log(cookies);
    //     res.send('Cookies received successfully');
    // }