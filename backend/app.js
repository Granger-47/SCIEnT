import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import proffRoutes from './routes/proffRoutes.js';
import studentRoutes from './routes/studentRoutes.js';
import verifyToken from "./utils/verifyToken.js";
import Project from "./models/Project.js";
dotenv.config();
const app = express();

const port = process.env.PORT || 3001;
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to DB");

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to DB", err);
});

app.use('/api/auth', authRoutes);
app.use('/api/proff',proffRoutes);
app.use('/api/student',studentRoutes);
app.get('/api/project/:id',verifyToken,async(req,res)=>{
    try{
      const id = req.params.id
      const project = await Project.findById(id);
      if(!project) return res.status(400).json({success:false, msg:"Project not found"});
      res.status(200).json({success:true, msg:"Project successfully fetched", project});
    } catch(err){
      res.status(500).json({success:false, msg:"Internal server error"});
    }
});
app.get('/api/project', async (req, res) => {
  try {
    const projects = await Project.find().populate('professor');
    res.status(200).json({ success: true, msg: "All projects fetched", projects });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Internal server error" });
  }
});