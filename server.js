const express = require("express");
const path = require('path');
const hostname = '127.0.0.1';
const port = 3000;
const uploadFiles = require('./backend/upload-file');
const parseFiles = require('./backend/parse-file');
const multer = require("multer");
const upload = multer({dest: "uploads/"});
let files = [];

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'frontend')));
app.use(express.urlencoded({extended: true}));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get("/", function (req, res) {
    res.render('index');
});
app.post("/uploadFiles", upload.array("files"),
    function (req, res) {
        files = uploadFiles.uploaded(req);

        res.json({message: "Successfully uploaded file", fileName: req.files[0].originalname});
        res.end();
    });
app.post("/parseFiles", function (req, res) {
    parseFiles.parse(files[0].path)
        .then(function (data) {

            res.json({data: data});
            res.end();
        });
});

app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});