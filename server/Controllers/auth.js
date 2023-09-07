const bcrypt = require('bcrypt');
const Jwt = require('jsonwebtoken');

const User = require('../Model/users.js');

const loggedInUsers = {}; 

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if email already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "Email already exists" });
    }

    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user with the hashed password
    const newUser = new User({ username, email, password: hashedPassword });
    // console.log(newUser)
    await newUser.save();

    return res.status(200).json({ msg: "User Registered Successfully", success: true });
  } catch (error) {
    console.error(error)
    return res.status(400).json({ msg: "Error while registering user" });
  }
};


const login = async (req, res) => {
  const jwtSecretKey = process.env.JWT_SECRET_KEY;
  try {
    const { email, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ email });

    if (!user) {
      // User not found
      return res.status(401).json({ msg: "Invalid username or password" });
    }

    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {

      // Generate JWT token
      const token = Jwt.sign({ userId: user._id }, jwtSecretKey, { expiresIn: '1h' });

      return res.status(200).json({ token, name: user.username, userId: user._id, msg: "Login successful", success: true });
    } else {
      // Passwords do not match
      return res.status(401).json({ msg: "Invalid username or password" });
    }
  } catch (error) {
    // console.error(error)
    return res.status(500).json({ msg: "Error while logging in" });
  }
};

const logout = (req, res) => {
  res.clearCookie("access_token", {
    sameSite: "none",
    secure: true
  }).status(200).json("User has been logged out Successfully");
};


// Function to print all logged-in users
const printLoggedInUsers = (req, res) => {
  const users = Object.keys(loggedInUsers);
  res.status(200).json(users);
};



module.exports = {
    register,
    login,
    logout,
    printLoggedInUsers
}
