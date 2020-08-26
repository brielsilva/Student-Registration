const Alunos = require('../models/Alunos');
const Picture = require('../models/Picture');


module.exports = {
    async get(req,res){
        const alunos = await Alunos.findAll({
            attributes: ["id","name","email","birthday"],
            order: [['id','DESC'],[Picture,'id','DESC']],
            include:{
                model: Picture,
                attributes: ['filename','url']
            }

        });
        res.json(alunos);
    },

    async store(req,res){
        try{
            const {name,email,birthday,avatar} = req.body;
            const aluno = await Alunos.create({name,email,birthday,avatar});

            res.json(aluno);
        }
        catch(err){
            res.status(401).json(err);
        }
    },

    async delete(req,res){
        try{
            const {email} = req.body;
            const aluno = await Alunos.findOne({where : {email}});
            if(!aluno){
                return res.status(401).json({
                    Erros: 'Aluno não existe'
                })
            }
            await aluno.destroy();
            return res.json({Errors:'Deletadooooo'});
        }
        catch(err){
            res.status(401).json(err);
        }
    },

    async update(req,res){
        try{
            const {id} = req.params;
            if(!id){
                return res.status(401).json({
                    Erros: 'Id não enviado'
                })
            }
            const aluno = await Alunos.findByPk(id);
            if(!aluno){
                return res.status(401).json({
                    Erros: 'Aluno não existe'
                })
            }
            const {name,email,birthday,avatar} = req.body;
            aluno.name = name;
            aluno.email = email;
            aluno.birthday = birthday;
            aluno.avatar = avatar;

            return res.json(aluno);

        }
        catch(err){
            res.status(401).json(err);
        }
    },

    async show(req,res){
        try{
            const {id} = req.params;
            if(!id){
                return res.status(401).json({
                    Erros: 'Id não enviado'
                })
            }
            const aluno = await Alunos.findByPk(id,{
                attributes: ['id','name','birthday'],
                order: [['id','DESC'],[Picture,'id','DESC']],
                include:{
                    model: Picture,
                    attributes: ['filename','url']
                }
            });
            if(!aluno){
                return res.status(401).json({
                    Erros: 'Aluno não existe'
                })
            }
            return res.json(aluno);
        }
        catch(err){
            res.status(401).json(err);
        }
    }
}