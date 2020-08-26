

import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import Alunos from '../models/Alunos';
import Users from '../models/Users';
import Fotos from '../models/Picture';
 
const models = [Alunos, Users, Fotos];
 
const connection = new Sequelize(databaseConfig);
 
models.forEach((model) => model.init(connection));

Fotos.associate(Alunos);
Alunos.associate(Fotos);


