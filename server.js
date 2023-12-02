const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

const folderPath = path.join(__dirname, 'newForlder');

// Create folder if not exists
if (!fs.existsSync(folderPath)) {
  fs.mkdirSync(folderPath);
}

// API endpoint to create a text file with the current timestamp
app.post('/createFile', (req, res) => {
  const currentTimestamp = new Date().toISOString().replace(/:/g, '-');
  const fileName = `${currentTimestamp}.txt`;

  // Ensure filePath is defined correctly
  const filePath = path.join(folderPath, fileName);

  fs.writeFile(filePath, currentTimestamp, (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.status(201).json({ message: 'File created successfully', fileName });
    }
  });
});

// API endpoint to retrieve all text files in the folder
app.get('/getAllFiles', (req, res) => {
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json({ files });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
