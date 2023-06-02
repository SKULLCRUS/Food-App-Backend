const express = require('express');
const app = express();
app.listen(3000,()=>{console.log('Server listening on port 3000')});
app.use(express.json());
let users=[
    {
    'id': 1,
    'name': 'Rohan',
},
{
    'id': 2,
    'name': 'Ayush',
},
{
    'id': 3,
    'name': 'Ikshan',
},
];

//Mounting has been implemented
//? Mini App
const userRouter=express.Router();
app.use("/user", userRouter);


userRouter
.route('/')
.get(getUser)
.post(postUser)
.patch(updateUser)
.delete(deleteUser);

userRouter.route('/:id')
.get(getUserById);



function getUser(req,res){
    res.json({
        message:"Data received Successfully! ",
        users:users
    })
}
function postUser(req,res){
    users=req.body;
    res.json({message:"Data posted Successfully! "})
}

function updateUser(req,res){
    let dataToBeUpdated=req.body;
    for(key in dataToBeUpdated){
        users[key] = dataToBeUpdated[key];
    }
    res.json({
        message: "Data updated successfully! "

    })
}
function deleteUser(req, res){
    users={}
    res.json({message: "Data deleted successfully! "})
}
function getUserById(req, res){
// console.log (req.params. id) ;
let paramId=req.params.id;
let obj={};
for (let i=0;i<users. length; i++){
if (users [i]['id']==paramId){
obj=users[i];
}}
res. json ({
message: "req received",
data: obj});}