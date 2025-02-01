import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import user from '../Models/user.model.js';
import { generateToken } from '../Utils/generateToken.js';

export const registerUser = async (req, res) => {
    try {
      const { username, email, password } = req.body;
  
      const existingUser = await user.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ error: 'User with this email already exists.' });
      }
      
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = await user.create({
        username,
        email,
        password: hashedPassword,
      });
  
      const token = generateToken(newUser.email);
  
      res.status(201)
        .cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 2 * 60 * 60 * 1000, // 2 hours
        })
        .json({
          username: newUser.username,
          email: newUser.email,
        });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  export const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const existingUser = await user.findOne({ where: { email } });
      if (!existingUser) {
        return res.status(400).json({ error: 'Invalid email or password.' });
      }
  
      const isPasswordValid = await bcrypt.compare(password, existingUser.password);
      if (!isPasswordValid) {
        return res.status(400).json({ error: 'Invalid email or password.' });
      }
  
      const token = generateToken(existingUser.email);
  
      res.status(200)
        .cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 2 * 60 * 60 * 1000, // 2 hours
        })
        .json({
          username: existingUser.username,
          email: existingUser.email,
        });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  