import jwt from 'jsonwebtoken';
import User from '../models/User.js'

const verifyToken = async(req,res,next)=>{
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({success:false, msg: "No token" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ email:decoded.email }).populate('joinedProjects');
        if (!user) {
            return res.status(404).json({ success: false, msg: "User not found" });
        }
        req.user = user;
        next();
      } catch (err) {
        return res.status(403).json({ msg: "Token invalid or expired" });
     }
}

export default verifyToken;