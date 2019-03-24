var app = require('express')();
var http = require('http').Server(app);
const port = 3000;
var basket = {};
var morgan = require('morgan')
var appRoute = require('./routes/main.js');
var downloadRoute = require('./routes/download.js');
// Instantiating the app 
app.use(morgan('tiny'))
app.use('/download', downloadRoute);
app.use('/', appRoute);


module.exports = app;

http.listen(port, function() {
    console.log('listening on *:' + port);
});
