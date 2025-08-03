import mongoose from "mongoose";

const projectMemberSchema = new mongoose.Schema({
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    joinedAt: {
      type: Date,
      default: Date.now
    }
  }, { _id: true });



const projectSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    professor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    members: [projectMemberSchema],
  }, {
    timestamps: true
  });


const Project = mongoose.model('Project', projectSchema);


export default Project;