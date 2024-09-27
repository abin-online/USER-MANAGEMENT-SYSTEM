import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";

const tokenSecret = process.env.JWT_SECRET;

const protect = async (req, res, next) => {
    try {
        console.log(req.cookies.jwt)
        let token;
        token = req.cookies.jwt;

        if (token) {
            try {
                const decoded = jwt.verify(token, tokenSecret);
                console.log(decoded);
                req.user = await User.findById(decoded.userId).select('-password');
                next();
            } catch (error) {
                console.error(error);
                res.status(401).json({ message: 'Not authorized, token failed' });
            }
        } else {
            res.status(401).json({ message: 'Not authorized, no token' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const isAdmin = async (req, res, next) => {
    try {
        if (req.user && req.user.isAdmin) {
            next();
        } else {
            res.status(403).json({ message: 'Not authorized, no privilege' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export { protect, isAdmin };
