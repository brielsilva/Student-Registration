const Alunos = require('../models/Alunos');    

module.exports = {
    async store(req,res){
        const {name,email,birthday,avatar} = req.body;
        
        const user = await Alunos.create({name,email,birthday,avatar});
        
        return res.json(user);
    },

    async get(req,res){
        const users = await Alunos.findAll();

        return res.json(users);
    }
}