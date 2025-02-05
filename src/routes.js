import { Router } from 'express';
import homeController from './controllers/homeController.js';
import movieContorller from './controllers/movieController.js';
import castController from './controllers/castController.js';

const routes = Router();

routes.use(homeController);
routes.use('/movies', movieContorller);
routes.use('/casts', castController);

routes.get('*', (req, res) => {
    res.render('404');
});


export default routes;