import { Request, Response } from 'express';

const error404 = (req : Request, res: Response, next: () => void) => {
    res.status(404).render('404', {pageTitle: '404', path : undefined});
}

const ErrorController = {
    error404
}

export default ErrorController;