import express from 'express';

import { getAddProduct, postAddProduct } from '../controllers/product';

const router = express.Router();

router.use('/add-product', getAddProduct);

router.post('/product', postAddProduct);

export default router;
