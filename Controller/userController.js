const User = require('../models/user');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cloudinary = require('../cloudinaryConfig');

// Register a new user
const registerUser = async (req, res) => {
  try {

    console.log("User Register Request");
    console.log(req.body);
    const { email, firstName, lastName, password, phoneNumber, addressLine1, addressLine2, profilePictureUrl } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already registered with this email' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phoneNumber,
      addressLine1,
      addressLine2,
      profilePictureUrl,
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully', newUser });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Log in a user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Check if the user is blocked
    if (user.status === 'blocked') {
      return res.status(403).json({ message: 'Account is blocked. Please contact support.' });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    res.json({ message: 'User logged in successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Upload profile picture for a user
const uploadProfilePicture = async (req, res) => {
  try {
    console.log("update user profile request");
    console.log(req.body);
    const userId = req.params.id;

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'user_profile_pictures',
    });

    // Save image URL in the user document
    user.profilePictureUrl = result.secure_url;
    await user.save();

    res.json({ message: 'Profile picture uploaded successfully', profilePictureUrl: result.secure_url });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Update user info
const updateUserInfo = async (req, res) => {
  try {
    console.log("update user profile request");
    console.log(req.body);
    
    const userId = req.params.id;
    
    // Validate the userId
    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({ message: 'Invalid user ID format' });
    }

    // Find the user and update
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: req.body },
      { new: true, runValidators: true }
    ).lean();

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      message: 'User information updated successfully',
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = { registerUser, loginUser, uploadProfilePicture, updateUserInfo };
