const passport = require("passport");

exports.isAuthenticated = function (req, res, next) {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        message: "You are not authenticated. Please login or signup.",
        nextSteps: {
          login: "POST /users/login",
          signup: "POST /users/signup",
        },
      });
    }
    req.user = user;
    console.log("authenticated");
    next();
  })(req, res, next);
};