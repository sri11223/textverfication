const { fetchTitles } = require('../utility/googlescholor');
const{fetchFromCrossRef}=require('../utility/crossapi');

async function checkTitle(req, res) {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: 'Query parameter is required' });
  }

  try {
    const titles = await fetchTitles(query);

    // Check if the exact title exists (case-insensitive)
    const titleExists = titles.some(title => title === query.toLowerCase());

    if (titleExists) {
      return res.status(200).json({ exists: true, title: query });
    } else {
      return res.status(200).json({ exists: false });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch titles' });
  }
}

// Import your CrossRef fetching utility

async function checkTitles(req, res) {
    const { query } = req.query; // Extract the title query from the request
    if (!query) {
        return res.status(400).json({ success: false, message: "Query is required" });
    }

    try {
        // Call your fetchFromCrossRef utility to get the results
        const results = await fetchFromCrossRef(query);

        // If results are empty, handle accordingly

        if (results.length === 0) {
            return res.status(404).json({ success: false, message: "No titles found" });
        }
        console.log(results.length);

        // Return the formatted results
        return res.json({ success: true, data: results });
    } catch (error) {
        console.error("Error in checkTitles:", error);
        res.status(500).json({ success: false, message: error.message });
    }
}

const { execFile } = require('child_process');
const path = require('path');

// Path to your Python script (same folder)
const pythonScriptPath = path.join(__dirname, 'app.py');

// Function to execute the Python script and send input
function executePythonScript(inputTitle) {
  return new Promise((resolve, reject) => {
    const pythonProcess = execFile('python', [pythonScriptPath], (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        reject(`exec error: ${error}`);
        return;
      }

      if (stderr) {
        console.error(`stderr: ${stderr}`);
        reject(`stderr: ${stderr}`);
        return;
      }

      console.log(`Python stdout: ${stdout.trim()}`);  // Log raw Python output

      try {
        const output = JSON.parse(stdout.trim());  // Try parsing the JSON
        resolve(output);
      } catch (e) {
        console.error('Error parsing Python output:', e);
        reject('Error parsing Python output: ' + e);
      }
    });

    pythonProcess.stdin.write(inputTitle + '\n');
    pythonProcess.stdin.end();
  });
}

// Express.js route handler for checking titles
async function check(req, res) {
  try {
    const { title } = req.query;
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    const pythonResult = await executePythonScript(title);
    console.log("Received Python result:", pythonResult);
    console.log
    return res.json({ feedback: pythonResult });
  } catch (error) {
    console.error('Error executing Python script:', error);
    return res.status(500).json({ error: 'An error occurred while processing the title' });
  }
}

  // Export the 'check' function




module.exports = { checkTitle,checkTitles,check };
