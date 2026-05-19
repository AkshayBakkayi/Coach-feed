import Note from "../models/notes.js";



// GET NOTES

export const getNotes = async (req, res) => {

    try {

        const notes = await Note.find()
            .sort({ createdAt: -1 });

        res.status(200).json(notes);

    } catch (error) {

        res.status(500).json({
            message: "Failed to fetch notes"
        });

    }

};




// CREATE NOTES

export const createNote = async (req, res) => {

    try {

        const { title, link } = req.body;

        const newNote = await Note.create({
            title,
            link
        });

        res.status(201).json(newNote);

    } catch (error) {

        res.status(500).json({
            message: "Failed to create note"
        });

    }

};