// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,  // Normalize to lowercase
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.index({ username: 1 }, { unique: true });
userSchema.index({ email: 1 }, { unique: true });
userSchema.pre('save',async function(){
    console.log('pre-defined',this);
})
module.exports = mongoose.model('User', userSchema);

