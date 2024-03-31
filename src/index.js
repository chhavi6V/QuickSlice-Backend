import express from "express"
import cors from "cors"
import "dotenv/config"
import mongoose from "mongoose"
import myUserRoute from "./routes/MyUserRoutes.js"

mongoose.connect(process.env.MONGODB_CONNECTION_STRING).then(()=>console.log("connected to db"))

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/my/user", myUserRoute)

app.get("/health", async (req, res) => {
    res.send({message: "Health OK!"})
});

app.listen(7001, () => {
    console.log("server started at localhost: 7001 ");
})