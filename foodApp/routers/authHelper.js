function protectRoute(req, res,next) {
    if(req.cookies.isLoggedIn)
    {next();}
    else{
        return res.json({
            message: 'You are not logged in!'
        });
    }
}
module.exports = protectRoute;