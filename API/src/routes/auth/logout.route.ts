import { Request, Response } from "express";
import config from "../../config/config";

export async function logoutUser(req: Request, res: Response): Promise<void> {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      secure: config.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 0,
      path: "/",
    });

    res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred during logout",
    });
  }
}
