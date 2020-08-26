const Users = require('../models/Users');


module.exports = {
    async store(req,res){
        try {
        const {username,email,password} = req.body;

        const user =  await Users.create({username,email,password});
        const {id} = user;
        return res.json({id,username,email});
    }
    catch(e){
        res.status(400).json({
            errors: e.errors.map(err => err.message)
        });
    }
    },

    async get(req,res){
        try{
            const users = await Users.findAll({attributes : ['id','username','email']});
            return res.json(users);
        }   
        catch(error){
            res.status(400).json(error);
        }
    },

    async update(req,res){
        try{

            const user = await Users.findByPk(req.userID);
            if(!user){
                return res.status(400).json({
                    errors: 'User não existe'
                });
            }
            const {username,email,password} = req.body;
            const newUser = await user.update({username,email,password});
            const {id:newID,username:newUsername,email:newEmail} = newUser;
            return res.json({newID,newUsername,newEmail});

        }
        catch(error){
            return res.status(400).json({
                Errors: error.errors.map(err => err.message)
            });
        }
    },

    async show(req,res){
        try{

            const user = await Users.findByPk(req.params.id);
            if(!user){
                return res.status(400).json({
                    Errors: ['Usuário não existe']
                })
            }
            const {id,username,email} = user;
            return res.json({id,username,email});
        }
        catch(e){
            return res.status(400).json(e);
        }
    },

    async delete(req,res){
        try{

            const user = await Users.findByPk(req.userID);

            

            if(!user){
                return res.status(400).json({
                    Errors: ['Usuário não existe']
                })
            }
            
    

            await user.destroy();

            return res.json({
                Sucess: 'Usuário deletado'
            });
        }
        catch(e){
            return res.status(400).json(e);
        }
    }
}