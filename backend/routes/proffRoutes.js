import express from 'express';
import User from '../models/User.js';
import Project from '../models/Project.js';
import dotenv from 'dotenv';
import verifyToken from '../utils/verifyToken.js'
dotenv.config();

const router = express.Router();


router.get('/',verifyToken,async (req,res)=>{
    const user = req.user;
    if(!user){
        return res.status(400).json({success:false,msg:"Couldn't find user"});
    }
    try{
        res.status(200).json({success:true, msg:"Fetched user", user});
    } catch(err){
        return res.status(500).json({success:false,msg:"Internal server error"});
    }
})

router.post('/',verifyToken,async (req,res)=>{
    const user = req.user;
    if(!user){
        return res.status(400).json({success:false, msg:"Couldn't find user"});
    }
    if (user.type !== 'Professor') {
        return res.status(403).json({ success: false, msg: "Only professors can create projects" });
    }
    try{
        const { name, description } = req.body;
        if (!name || name.trim() === '') {
            return res.status(400).json({ success: false, msg: "Project name is required" });
        }
        if (!description || description.trim() === '') {
            return res.status(400).json({ success: false, msg: "Project description is required" });
        }
        const newProject = new Project({
            name: name.trim(),
            description: description.trim(),
            professor: user._id,
            members: []
        });

        const savedProject = await newProject.save();

        await User.findByIdAndUpdate(
            user._id,
            { $addToSet: { joinedProjects: savedProject._id } }
        );

        res.status(201).json({
            success: true,
            msg: "Project created successfully",
            project: savedProject
        });
        
    } catch(err){
        return res.status(500).json({success:false,msg:"Internal server error"});
    }

})


export default router;
