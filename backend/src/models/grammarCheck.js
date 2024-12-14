const mongoose = require('mongoose');

const grammarCheckSchema = new mongoose.Schema({
    filePath: { type: String, required: true },
    extractedText: { type: String, required: true },
    grammarCheckResults: { type: Object } // Store response.data from LanguageTool API
});

module.exports = mongoose.model('GrammarCheck', grammarCheckSchema);