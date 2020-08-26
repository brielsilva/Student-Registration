import {Model, DataTypes} from 'sequelize';
import bcryptjs from 'bcryptjs';

class Users extends Model{
    static init(sequelize){
        super.init({
            username: {
                type: DataTypes.STRING,
                defaultValue: '',
                unique:{
                    msg: 'Username já existe'
                }, // Implementar
                validate:{
                    len:{
                        args: [3,255],
                        msg: 'Username tem que ter mais de 3 caracteres ou menos que 255'
                    }
                }
            },
            email: {
                type: DataTypes.STRING,
                defaultValue: '',
                unique:{
                    msg:'Email já existe'
                },
                validate: {
                    isEmail:{
                        msg: 'Email invalido'
                    }
                    
                }
            },
            password:{
                type: DataTypes.VIRTUAL,
                defaultValue: '',
                validate:{
                    len: {
                        args:[5,255],
                        msg: 'Senha entre 5 e 255 caracteres'
                    }
                }
            },
            password_hash: {
                type: DataTypes.STRING
            },
            
            
        },{
            sequelize
        }),
        
        this.addHook('beforeSave',async user =>{
            if(user.password){
                user.password_hash = await bcryptjs.hash(user.password, 8);
            }

        })

        return this;
    }
    static verifyPassword(password,password_hash){
       return  bcryptjs.compare(password,password_hash);
    }

}

module.exports = Users;
export default Users