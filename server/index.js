const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./Routes/auth.js');
const contentRoutes = require('./Routes/content.js');
const Connection = require('./database/db.js');
const path = require('path');
const multer = require('multer');
const bodyParser = require('body-parser');
const generateCertificate = require('./certificateGenerator.js');

dotenv.config();
const PORT = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

Connection();

// Configure multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });


app.post("/api/upload", upload.single('file'), function (req, res)  {
    const file = req.file;
    if (!file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    res.status(200).json(file.filename);
});

app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.get('/', (req, res) => {
    res.json('Online Virtual Class Room System');
})

const userData = {
    name: 'Rohitash Singh',
    course: 'Introduction To Web Development',
    completionDate: 'August 24, 2023',
};

// generateCertificate(userData)
//   .then(() => console.log('Certificate generated successfully'))
//   .catch((error) => console.error('Error generating certificate:', error));


app.use('/api/auth', authRoutes)
app.use('/api/content', contentRoutes)

app.listen(PORT, (err, data) => {
    console.log(`Server running on port ${PORT}`);
})