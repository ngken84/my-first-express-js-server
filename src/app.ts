import * as http from 'http';

import express,{ Request, Response } from 'express';

const app = express();

app.use('/users', (req: Request, res: Response, next: () => void) => {
    res.send('<h1>Users</h1>')
});

app.use('/', (req: Request, res: Response, next: () => void) => {
    res.send('<h1>Home</h1>');
});

app.listen(3000);