import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  // Common fields
  name: { type: String },
  email: { type: String, unique: false }, // Twitter users might not have emails
  password: { type: String },

  // Twitter-specific fields
  twitterId: { type: String, unique: true, sparse: true },
  username: { type: String },
  displayName: { type: String },
  profileImage: { type: String },
}, { timestamps: true });


userSchema.methods.isPasswordCorrect = async function (inputPassword) {
  return await bcrypt.compare(inputPassword, this.password);
};


userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.generateAccessToken = function () {
  return jwt.sign({
    _id: this._id,
    name: this.name,
    email: this.email,
  },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES
    }
  )
}
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign({
    _id: this._id,
    name: this.name,
    email: this.email,
  },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES
    }
  )
}

export default mongoose.model('User', userSchema);
