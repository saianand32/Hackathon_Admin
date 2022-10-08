const express = require("express");
const router = express.Router();
const Hackathon = require("../models/Hackathon");



//Route 1 : Get all challenges
router.get("/fetchallchallenges", async (req, res) => {
  try {
    const notes = await Hackathon.find();
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error occoured");
  }
});

//Route 2 : Add a challenge
router.post(
  "/addchallenge",
  async (req, res) => {

    try {

      const { title, start, end, image, description, level } = req.body;


      const note = new Hackathon({

        title,
        start,
        end,
        image,
        description,
        level

      });
      const saveNote = await note.save();
      res.json(saveNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error occoured");
    }
  }
);


//Rout 3 : Update an existing challenge
router.put(
  "/updatechallenge/:id", async (req, res) => {
    const { title, start, end, image, description, level, id } = req.body;
    try {
      const newNote = {};
      if (title) { newNote.title = title };
      if (start) { newNote.start = start };
      if (end) { newNote.end = end };
      if (image) { newNote.image = image };
      if (description) { newNote.description = description };
      if (level) { newNote.level = level };
      if (id) { newNote.id = id };

      let note = await Hackathon.findById(req.params.id);
      if (!note) {
        return res.status(404).send("Note not found");
      }


      note = await Hackathon.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });

      res.json({ note });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error occoured");
    }


  })



//Rout 4 : Delete an existing challenge
router.delete(
  "/deletechallenge/:id", async (req, res) => {
    const { title, start, end, image, description, level, id } = req.body;
    try {
      let note = await Hackathon.findById(req.params.id);
      if (!note) {
        return res.status(404).send("Note not found");
      }



      note = await Hackathon.findByIdAndDelete(req.params.id);
      res.json({ "Success": "Note is deleted successfully" });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error occoured");
    }

  })



module.exports = router;
