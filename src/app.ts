import * as http from 'http';

import express,{ Request, Response } from 'express';

const app = express();


app.use('/', (req: Request, res: Response, next: () => void) => {
    console.log("First Middleware");
    next();
});

app.use('/', (req: Request, res: Response, next: () => void) => {
    console.log("Second Middleware");
    res.send('<h1>One Response</h1>');
});

app.listen(3000);