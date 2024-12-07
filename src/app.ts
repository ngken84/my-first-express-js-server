import express,{ Request, Response } from 'express';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.use('/add-product', (req: Request, res: Response, next: () => void) => {
    res.send('<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>')
});

app.post('/product', (req: Request, res: Response, next: () => void) => {
    const {title} = req.body;
    console.log(title);
    res.redirect('/');
});

app.use('/', (req: Request, res: Response, next: () => void) => {
    res.send('<h1>Home</h1>');
});

app.listen(3000);