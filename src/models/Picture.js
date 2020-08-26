import {Model, DataTypes} from 'sequelize';
import appConfig from '../config/appConfig';

class Picture extends Model{
   static init(sequelize){
       super.init({
            originalName:{
                type : DataTypes.STRING,
                defaultValue: '',
                validate:{
                    notEmpty:{
                        msg: 'Campo não pode ficar vazio'
                    }
                }
            },
            filename:{
                type: DataTypes.STRING,
                validate:{
                    notEmpty:{
                        msg: 'Campo não pode ficar vazio'
                    }
                }
            },
            url:{
                type: DataTypes.VIRTUAL,
                get(){
                    return `${appConfig.url}/images/${this.getDataValue('filename')}`
                }
            }
       },{
           sequelize,
           tableName: 'fotos',
           
       })
   }
   static associate(models){
       this.belongsTo(models,{foreignKey: 'aluno_id'});
   }
}

module.exports = Picture;

export default Picture;
