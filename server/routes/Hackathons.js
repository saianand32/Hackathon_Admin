const express = require("express");
const router = express.Router();
const multer = require('multer');
const Hackathon = require("../models/Hackathon");
// const fs = require("fs")
// const {promisify} = require("util")
// const pipeline = promisify(require("stream").pipeline)

// const storage = multer.diskStorage({
//   destination: function(req,file,cb){
//    cb(null,'./uploads')
//   },
//   filename: function(req,file,cb){
//     cb(null,file.fieldname + "_" + Date.now() + "_"+ file.originalname);
//   },

// });

// var upload = multer({
//   storage: storage,
// }).single("image");
const upload = multer();


//Route 1 : Get all notes : GET: "api/notes/fetchallnotes". No login required
router.get("/fetchallchallenges", async (req, res) => {
  try {
    const notes = await Hackathon.find();
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error occoured");
  }
});

//Route 2 : Add a note : GET: "api/notes/addnote". No login required
// router.post(
//   "/addchallenge",upload.single("image"),
//   async (req, res) => {
router.post(
  "/addchallenge",
  async (req, res) => {
  
    try {
      //use destructuring concept to extract the below from the req.body
      
      const {title, start,end,image, description,level  } = req.body;

 
      const note = new Hackathon({
       
        title,
        start,
        end,
        image,
        description,
        level
        
      });
      // const imageName = title + Math.floor(Math.random*1000)+image.detectedFileExtention;
      // await pipeline(image.stream, fs.createWriteStream(`${__dirname}/../images/${imageName}`))
      const saveNote = await note.save();
      // console.log(req.file);
      res.json(saveNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error occoured");
    }
  }
);


//Rout 3 : Update an existing note : usinf PUT: "api/notes/updatenote/:id" login required
router.put(
  "/updatechallenge/:id", async(req, res) => {
  const {title, start,end,image,description,level,id} = req.body;
  try {
      //Create a new note object
  const newNote = {};
  if(title){newNote.title = title};
  if(start){newNote.start = start};
  if(end){newNote.end = end};
  if(image){newNote.image = image};
  if(description){newNote.description = description};
  if(level){newNote.level = level};
  if(id){newNote.id = id};

  //Find the note and update it
  let note = await Hackathon.findById(req.params.id);
  if(!note){
    return res.status(404).send("Note not found");
  }
 

  note = await Hackathon.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true});
  // note = await Hackathon.findByIdAndDelete(req.params._id);
  // const note2 = new Hackathon({
  //   title,
  //   start,
  //   end,
  //   image,
  //   description,
  //   level
    
  // });
  // const saveNote = await note.save();
  res.json({note});
  } catch (error) {
    console.error(error.message);
      res.status(500).send("Internal server error occoured");
  }


  })



//Rout 4 : Delete an existing note using DELETE: ""api/notes/deletenote/:id"" login required
router.delete(
  "/deletechallenge/:id",async (req, res) => {
  const {title, start,end,image,description,level,id} = req.body;
  try {
      //Find the note to be deleted and delete  it
  let note = await Hackathon.findById(req.params.id);
  if(!note){
    return res.status(404).send("Note not found");
  }

 

  note = await Hackathon.findByIdAndDelete(req.params.id);
  res.json({"Success":"Note is deleted successfully"});
  } catch (error) {
    console.error(error.message);
      res.status(500).send("Internal server error occoured");
  }

  })

  // router.put(
  //   "/updatenote/:id",fetchuser,async (req, res) => {
  //   const {title,description,tag} = req.body;
  //   try {
  //       //Create a new note object
  //   const newNote = {};
  //   if(title){newNote.title = title};
  //   if(description){newNote.description = description};
  //   if(tag){newNote.tag = tag};
  
  //   //Find the note and update it
  //   let note = await Note.findById(req.params.id);
  //   if(!note){
  //     return res.status(404).send("Note not found");
  //   }
  //   if(note.user.toString() != req.user.id ){
  //     return res.status(401).send("Not Allowed");
  //   }
  
  //   note = await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true});
  //   res.json({note});
  //   } catch (error) {
  //     console.error(error.message);
  //       res.status(500).send("Internal server error occoured");
  //   }
  
  
  //   })

module.exports = router;
