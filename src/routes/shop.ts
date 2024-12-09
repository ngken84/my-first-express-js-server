import express, { Request, Response} from 'express';
import path from 'path';

const router = express.Router();

router.get('/', (req: Request, res: Response, next: () => void) => {
    res.sendFile(path.join(__dirname, "../", "views","shop.html"));
});

export default router;