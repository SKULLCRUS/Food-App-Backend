const express = require('express');
const userRouter=express.Router();
const app = express();

const userModel=require('../models/userModel');
const protectRoute = require('./authHelper');
const{getUser,patchUser,deleteUser,getCookies,setCookies} = require('../controller/userController');

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


    

    module.exports =userRouter;