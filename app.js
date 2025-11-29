const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();

// Create upload folder if it doesn't exist
if (!fs.existsSync("uploads")) {
    fs.mkdirSync("uploads");
}

app.use(express.static("uploads"));

const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

app.get("/", (req, res) => {
    res.send(`
        <h2>Upload Movies</h2>
        <form method="POST" enctype="multipart/form-data" action="/upload">
            <input type="file" name="movie" />
            <button type="submit">Upload</button>
        </form>
    `);
});

app.post("/upload", upload.single("movie"), (req, res) => {
    res.send(`Movie uploaded successfully! <a href="/${req.file.filename}">Download Movie</a>`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on port " + PORT));
