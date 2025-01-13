import express from 'express';

import ProductsController from '../controllers/product';

const router = express.Router();

router.get('/add-product', ProductsController.getAddProduct);

router.post('/product', ProductsController.postAddProduct);

router.get('/product-list', ProductsController.getAdminProductList);

export default router;
