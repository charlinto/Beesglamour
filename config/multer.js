const multer =  require('multer');
const path = require('path');


module.exports = multer({
    storage:multer.diskStorage({}),
    fileFilter: (req, file, cb) =>{
        //getting file original name
        let ext = path.extname(file.originalname)
        //file validation
        if(ext !== ".jpg" && ext !== ".png" && ext !== ".jpeg"){
            cb(new Error('File type not supported'), false)
            return
        }
        cb(null, true)
    }
})