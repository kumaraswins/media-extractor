angular
    .module('MusicApp', ['ngRoute', 'ui.bootstrap'])
    .config(function($routeProvider, $httpProvider) {
if (!$httpProvider.defaults.headers.get) {
        $httpProvider.defaults.headers.get = {};    
    }
        $routeProvider
            .when('/', {
                templateUrl: "../partials/music.html"
            })
// extra
    $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
    $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';

    });


angular
    .module('MusicApp')
    .controller('MainController', [
        '$scope', '$rootScope', '$location', '$http', '$window', '$interval', '$uibModal',
        MainController
    ]);

function MainController($scope, $rootScope, $location, $http, $window, $interval, $uibModal) {
    
}

angular.module('MusicApp')
    .controller('MusicController', ['$scope', 'HTTP', '$location', MusicController]);

function MusicController($scope, HTTP, $location) {
    $scope.video = {};
    $scope.music = {"name":"","url":""};
    //$scope.downloaded = false;

    $scope.downloadVideo = function() {
        if ($scope.video.name ==""  || $scope.video.name == null || $scope.video.name == undefined)
            $scope.video.name = "myVideo"
        $scope.showError = false;
        HTTP.post("/download/video/", $scope.video).then(function(oJson) {
            var oLogin = oJson.data.data;
            if (oLogin.response == "success") {
                
            } 
        });
    }
    var donwloadFile = function(fileName){
        fileName =  fileName.replace("\\","");
        fileName = fileName +".mp3";
        $scope.music = {};
        window.open("/download/file?id="+fileName, '_blank');
    }

    $scope.downloadMp3 = function() {
        $scope.downloaded = true;
        if ($scope.music.name ==""  || $scope.music.name == null || $scope.music.name == undefined)
            $scope.music.name = "myaudio"
        $scope.showError = false;
        HTTP.post("/download/mp3/", $scope.music).then(function(oJson) {
            var oStatus = JSON.parse(oJson.data.status);
            $scope.downloaded = false;
            if (oStatus.response.status == "success") {
                donwloadFile(oStatus.response.file)
            } 
        });
    }
}