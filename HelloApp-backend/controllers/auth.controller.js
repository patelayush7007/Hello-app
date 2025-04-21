import User from '../models/user.model.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import {asyncHandler} from '../utils/asyncHandler.js';

const generateTokens = async (userId) => {
  const user = await User.findById(userId);
  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();
  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });
  return { accessToken, refreshToken };
};

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) throw new ApiError(400, 'All fields are required');

  const existingUser = await User.findOne({ email });
  if (existingUser) throw new ApiError(409, 'User already exists');

  const user = await User.create({ name, email, password });
  const createdUser = await User.findById(user._id).select('-password -refreshToken');

  res.status(201).json(new ApiResponse(201, createdUser, 'User registered successfully'));
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.isPasswordCorrect(password))) throw new ApiError(401, 'Invalid credentials');

  const { accessToken, refreshToken } = await generateTokens(user._id);
  const loggedInUser = await User.findById(user._id).select('-password -refreshToken');

  res.status(200).json(new ApiResponse(200, { user: loggedInUser, accessToken, refreshToken }, 'Login successful'));
});
