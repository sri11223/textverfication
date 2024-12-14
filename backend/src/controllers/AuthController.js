const User = require('../models/usermodel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Login Function
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required.' });
        }

        // Check if the user exists
        const user = await User.findOne({ email });
        console.log("User fetched from DB:", user); // Debugging log
        if (!user) {
            return res.status(400).json({ message: 'User not found.' });
        }

        // Check if the password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }

        // Generate JWT token
        const payload = {
            username: user.username, // Use user.username from the database
            email: user.email,      // Optional: Include email in the payload if needed
        };
        console.log("Payload for JWT:", payload); // Debugging log
        const jwtToken = jwt.sign(payload, 'MY_SECRET_TOKEN', { expiresIn: '1h' });

        // Send the token in a cookie and as a response
        res.cookie('jwtToken', jwtToken, { httpOnly: true, secure: false }); // Set secure: true in production
        res.status(200).json({ message: 'Login successful', jwtToken });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Signup Function
const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Username, email, and password are required.' });
        }

        // Check if the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email is already registered.' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
        });
        console.log("Newly created user:", user); // Debugging log

        // Generate JWT token
        const payload = {
            username: user.username, // Use the username of the newly created user
            email: user.email,       // Optional: Include email in the payload if needed
        };
        console.log("Payload for JWT:", payload); // Debugging log
        const jwtToken = jwt.sign(payload, 'MY_SECRET_TOKEN');

        // Send the token in a cookie and as a response
         res.send({ jwtToken });;
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};



module.exports = { login, signup };
