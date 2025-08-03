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
    if (user.type !== 'Student') {
        return res.status(403).json({ success: false, msg: "Only students can join projects" });
    }
    try{
        const { projectId } = req.body;

        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ success: false, msg: "Project not found" });
        }
        

        await Project.findByIdAndUpdate(projectId, {
            $addToSet: { members: user._id }
        });
        await User.findByIdAndUpdate(user._id, {
            $addToSet: { joinedProjects: projectId }
        });
        res.status(201).json({
            success: true,
            msg: "Project joined successfully",
            project
        });
        
    } catch(err){
        return res.status(500).json({success:false,msg:"Internal server error"});
    }

})


export default router;
