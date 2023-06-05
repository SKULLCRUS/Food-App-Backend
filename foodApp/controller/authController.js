const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
//Function for Auth Routes
// module.exports.getSignup=function getSignup (req, res) {
//     return res.sendFile('../foodPages/signupform.html',{root:__dirname});
// }
module.exports.signup = async function signup(req, res) {
  try {
    let obj = req.body;
    // console.log("Backend",obj);
    let user = await userModel.create(obj);
    if (user) {
      return res.json({
        message: "User signed in Successfully! ",
        data: user,
      });
    } else {
      return res.json({
        message: "error while sign up!",
      });
    }
  } catch (err) {
    return res.status(501).json({
      message: err.message,
    });
  }
};

module.exports.login = async function login(req, res) {
  try {
    let data = req.body;
    if (data.email) {
      let user = await userModel.findOne({ email: data.email });
      if (user) {
        if (data.password == user.password) {
          let token = jwt.sign(
            { payload: user["_id"] },
            require("../../secrets").JWT_KEY
          );
          res.cookie("login", token, { httpOnly: true });
          return res.json({
            message: "User Logged in successfully!",
            data: user,
          });
        } else {
          return res.json({
            message: "Invalid credentials!",
          });
        }
      } else {
        return res.json({
          message: "No user found! ",
        });
      }
    } else {
      return res.json({
        message: "empty data received!",
      });
    }
  } catch (err) {
    return res.status(501).json({
      message: err.message,
    });
  }
};

//isAuthorised function--> To check role of the user i.e whether the user is admin,user,restaurantOwner or Delivery

module.exports.isAuthorised = function isAuthorised(roles) {
  return function (req, res, next) {
    if (roles.includes(req.role) == true) {
      next();
    } else {
      return res.status(401).json({
        message: "Operation not allowed!",
      });
    }
  };
};
module.exports.protectRoute = async function protectRoute(req, res, next) {
  try {
    let token = req.cookies.login;
    if (token) {
      let payload = jwt.verify(token, require("../../secrets").JWT_KEY);
      if (payload) {
        const user = await userModel.findById(payload.payload);
        req.role = user.role;
        req.id = user.id;
        next();
      } else {
        return res.json({
          message: "User not verified!",
        });
      }
    } else {
      //for request from browser
      const client = req.get("User-Agent");
      if (client.includes("Mozilla") == true) {
        return res.redirect("/login");
      } else {
        //for postman
        res.json({
          message: "Please log in again",
        });
      }
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

module.exports.forgetPassword = async function forgetPassword(req, res) {
  let { email } = req.body;
  try {
    const user = await userModel.findOne({ email: email });
    if (user) {
      const resetToken = user.createResetToken(); //*user schema pe ek method bnaya hai jisse hum ek reset token genrate karenge uss particular user ke specific reset route bnane ke liye
      //*making reset password link
      let resetPasswordLink = `${req.protocol}://${req.get(
        "host"
      )}/resetPassword${resetToken}`;
      //! Implement mail posting using Nodemailer.(Send email to the user)
      res.json({
        message: "email sent successfully!",
      });
    } else {
      res.json({
        message: "No user found with that email!",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports.resetPassword = async function resetPassword(req, res) {
  try {
    const token = req.params.token;
    let { password, confirmPassword } = req.body;
    const user = await userModel.findOne({ resetToken: token });
    if (user) {
      user.resetPasswordHandler(password, confirmPassword); //*Reset Password Handler will update user password in DB.
      await user.save();
      res.json({
        message: "Password updated successfully! Please Login again",
      });
    } else {
      res.json({
        message: "User not found!",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports.logout = function logout(req, res) {
  res.cookie("login", " ", { maxAge: 1 }); //*login naam ki cookie ki value empty kardo aur fir 1 milliseconds ke baad uss cookie ko destroy kardo!

  res.json({
    message: "User logged out successfully!",
  });
};
