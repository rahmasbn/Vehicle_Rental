const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public");
    },
    filename: (req, file, cb) => {
        const format = `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`;
        cb(null, format);
    },
});

const uploads = multer({ 
    storage,
    fileFilter: (req, file, cb) => {
        if (
            file.mimetype == "image/png" || 
            file.mimetype == "image/jpg" || 
            file.mimetype == "image/jpeg"
        ) {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error("Only .png, .jpg and .jpeg format allowed!"))
        }
    },
    limits: { fileSize: 2097152 }     //2Mb
}).single("image");

const multerHandler = (req, res, next) => {
    uploads(req, res, (err) => {
        if(err && err.code === "LIMIT_FILE_SIZE") {
           return res.status(500).json({msg: "File size melebihi limit"});
        } else if (err) {
            return res.status(500).json({msg: "Only .png, .jpg and .jpeg format allowed!"});
        }
        next();
    });
};


module.exports = multerHandler;
// module.exports = uploads;