import express from 'express';

import ProductsController from '../controllers/product';
import ShopController from '../controllers/shop';

const router = express.Router();

router.get('/', ShopController.getShopIndex);

router.get('/products', ProductsController.getProducts);

router.get('/cart', ShopController.getCart);

export default router;