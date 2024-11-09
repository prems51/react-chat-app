import { Router } from "express";
import {
    login,
    signup,
    getUserInfo,
    updateProfile,
    addProfileImage,
    removeProfileImage,
    logout,
} from "../controllers/AuthController.js";

import { verifyToken } from "../middlewares/AuthMiddleware.js";
import multer from "multer";



const authRoutes = Router();

const upload = multer({ dest: "uploads/profiles" });

authRoutes.post("/signup", signup);
authRoutes.post("/login", login);
authRoutes.get("/user-info", verifyToken, getUserInfo);
authRoutes.post("/update-profile", verifyToken, updateProfile);
authRoutes.post("/add-profile-image", upload.single("profile-image"), verifyToken, addProfileImage);
authRoutes.delete("/remove-profile-image", verifyToken, removeProfileImage);
authRoutes.post('/logout', logout)

export default authRoutes;  