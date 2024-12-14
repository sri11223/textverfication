const express = require('express');
const multer = require('multer'); // Include the Multer library
const fs = require('fs');
const { exec } = require('child_process');
const axios = require('axios');
const mongoose = require('mongoose');
const app = express();

const upload = multer({ dest: 'uploads/' }); 

// Replace '<your_mongodb_uri>' with your actual connection string
const MONGODB_URI = 'mongodb://localhost:27017/grammarCheck';

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

    const GrammarCheck = require('./models/grammarCheck'); // Import the schema

    app.post('/upload', upload.single('file'), async (req, res) => {
        const filePath = req.file.path;
        const extractedText = await extractTextFromFile(filePath);
    
        try {
            const response = await axios.post('https://api.languagetool.org/v2/check', {
                text: extractedText,
                language: 'en-US'
            });
    
            // Create a new GrammarCheck document
            const grammarCheck = new GrammarCheck({
                filePath,
                extractedText,
                grammarCheckResults: response.data
            });
    
            // Save the document to the database
            await grammarCheck.save();
    
            res.json({ message: 'File uploaded and grammar checked successfully.' });
        } catch (error) {
            res.status(500).json({ message: 'Error checking grammar.' });
            console.error(error); // Log the error for debugging
        }
    });