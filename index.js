var express = require('express');
var app = express();
var htmlDir = './public/';

/****** Routing ******/
app.all('*', function(req, res, next) {
    console.log('\t| Request Url:', req.originalUrl);
    console.log('\t| Request Type:', req.method);
    next();
});

app.get('/', function(req, res) {
    res.sendFile('index.html', {root: htmlDir});
});
app.get('/projects', function(req, res) {
    res.sendFile('projects.html', {root: htmlDir});
});
app.get('/users/:id', function(req, res, next) {
    console.log('\t| ID:', req.params.id);
    next();
}, function(req, res) {
    res.sendFile('user.html', {root: htmlDir});
});
app.get('/users/:id/config', function(req, res, next) {
    console.log('\t| ID:', req.params.id);
    next();
}, function(req, res) {
    res.sendFile('config.html', {root: htmlDir});
});
app.get('/users/:id/comments', function(req, res, next) {
    console.log('\t| ID:', req.params.id);
    next();
}, function(req, res) {
    res.sendFile('comments.html', {root: htmlDir});
});

/****** Settings  ******/

/****** Middleware ******/
app.use(express.static('public'));

app.use(function(err, req, res, next) {
    console.error( err.stack );
    res.status(500).send("Something broke!");
});

/****** Server ******/
var server = app.listen(3000, function() {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Tinker server listening at http://%s:%s', host, port);

});
