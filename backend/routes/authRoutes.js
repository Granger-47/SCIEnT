import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();



router.post('/signup',async (req,res)=>{
    const { name, email, password, type } = req.body;
    try{
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({ success:false, msg:"User already exists"});
        }

        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = User({email,name, password:hashedPassword, type});
        await newUser.save();
        res.status(200).json({success:true, msg:"Successfully created user"});
    } catch(err){
        return res.status(500).json({ success:false, msg:"Internal server error", error: err});
    }
});

router.post('/login',async (req,res)=>{
    const { email, pass } = req.body;
    try {
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({ success:false, msg:"Invalid username or password"});
        }
        const validPass = await bcrypt.compare(pass, user.password);
        if(!validPass){
            return res.status(400).json({ success:false, msg:"Invalid username or password"});
        }
        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1d' }); 
        res.status(200).json({ success: true, token });
    } catch(err){
        return res.status(500).json({ success:false, msg:"Internal server error", error: err});
    }
});


router.get('/verify', async(req,res)=>{
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({success:false, msg: "No token" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ email:decoded.email });
        res.json({ success: true, user, password:undefined });
      } catch (err) {
        return res.status(403).json({ msg: "Token invalid or expired" });
      }
})


export default router;