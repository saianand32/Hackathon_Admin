const connectToMongo = require("./db");
const express = require("express");
var cors = require('cors');
const app = express();
const port = 5000;

app.use(cors()); // middleware to use req.body since its json format
app.use(express.json()); // middleware to use req.body since its json format

connectToMongo(); // connect to mongodb database

// Available Routes
app.use('/api/Hackathons',require('./routes/Hackathons'));

app.listen(port, () => {
  console.log(`DPhi hackathons listening on port ${port}`);
});
