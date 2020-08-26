const jwt = require('jsonwebtoken');
const Users = require('../models/Users');

export default async (req,res,next) => {
    const {authorization} = req.headers;
    if(!authorization){
        return res.status(401).json({
            Errors: ['Login required'],
        })
    }

    
    const [,token] = authorization.split(' ');
    console.log(token);
    try{
        const dados = jwt.verify(token, process.env.TOKEN_SECRET);
        const {id,email,} = dados;
        
        const user = await Users.findOne({
            where: {
                id,
                email 
            }
        })
        if(!user){ 
            return res.status(401).json({
                Errors: ['Usuário invalido']
            })
        }
        
        req.userID = id;
        req.userEmail = email;
        next();
    }
    catch(e){
        return res.status(401).json({
            Errors: ['Token Invalido ou Expirado, logue novamente']
        })
    }

};

