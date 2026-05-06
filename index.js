require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err)); 


const postRoutes = require("./routes/postRoutes");
app.use("/posts", postRoutes);

const authRoutes = require("./routes/authRoutes");
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("Blog API is running");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {


    console.log(`Server running on http://localhost:${PORT}`);
});

