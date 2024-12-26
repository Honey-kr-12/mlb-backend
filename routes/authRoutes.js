import express from "express";
import {
    signup,login,sendOtp,logout
} from "../controllers/auth.controller.js";

const router = express.Router();
router.post("/signup", signup);
router.post("/login", login);
router.post("/sendOtp", sendOtp);
router.post("/logout", sendOtp);

export default router;