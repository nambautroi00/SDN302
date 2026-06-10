const jwt = require("jsonwebtoken");
const User = require("../models/User");

const generateToken = (user) => {
  return jwt.sign(
    { _id: user._id, username: user.username },
    "mysecretkey",
    { expiresIn: "1d" }
  );
};

exports.signup = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: "Username already exists" });
    }

    const newUser = new User({ username });
    await User.register(newUser, password);

    const token = generateToken(newUser);

    res.status(201).json({
      message: "Sign up successful",
      username,
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message || "Internal server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }

    // Use passport-local-mongoose static authenticate method
    User.authenticate()(username, password, (err, user, passwordErr) => {
      if (err) {
        return res.status(500).json({ message: "Internal server error" });
      }
      if (passwordErr || !user) {
        return res.status(401).json({ message: "Invalid username or password" });
      }

      const token = generateToken(user);
      return res.status(200).json({
        message: "Login successful",
        username: user.username,
        token,
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.logout = (req, res) => {
  // JWT is stateless - client just discards the token
  res.status(200).json({ message: "Logged out successfully" });
};