const multer = require("multer");

const ExpressError = require("../utils/ExpressError");
const { storage } = require("../config/cloudinary");

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter(req, file, callback) {
        if (!["image/jpeg", "image/png", "image/webp"].includes(file.mimetype)) {
            return callback(new ExpressError(400, "Please upload a JPG, PNG, or WebP image."));
        }
        callback(null, true);
    },
});

module.exports = upload;
