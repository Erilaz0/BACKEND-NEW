const multer = require("multer")
const path = require("path")


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname + '../public/uploads')); // Ruta donde se guardarán las imágenes
    },
    filename: function (req, file, cb) {
     const ext = file.originalname.split(".").pop()
     cb(null,`${Date.now()}.${ext}`)
    }
  });
const upload = multer({ storage: storage });
  

module.exports = upload