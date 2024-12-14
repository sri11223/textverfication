const multer = require('multer');
const path = require('path');
const pdf = require('pdf-parse');  // Library to extract text from PDFs
const fs = require('fs');

// Set up multer storage
const uploadsDir = path.join(__dirname, 'uploads');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Endpoint to handle PDF upload and text extraction
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded.' });
  }

  const filePath = path.join(__dirname, 'uploads', req.file.filename);

  // Read the uploaded PDF file and extract text
  fs.readFile(filePath, (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error reading the file.' });
    }

    pdf(data).then((pdfData) => {
      const extractedText = pdfData.text;

      // Send the extracted text for grammar checking (assuming you have an API)
      checkGrammar(extractedText)
        .then((grammarResponse) => {
          res.json(grammarResponse);  // Return grammar check results
        })
        .catch((err) => {
          res.status(500).json({ message: 'Error in grammar checking.', error: err });
        });
    });
  });
});

// Example function to call your grammar checking API
const checkGrammar = (text) => {
  // Replace with the actual API call to your grammar-checking service
  return new Promise((resolve, reject) => {
    // Example: make API request to your grammar-checking service
    fetch('https://your-grammar-api.com/check', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};
