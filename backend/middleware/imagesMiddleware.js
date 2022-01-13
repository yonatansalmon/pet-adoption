const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const imagesPath = path.resolve(__dirname, '../images');

cloudinary.config({
  cloud_name: 'dm4rue7fk',
  api_key: '882889117265694',
  api_secret: 'G06uyjrw0LUjpFvQext2l9fe78Q',
});

const cloudinaryConn = (filePath) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(filePath, (error, result) => {
      if (error) reject(error);
      if (result) resolve(result);
    });
  });
};

const uploadToCloudinary = async (req, res, next) => {
  try {
    if (!req.file?.path) {
      req.body.picture = 'https://res.cloudinary.com/dm4rue7fk/image/upload/v1642071195/rgbpyefykzukrhbqgypl.jpg';
    } else {
      const clImage = await cloudinaryConn(req.file.path);
      fs.unlinkSync(req.file.path);
      req.body.picture = clImage.secure_url;
      next();
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, imagesPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

module.exports = { upload, uploadToCloudinary };
