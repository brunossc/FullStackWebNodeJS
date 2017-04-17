'use strict';
var port = process.env.PORT || 1337;

var express = require('express'),
    morgan = require('morgan'),
    multer = require('multer'), // v1.0.5
    upload = multer({ dest: 'uploads/' }), // for parsing multipart/form-data
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser');

var FolderController = require('./Controllers/FolderController'),
    pages = require('./handlers/pages'),
    helpers = require('./handlers/helpers');

var app = express();
var logger = morgan('dev');

app.use(logger);
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// map static contents like content folder files(.js) and templates
app.use(express.static(__dirname + "/../Static"));

app.get("/v1/folders/GetAll", FolderController.GetAll_Folders);
//app.get("/v1/folders/:folder_name.json", files.get_folder);

app.get("/:controller_name/:page_name", pages.server_page);
app.post("/folder/:action", FolderController.DoAction);


//app.post('/uploads', type, function (req, res) {
//    //res.json(req.body);
//    res.end(JSON.stringify(req.file) + "\n");
//});

app.get('*', helpers.nothing_found);
app.listen(port);




