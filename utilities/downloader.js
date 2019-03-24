var fs = require('fs');
var youtubedl = require('youtube-dl');
var ffmpeg = require('ffmpeg');
var currentFileName = ""
var downloadFolder = process.cwd() + "/downloads/";
var videoFolder = downloadFolder +"videos/";
var mp3Folder = downloadFolder+"music/";

module.exports = {
    getVideo :  function(url, name,callback){
        try{
            name = name.replace(" ","");
            currentFileName = "";
            var video = youtubedl(url,
                // Optional arguments passed to youtube-dl.
                ['--format=18'],
                // Additional options can be given for calling `child_process.execFile()`.
                { cwd: __dirname });
                
                // Will be called when the download starts.
                video.on('info', function(info) {
                    console.log('Download started');
                    console.log('filename: ' + info._filename);
                    console.log('size: ' + info.size);
                    //currentFileName = info._filename;
                });
                video.on('end', function() {
                    console.log('finished downloading!');
                    var oJson = {"status":"success","file":currentFileName}
                    callback(oJson);
                  });
                  currentFileName = videoFolder + name +".mp4";
                video.pipe(fs.createWriteStream(currentFileName));
        } catch(error){
            console.log(error);
            callback("error")
        }
        
    },
    getMp3 : function(url, name, callback){
        try {
            var process = new ffmpeg(url);
            process.then(function (video) {
                // Callback mode
                name  = name.replace(/(\s+)/g, '\\$1');
                video.fnExtractSoundToMP3(mp3Folder+  name +'.mp3', function (error, file) {
                    if (!error){
                        console.log('Audio file: ' + mp3Folder + file);
                        var oJson = {"status":"success","file": name}
                        callback(oJson);
                    }
                        
                });
            }, function (err) {
                console.log('Error: ' + err);
            });
        } catch (e) {
            console.log(e.code);
            console.log(e.msg);
        }
    }
}