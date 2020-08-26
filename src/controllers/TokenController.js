const Users = require('../models/Users');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();


module.exports = {

    async store(req,res){
        const {email = '', password = ''} = req.body;
        if(!email || !password){
            return res.status(401).json({
                Errors: ['Credenciais invalidas']
            })
        }

        const user = await Users.findOne({ where: { email }});
    

        if(!user){
            return res.status(400).json({
                Errors: ['Usuário não existe']
            })
        }
        if(!(await Users.verifyPassword(password,user.password_hash))){
            return res.status(401).json({
                Erros: ['Senha errada']
            })
        }
        const {id} = user;
        const token = jwt.sign({id, email},process.env.TOKEN_SECRET,{
            expiresIn: process.env.TOKEN_TIMELIMIT
        });

        return res.json(token);

    }
}
