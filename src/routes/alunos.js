import {Router} from 'express'
import AlunoController from '../controllers/AlunoController';
import validation from '../middleware/validation';


const routers = new Router();

routers.delete('/',validation,AlunoController.delete);
routers.get('/',AlunoController.get);
routers.post('/',validation,AlunoController.store);
routers.put('/:id',validation,AlunoController.update);
routers.get('/:id',AlunoController.show);




export default routers