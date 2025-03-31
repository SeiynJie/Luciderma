import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoute.js";
import doctorRouter from "./routes/doctorRoute.js";

// App config
const app = express();
const port = process.env.PORT || 4000; // Port from .env OR port 4000
connectDB();
connectCloudinary();

// middlewares
app.use(express.json());
app.use(cors());

// API Endpoints
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter)
// localhost:4000/api/admin/add-doctor (from adminRoute.js)

app.get("/", (request, response) => {
  response.send("API working Greatsz");
});

// Start express app
app.listen(port, () => console.log("Server Started", port));
