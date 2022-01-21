const multer = require('multer');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'public/images/saison');
    },
    filename: (req, file, callback) => {
        const name = file.originalname
            .split('.')
            .join('_')
            .split('jpg')
            .join('')
            .split('jpeg')
            .join('')
            .split('png')
            .join('');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, `${name}_F2.${extension}`);
    },
});

module.exports = multer({ storage }).single('image');
