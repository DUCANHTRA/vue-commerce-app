import jwt from 'jsonwebtoken';
import User from '../models/User.js';

//Protect routes middleware
export const protect = async (req, res, next) => {
    let token;

    //1️⃣ Check if token exists in header
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ){
        try {
            //Get token from header
            token = req.headers.authorization.split(' ')[1];

            //// 2️⃣ Decode and Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            //3️⃣ Attach user to request object
            req.user = await User.findById(decoded.id).select('-password');

            //4️⃣ Continue to next middleware or route handler
            next();
        }
        catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

      // 5️⃣ No token found
    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

export const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Forbidden: Admin access required' });
  }
};