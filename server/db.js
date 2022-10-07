const mongoose = require("mongoose");
const mongoURI = "mongodb+srv://dphi:dphi@cluster0.fr8wi8d.mongodb.net/?retryWrites=true&w=majority";

const connectToMongo = () => {
  mongoose.connect(mongoURI, () => {
    console.log("Connected to Mongo Successfully");
  });
};

module.exports = connectToMongo;
