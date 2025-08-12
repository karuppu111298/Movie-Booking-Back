const multer = require('multer');
const path = require('path');

// Set up Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');  // Define the directory for file storage
  },
  filename: (req, file, cb) => {
    // Ensure a unique filename for each uploaded file
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Create the multer upload instance with file size and file type restrictions
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },  // Max file size 5MB
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files are allowed'), false);
    }
    cb(null, true);  // Allow the file
  },
});

module.exports = upload;
