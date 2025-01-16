import express from 'express';

import AdminController from '../controllers/admin';

const router = express.Router();

router.get('/add-product', AdminController.getAddProduct);

router.post('/add-product', AdminController.postAddProduct);

router.get('/product-list', AdminController.getAdminProductList);

router.get('/edit-product', AdminController.getEditProduct);

router.post('/delete-product', AdminController.deleteProduct);

export default router;
