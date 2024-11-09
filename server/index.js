import express from "express";
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import cors from "cors"
import mongoose from "mongoose";
import authRoutes from "./route/AuthRoute.js";
import contactRoutes from "./route/ContactsRoute.js";
import setupSocket from "./socket.js";
import messagesRoutes from "./route/MessagesRoute.js";
import channelRoutes from "./route/ChannelRoute.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001
const dataBaseUrl = process.env.DATABASE_URL;

app.use(cors({
    origin:[process.env.ORIGIN],
    methods:["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,

}))

app.use("/uploads/profiles", express.static("uploads/profiles"))
app.use("/uploads/files", express.static("uploads/files"))

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/messages", messagesRoutes);
app.use("/api/channel", channelRoutes)


const server = app.listen(port,'0.0.0.0', ()=>{
    console.log(`Server is running at http://localhost:${port}`);
});

setupSocket(server);

mongoose.connect(dataBaseUrl)
        .then(() => console.log('DB Connection successfull'))
        .catch((err) => console.log(err.message));