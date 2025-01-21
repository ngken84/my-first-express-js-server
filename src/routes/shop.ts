import express from 'express';

import ShopController from '../controllers/shop';

const router = express.Router();

router.get('/', ShopController.getShopIndex);

router.get('/products', ShopController.getProductList);

router.get('/product/:productId', ShopController.getProduct);

router.get('/cart', ShopController.getCart);

router.post('/cart', ShopController.postCart);

router.get('/orders', ShopController.getOrders);

router.get('/checkout', ShopController.getCart);

router.post('/removefromcart', ShopController.postRemoveFromCart);

export default router;