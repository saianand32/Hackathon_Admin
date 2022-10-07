const mongoose = require("mongoose");
const { Schema } = mongoose;

const HackathonSchema = new Schema({

  title: {
    type: String,

  },
  start: {
    type: Number,
  },
  end: {
    type: Number,
  },
  image:{
    type: String
  },
  description: {
    type: String,
    
  },
  level: {
    type: String,
    
  },
 
  date: {
    type: Date,
    default: Date.now,
  },
});
const Notes = mongoose.model('Hackathons',HackathonSchema);
module.exports = Notes;
