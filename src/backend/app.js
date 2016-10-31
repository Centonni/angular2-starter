var express = require("express");
var bodyParser = require("body-parser");
var multer = require("multer");
var fs = require('fs');
var path = require('path');
var DIR = './uploads';
var app = express();

app.use(express.static('uploads'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post("/uploads", multer({dest: "./uploads/"}).array("uploads[]", 12), function(req, res) {
    res.send(req.files);
});

function fileList(dir) {
    return fs.readdirSync(dir).reduce(function(list, file) {
        var name = path.join(dir, file);
        var isDir = fs.statSync(name).isDirectory();
        console.log(name);
        return list.concat(isDir ? fileList(name) : [name]);
    }, []);
}

fileList(DIR);

var server = app.listen(4000, function() {
    console.log("Listening on port %s...", server.address().port);
});
