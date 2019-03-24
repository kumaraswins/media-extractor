var express = require('express');
var router = express.Router();
var downloader = require('../utilities/downloader');
var bodyParser = require('body-parser');
var parentDir =  process.cwd()
var downloadFolder = parentDir + "/downloads/";
var videoFolder = downloadFolder +"videos/";
var mp3Folder = downloadFolder+"music/";
var fs = require('fs');

if (!fs.existsSync(downloadFolder)){
    fs.mkdirSync(downloadFolder);
}

if (!fs.existsSync(videoFolder)){
    fs.mkdirSync(videoFolder);
}
if (!fs.existsSync(mp3Folder)){
    fs.mkdirSync(mp3Folder);
}

router.use(bodyParser.json());

// Downloads the video from the youtube

router.post("/video", function(req, res) {
    downloader.getVideo(req.body.url,req.body.name, function(result){
        console.log("Downloaded >" , result);
        res.send({
            status: JSON.stringify({
                response: result,
            })
        });
    });
});

router.post("/mp3", function(req, res) {
    downloader.getVideo(req.body.url,req.body.name, function(result){
        console.log("Downloaded video >" , result);
        downloader.getMp3(result["file"],req.body.name, function(result){
            console.log(result)
            res.send({
                status: JSON.stringify({
                    response: result
                })
            });
        })
    });
});

router.get('/file', function(req,res){
	var fileId = req.query.id;
	var file = mp3Folder + fileId;
	fs.exists(file,function(exists){
		if(exists)
		{
			res.setHeader('Content-disposition', 'attachment; filename=' + fileId);
			res.setHeader('Content-Type', 'application/audio/mpeg3')
			var rstream = fs.createReadStream(file);
			rstream.pipe(res);
		}
		else
		{
			res.send("Its a 404");
			res.end();
		}
	});
});

module.exports = router;