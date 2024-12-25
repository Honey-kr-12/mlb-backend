import express from "express";
import {
    createProduct,
    getData
} from "../controllers/product.controller.js";

const router = express.Router();
router.post('/createProduct',createProduct)
router.get('/getData', getData)

export default router;
