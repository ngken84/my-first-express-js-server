import * as http from 'http';

import express,{ Request, Response } from 'express';

const app = express();

app.use('/', (req: Request, res: Response) => {
    res.send('<h1>Hello from Express</h1>');
});

app.listen(3000);