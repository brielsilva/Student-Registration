import {Router} from 'express';

import PictureController from '../controllers/PictureController';
import validation from '../middleware/validation';

const routers = new Router();


routers.get('/',PictureController.index);

routers.post('/',validation,PictureController.store);


export default routers;