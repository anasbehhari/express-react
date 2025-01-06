import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../../config/config";
import User from "../../models/user.model";

const SALT_ROUNDS = 10;
const COOKIE_MAX_AGE = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

interface CreateUserRequest {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
}

export async function createUser(req: Request, res: Response): Promise<void> {
  try {
    const { firstName, lastName, userName, email, password } =
      req.body as CreateUserRequest;

    // Validate required fields
    if (!firstName || !lastName || !userName || !email || !password) {
      res.status(400).json({
        success: false,
        message: "All fields are required",
      });
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
      return;
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [
        { email: email.toLowerCase() },
        { userName: userName.toLowerCase() },
      ],
    });

    if (existingUser) {
      res.status(400).json({
        success: false,
        message: "User with this email or username already exists",
      });
      return;
    }

    // Validate password strength
    if (password.length < 8) {
      res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long",
      });
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // Create new user
    const user = new User({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      userName: userName.toLowerCase().trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
    });

    // Save user to database
    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        userName: user.userName,
      },
      config.JWT_SECRET,
      { expiresIn: "24h" }
    );

    // Set HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: config.NODE_ENV === "production", // Only use HTTPS in production
      sameSite: "strict",
      maxAge: COOKIE_MAX_AGE,
      path: "/",
    });

    // Return success response (without sending token in body)
    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        userName: user.userName,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred during registration",
      error: config.NODE_ENV === "development" ? error : undefined,
    });
  }
}
