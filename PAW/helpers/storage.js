const multer = require('multer');


const diskStorage = multer.diskStorage({
    destination: (req,res,cb) =>{
        cb(null,'uploads');
    },
    filename: (req,file,cb) => {
        const mimeType = file.mimetype.split('/');
        const  fileType = mimeType[1];
        const fileName = file.originalname + '.' + fileType;
        cb(null,fileName);
    },
});

const fileFilter = (req,res,cb) =>{
    const allowedMineTypes = ['image/png','image/jpeg','image/jpg'];
    allowedMineTypes.includes(file.mimeType) ? cb(null,true) : cb(null,false);
}

const storage = multer({storage: diskStorage, fileFilter: fileFilter}).single('image');

module.exports = storage;