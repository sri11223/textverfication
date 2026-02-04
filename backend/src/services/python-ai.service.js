const { execFile } = require('child_process');
const path = require('path');
const { createError } = require('../utils/errors');

const pythonScriptPath = path.join(__dirname, '..', 'controllers', 'app.py');

const execute = (inputTitle) =>
  new Promise((resolve, reject) => {
    const pythonProcess = execFile('python', [pythonScriptPath], (error, stdout, stderr) => {
      if (error) {
        return reject(createError(500, `Python error: ${error.message}`));
      }
      if (stderr) {
        return reject(createError(500, `Python stderr: ${stderr}`));
      }

      try {
        const output = JSON.parse(stdout.trim());
        return resolve(output);
      } catch (parseError) {
        return reject(createError(500, 'Error parsing Python output.'));
      }
    });

    pythonProcess.stdin.write(`${inputTitle}\n`);
    pythonProcess.stdin.end();
  });

module.exports = {
  execute,
};
