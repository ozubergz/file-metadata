'use strict';
const express = require('express');
const cors = require('cors');
const multer = require('multer'); // require and use "multer", add files to request object
const mongoose = require('mongoose');

const upload = multer();
const app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.post('/api/fileanalyse', upload.single('upfile'), function(req, res, next) {
  
  console.log(req.file);
  
  if(req.file) {
    res.json({
      name: req.file.originalname,
      type: req.file.mimetype,
      size: req.file.size
    });
  } else {
    next({status: 400, message: 'require file to upload'});
  }
  
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
