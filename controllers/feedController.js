import Feed from '../models/feed.js';

// GET ALL FEEDS

export const getFeeds = async (req, res) => {

    try {

        const feeds = await Feed.find()
            .sort({ createdAt: -1 });

        res.status(200).json(feeds);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Failed to fetch feeds"
        });

    }

};



// CREATE FEED

export const createFeed = async (req, res) => {

    try {

        const { title, message } = req.body;

        if (!title || !message) {

            return res.status(400).json({
                message: "All fields are required"
            });

        }

        const newFeed = await Feed.create({
            title,
            message
        });




        // SOCKET EVENT

        const io = req.app.get("io");

        io.emit("new-feed", newFeed);




        res.status(201).json({
            success: true,
            data: newFeed
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Failed to create feed"
        });

    }

};