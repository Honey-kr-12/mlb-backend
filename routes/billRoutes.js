import express from "express";
import {
    getBill
} from "../controllers/bill.controller.js";

const router = express.Router();
router.get('/getBill/:id', getBill)

export default router;
