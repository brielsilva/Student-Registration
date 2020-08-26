import { Router } from 'express';
const userController = require('../controllers/UserController');
import validationToken from '../middleware/validation';

const routers = new Router();

routers.get('/',userController.get);
routers.get('/:id',userController.show);

routers.post('/',userController.store);
routers.put('/',validationToken,userController.update); 
routers.delete('/',validationToken,userController.delete); 

export default routers;