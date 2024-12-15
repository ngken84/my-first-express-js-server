import express, { Request, Response} from 'express';
import path from 'path';

import rootDir from '../helper/path';
import { products } from './admin';

const router = express.Router();

router.get('/', (req: Request, res: Response, next: () => void) => {
    console.log(products);
    res.sendFile(path.join(rootDir, "views","shop.html"));
});

export default router;