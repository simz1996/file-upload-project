const express = require('express');
const multer = require('multer');
const s3 = require('../config/awsConfig');
const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
});

router.post('/', upload.single('file'), (req, res) => {
  const file = req.file;

  // Define parameters for S3 upload
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: `${Date.now()}_${file.originalname}`, // Unique file name
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  // Upload the file to S3
  s3.upload(params, (error, data) => {
    if (error) {
      return res.status(500).json({ message: 'Upload failed', error });
    }
    return res.status(200).json({ message: 'File uploaded successfully', data });
  });
});

module.exports = router;
