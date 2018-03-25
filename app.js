const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();

let fileName;

app.set("view engine","ejs");

app.get("/", (req, res) => {
  res.send("Your form is on /file/new, you can get a file at /file/<your-file-id>");
});

app.get('/file/new', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/file/:id", (req, res) => {
  res.sendFile(__dirname + '/uploads/' + req.params.id);
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads'); //file will be stored in directory called uploads on server
  },
  filename: function (req, file, cb) {
    fileName = Date.now() + path.extname(file.originalname);
    cb(null, fileName);
  }
});
 
const upload = multer({ storage: storage });

// It's very crucial that the file name matches the name attribute in your html
app.post('/file/', upload.single('file-to-upload'), (req, res) => {
    res.send(fileName);
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server has started.");
});