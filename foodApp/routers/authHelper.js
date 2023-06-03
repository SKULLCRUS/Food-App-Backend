const jwt=require('jsonwebtoken');
function protectRoute(req, res,next) {
    if(req.cookies.login){
        let isVerified=jwt.verify(req.cookies.login,require('../../secrets').JWT_KEY);
        if(isVerified)
        {
       next();
        }
        else{
            return res.json({
                message: 'User not verified!'
            });
        }
    }
    // {next();}
    else{
        return res.json({
            message: 'You are not logged in!'
        });
    }
}
module.exports = protectRoute;