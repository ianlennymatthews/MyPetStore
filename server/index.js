const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files found in dist folder
app.use('/', express.static(path.join(__dirname, '/../client/dist')));

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
