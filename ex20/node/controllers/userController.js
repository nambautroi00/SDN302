const bcrypt = require("bcrypt");
const saltRounds = 10;

// In-memory user storage (for demo purposes)
const users = [];

exports.signup = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }

    const existingUser = users.find((u) => u.username === username);
    if (existingUser) {
      return res.status(409).json({ message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    users.push({ username, password: hashedPassword });

    res.cookie("username", username, {
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      httpOnly: true,
    });

    res.status(201).json({ message: "Sign up successful", username });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }

    const user = users.find((u) => u.username === username);
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    res.cookie("username", username, {
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      httpOnly: true,
    });

    res.status(200).json({ message: "Login successful", username });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.logout = (req, res) => {
  res.clearCookie("username");
  res.status(200).json({ message: "Logged out successfully" });
};