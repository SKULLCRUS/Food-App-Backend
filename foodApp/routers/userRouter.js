const express = require('express');
const userRouter=express.Router();
const app = express();

// const userModel=require('../models/userModel');
// const protectRoute = require('./authHelper');
const{getUser,getAllUser,deleteUser,updateUser} = require('../controller/userController');
const{signup,login,isAuthorised,protectRoute,forgetPassword,resetPassword,logout} = require('../controller/authController');

// const { functions, functionsIn } = require('lodash');



//User Operations
userRouter
.route('/:id')//*for a specific user.
.patch(updateUser)
.delete(deleteUser);

//Authentication functions for users
userRouter
.route('/signup')
.post(signup);

userRouter
.route('/login')
.post(login);

userRouter
.route('/forgetPassword')
.post(forgetPassword);

userRouter
.route('/resetPassword/:token')
.post(resetPassword);

userRouter
.route('/logout')
.get(logout);

//Profile page
userRouter.use(protectRoute);
userRouter
.route('/userProfile')
.get(getUser)

 

//Admin Specific functions
userRouter.use(isAuthorised(['admin']));
userRouter
.route('/')
.get(getAllUser)
module.exports =userRouter;