import Course from "../models/Course.js";



// GET COURSES

export const getCourses = async (req, res) => {

    try {

        const courses = await Course.find()
            .sort({ createdAt: -1 });

        res.status(200).json(courses);

    } catch (error) {

        res.status(500).json({
            message: "Failed to fetch courses"
        });

    }

};




// CREATE COURSE

export const createCourse = async (req, res) => {

    try {

        const {
            courseName,
            trainerName,
            duration,
            description
        } = req.body;

        const newCourse = await Course.create({
            courseName,
            trainerName,
            duration,
            description
        });

        res.status(201).json(newCourse);

    } catch (error) {

        res.status(500).json({
            message: "Failed to create course"
        });

    }

};