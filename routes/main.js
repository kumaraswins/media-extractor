var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
const base_path = "/tmp/";
const csv_path_abusive = base_path + "filterwords.csv";
const csv_abusive_name = 'filterwords.csv';
var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(express.static(path.join(__dirname, '../', 'static')));


router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../', 'index.html'));
});


module.exports = router;
