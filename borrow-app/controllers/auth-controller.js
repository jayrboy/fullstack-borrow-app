import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { User } from '../models.js';

export const generateToken = async (req, res) => {
  try {
    // Generate token
    const payload = {};

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1d' },
      (error, token) => {
        if (error) throw error;
        res.status(200).json({ token });
      }
    );
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

export const register = async (req, res) => {
  try {
    let { username, password, name } = req.body;
    let user = await User.findOne({ username });

    if (user) {
      return res
        .status(400)
        .json({ status: 400, message: 'User Already Exists!' });
    } else {
      // encrypt
      const salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(password, salt);

      user = new User({
        username,
        password,
        name,
      });

      await user.save();
      res.status(201).json({ status: 201, message: 'Register Successfully' });
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: 'Unexpected server error',
      error: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    let username = req.body.username || '';
    let password = req.body.password || '';

    // Check if the user exists
    let user = await User.findOneAndUpdate(
      { username },
      { useFindAndModify: false }
    );
    if (!user) {
      return res
        .status(404)
        .json({ status: 404, message: 'User Not Found!!!' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ status: 400, message: 'Password Invalid!!!' });
    }

    // Generate token
    const payload = {
      username: user.username,
      name: user.name,
      money: user.money,
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1d' },
      (error, token) => {
        if (error) throw error;
        res.json({ token, payload });
      }
    );
  } catch (error) {
    console.log({ message: error });
    res.status(500).json({ status: 500, message: 'Internal Server Error' });
  }
};
