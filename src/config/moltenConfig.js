import multer from 'multer'
import {extname,resolve} from 'path';


export default {
    fileFilter: (req,file,cb) => {
        if(file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg'){
            cb(new multer.MulterError('O arquivo precisar se PNG ou JPG'));

        }
        return cb(null,true);
    },
    storage: multer.diskStorage({
        destination: (req,file,cb) =>{
            cb(null,resolve(__dirname,'..','..','uploads','images'))
        },
        filename: (req,file,cb) =>{
            const rand = () =>  Math.floor(Math.random() * 1000);
            cb(null,`${Date.now()}${rand()}${extname(file.originalname)}`)
        }
    })
    
    
}