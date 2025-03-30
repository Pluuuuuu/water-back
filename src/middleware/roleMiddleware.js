const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to check if the user has the correct role
const checkRole = (role) => {
    return async (req, res, next) => {
        const token = req.headers['authorization']?.split(' ')[1]; // Extract token from Authorization header

        if (!token) {
            return res.status(403).json({ error: 'Access denied. No token provided.' });
        }

        try {
            // Verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Find the user based on the token
            const user = await User.findByPk(decoded.id);

            if (!user) {
                return res.status(404).json({ error: 'User not found.' });
            }

            // Check if the user role matches the required role
            if (user.role !== role) {
                return res.status(403).json({ error: 'Access denied. Insufficient role.' });
            }

            // Attach user data to the request object for further use
            req.user = user;

            // Call the next middleware
            next();
        } catch (error) {
            return res.status(400).json({ error: 'Invalid token.' });
        }
    };
};

module.exports = { checkRole };
