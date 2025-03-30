const jwt = require('jsonwebtoken');
require('dotenv').config();

// Function to generate JWT token
const generateToken = (userId, role) => {
    // Create a JWT token with user information (id and role) and a secret key from environment variables
    return jwt.sign({ id: userId, role: role }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Function to verify the token
const verifyToken = (token) => {
    try {
        // Verify the token with the secret key from environment variables
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        // If token verification fails, return null or throw an error
        return null;
    }
};

// Function to decode the token (without verification)
const decodeToken = (token) => {
    return jwt.decode(token);
};

module.exports = {
    generateToken,
    verifyToken,
    decodeToken,
};
