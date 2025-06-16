import { Schema, model } from 'mongoose';
import { hash, compare } from 'bcryptjs';
import { isEmail } from 'validator';

const userSchema = new Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters'],
    select: false
  },
  role: {
    type: String,
    enum: ['Customer', 'Admin'],
    default: 'Customer'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  this.password = await hash(this.password, 12);
  next();
});

// Method to compare passwords
userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
  return await compare(candidatePassword, userPassword);
};

const User = model('User', userSchema);

export default User;