import multer from "multer"


const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "E://CodeQuotient/Fullstack/Chai_aur_Backend/public/temp")
        cb(null, "E://IP/Backend/public/temp")
    },
    filename: function(req, file, cb){
        cb(null, file.originalname)
    }
})

export const upload = multer({storage})