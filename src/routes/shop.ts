import express, { Request, Response} from 'express';
import path from 'path';

import rootDir from '../helper/path';

const router = express.Router();

router.get('/', (req: Request, res: Response, next: () => void) => {
    res.sendFile(path.join(rootDir, "views","shop.html"));
});

export default router;