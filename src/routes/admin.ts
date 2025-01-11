import express from 'express';

import ProductsController from '../controllers/product';

const router = express.Router();

router.use('/add-product', ProductsController.getAddProduct);

router.post('/product', ProductsController.postAddProduct);

export default router;
