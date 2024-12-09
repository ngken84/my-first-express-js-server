import express, { Request, Response} from 'express';

const router = express.Router();

router.use('/', (req: Request, res: Response, next: () => void) => {
    res.send('<h1>Home</h1>');
});

export default router;