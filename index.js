import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

import http from 'http';

import { Server } from 'socket.io';

import feedRoutes from './routes/feedRoute.js';

import courseRoutes from "./routes/courseRoute.js";

import noteRoutes from "./routes/notesRoute.js";


dotenv.config();

const app = express();

// MIDDLEWARES

app.use(bodyParser.json());

app.use(cors());

// ROUTES

app.use('/feed', feedRoutes);

app.use("/courses", courseRoutes);

app.use("/notes", noteRoutes);

// CREATE HTTP SERVER

const server = http.createServer(app);

// SOCKET.IO SETUP

const io = new Server(server, {

    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }

});

// STORE IO INSTANCE

app.set("io", io);

// SOCKET CONNECTION

io.on("connection", (socket) => {

    console.log("User connected:", socket.id);

    socket.on("disconnect", () => {

        console.log("User disconnected");

    });

});

const PORT = process.env.PORT || 2000;

const URL = process.env.MONGOURL;

// DATABASE CONNECTION

mongoose.connect(URL)

.then(() => {

    console.log("DB connected successfully");

    server.listen(PORT, () => {

        console.log("Server is running on Port: " + PORT);

    });

})

.catch(error => console.log(error));