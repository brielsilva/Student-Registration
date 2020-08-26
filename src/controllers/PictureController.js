import multer from 'multer';
import multerConfig from '../config/moltenConfig';
const upload = multer(multerConfig).single('file');

const Picture = require('../models/Picture');


module.exports = {
    async index(req,res){
        res.json(req);
    },

    store(req,res){
        return upload(req,res, async (err)=>{
            if(err){
                return res.status(400).json({
                    Error: [err]
                })
            }
            try{
            const {originalname:originalName,filename} = req.file
            const {aluno_id} = req.body;
            const picture = await Picture.create({originalName,filename,aluno_id},{fields:['originalName','filename','aluno_id']});
        
            res.json(picture);
            }
            catch(e){
                return res.status(401).json({
                    Errors: ['Id não existente',e]
                })
            }
        })
        
    }
}