const express = require('express');
const multer = require('multer');
const uploadRoute = require('./routes/uploadRoute');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/upload', uploadRoute);

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
