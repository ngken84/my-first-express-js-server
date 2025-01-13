import express from 'express';

import ProductsController from '../controllers/product';

const router = express.Router();

router.get('/', ProductsController.getProducts);

export default router;