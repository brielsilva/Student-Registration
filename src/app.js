import express from 'express';
import home from './routes/home'
import users from './routes/users';
import token from './routes/token';
import aluno from './routes/alunos';
import picture from './routes/picture';
import dotenv from 'dotenv';
import {resolve} from 'path';
dotenv.config();
require('./database');


class App {
    constructor(){
        this.app = express();
        this.middlaware();
        this.routes();
        this.init(3000);
    }
    init(PORT){
        this.app.listen(PORT,() => console.log(PORT));
    }

    middlaware(){
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:true}));
        this.app.use(express.static(resolve(__dirname,'..','uploads')));

    }

    routes(){
        this.app.use('/',home);
        this.app.use('/users/',users);
        this.app.use('/tokens/',token);
        this.app.use('/alunos/',aluno);
        this.app.use('/picture/',picture);
    }
}

export default new App().app;