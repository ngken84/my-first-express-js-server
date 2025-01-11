import express, { Request, Response} from 'express';
import path from 'path';

import rootDir from '../helper/path';
import ProductsController from '../controllers/product';

const router = express.Router();

router.get('/', ProductsController.getProducts);

export default router;