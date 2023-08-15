const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Notes");
const { body, validationResult } = require("express-validator");

// ROUTE 1: Get all the notes using: GET "/api/auth/getuser", it requires login
router.get("/fetchallnotes", fetchuser, async (req, res) => {

    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);

        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error");
    }
});


// -------------------------------------------------------------------------------------------------------------------------------------

// ROUTE 2: Add a new note using: POST "/api/auth/addnote", it requires login
router.post(
    "/addnote",
    fetchuser,
    [
        body("title", "please enter a valid title").isLength({ min: 3 }),
        body("description", "enter a valid description (atleast 5 characters bro)").isLength({ min: 5 }),
    ], async (req, res) => {


        try {
            const { title, description, tag } = req.body
            // if there are errors, return Bad request and the errorss
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const note = new Note({
                title,
                description,
                tag,
                user: req.user.id
            })

            const savedNote = await note.save()
            res.json(savedNote);
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Some error");
        }
    }
);

// -----------------------------------------------------------------------------------------------------------------------

// ROUTE 3: Update note using: PUT "/api/auth/updatenote/:id", it requires login
router.put("/updatenote/:id", fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;

    try {
        // Create a newNote Object
        const newNote = {}
        if (title) { newNote.title = title }
        if (description) { newNote.description = description }
        if (tag) { newNote.tag = tag }

        // Find the note to be updated and update that note
        let note = await Note.findById(req.params.id)
        if (!note) {
            return res.status(404).send("Not found")
        }

        if (note.user.toString() != req.user.id) {
            return res.status(401).send("Not allowed")
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error");
    }

})


// -----------------------------------------------------------------------------------------------------------------------

// ROUTE 4: Delete note using: DELETE "/api/auth/deletenote", it requires login
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
    try {
        // Find the note to be deleted and delete that note
        let note = await Note.findById(req.params.id)
        if (!note) {
            return res.status(404).send("Not found")
        }

        // allow deletion only if user owns this note
        if (note.user.toString() != req.user.id) {
            return res.status(401).send("Not allowed")
        }

        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted" })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error");
    }

})

module.exports = router;
