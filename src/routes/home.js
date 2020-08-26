import { Router } from 'express';
import indexController from '../controllers/IndexController.js'
const router = new Router();

router.get('/',indexController.get);
router.post('/',indexController.store);


export default router;
