const express = require('express');
const userRouter=express.Router();
const app = express();
const userModel=require('../models/userModel');
const protectRoute = require('./authHelper');

// const { functions, functionsIn } = require('lodash');




userRouter
.route('/')
.get(protectRoute,getUser)
.patch(patchUser)
.delete(deleteUser);

userRouter
.route('/getCookies')
.get(getCookies);

userRouter
.route('/setCookies')
.get(setCookies);

//Functions for User routes
async function getUser(req, res) {
    
    let resp=await userModel.find();
    res.json({
        message:" Get functionality is working properly! ",
        data: resp
    })
    }
    async function patchUser(req, res) {
        let dataToBeUpdated=req.body;
    let resp=await userModel.findOneAndUpdate({email:"abc@gmail.com"},dataToBeUpdated);
    res.json({
        message:" Patch functionality is working properly! ",
        data: resp
    })
    }
    async function deleteUser(req, res) {
        let dataToBeDeleted=req.body;
    let resp=await userModel.findOneAndDelete(dataToBeDeleted);
    res.json({
        message:" Delete functionality is working properly! ",
        data: resp
    })
    }
    
    function setCookies(req, res) {
        // res.setHeader('Set-Cookie','isLoggedIn=true');//*Initial way to set cookies
        //*Setting cookie using cookie-parser Library
        res.cookie('isLoggedIn',true,{maxAge:24*60*60*1000,secure:true,httpOnly:true});//?secure-->https ke liye, httponly-->jisse hum browser se apni cookie na dekh sakein
        res.send('Cookies sent successfully!');
    }
    function getCookies(req, res) {
        let cookies = req.cookies;
        console.log(cookies);
        res.send('Cookies received successfully');
    }
    

    module.exports =userRouter;