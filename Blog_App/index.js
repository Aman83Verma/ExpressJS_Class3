const express = require("express");
const app = express();

require("dotenv").config();

const PORT = process.env.PORT || 5000;
// const PORT = 5000;

// MiddelWare to parse JSON request body
app.use(express.json());

const blog = require("./routes/blog");

// Mount
app.use("/api/v1", blog);

const connectWithDB = require("./config/database");
connectWithDB();

app.listen(PORT, () => {
    console.log(`App is started at Port No. ${PORT}`);
});

app.get("/", (req, res) => {
    res.send(`<h1>This is Home Page Friend.</h1>`);
})