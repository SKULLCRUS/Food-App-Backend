const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
app.use(cookieParser());


app.listen(3000,()=>{console.log('Server listening on port 3000')});
app.use(express.json());


const authRouter=require('./routers/authRouter');
app.use("/auth", authRouter);

const userRouter=require('./routers/userRouter');
app.use("/user", userRouter);







