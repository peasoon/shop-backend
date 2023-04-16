import express from 'express'
import { getAllProducts, getProductById } from './controllers/ProductsController.js';
export const router = express.Router();

// Home page route.
router.get('/products', getAllProducts)

// About page route.
router.get('/products/:slug', getProductById)

