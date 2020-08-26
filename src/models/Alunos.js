import {Model,DataTypes} from 'sequelize';

class Alunos extends Model{
    static init(sequelize){
        super.init({
            name: {
                type: DataTypes.STRING,
                defaultValue: '',
                validate:{
                    len:{
                        args: [3,255],
                        msg: 'Nome deve ser entre 3 e 255.'
                    }
                }
            },
            email: {
                type:DataTypes.STRING,
                defaultValue: '',
                validate:{
                    isEmail: {
                        msg: 'Email invalido'
                    }
                },
                unique:{
                    msg: 'Email já existe'
                }
            },
            birthday: {
                type: DataTypes.DATE
            },
            avatar: DataTypes.STRING,
        },{
            sequelize
        })
    }
    static associate(models){
        this.hasMany(models,{foreignKey: 'aluno_id'});
    }
}


module.exports = Alunos;
export default Alunos;