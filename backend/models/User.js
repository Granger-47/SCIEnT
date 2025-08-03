import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  type: {
    type: String,
    required: true,
    enum: ['Admin', 'Student', 'Professor'],
    default: 'Student'
  },
  bio: {
    type: String,
    default: ''
  },
  joinedProjects: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  }]
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);

export default User;