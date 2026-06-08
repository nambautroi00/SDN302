exports.isAuthenticated = function (req, res, next) {
  try {
    if (req.session && req.session.username) {
      console.log("authenticated");
      next();
    } else {
      console.log("not authenticated");
      res.status(401).json({
        message: "You are not authenticated. Please login or signup.",
        nextSteps: {
          login: "POST /users/login",
          signup: "POST /users/signup",
        },
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};