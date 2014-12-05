var express = require('express');
var app = express();
var viewData = {
    "projectsPage": [
        { 
        "profilePic": "img/profile1.jpg", 
        "title": "Sample Project 1", 
        "date": "1/1/2014", 
        "skill": "Woodwork", 
        "location": "Charlottesville, VA", 
        "difficulty": "3.0" 
         },
        { 
        "profilePic": "img/profile2.jpg", 
        "title": "Sample Project 2", 
        "date": "10/27/2014", 
        "skill": "Computer Science", 
        "location": "Seattle, WA", 
        "difficulty": "7.5" 
         },
        { 
        "profilePic": "img/profile3.jpg", 
        "title": "Sample Project 3", 
        "date": "12/1/2014", 
        "skill": "Architecture", 
        "location": "Pebble Beach, CA", 
        "difficulty": "5.0" 
         }
    ]
};

/****** Routing ******/
app.all('*', function(req, res, next) {
    console.log('\t| Request Url:', req.originalUrl);
    console.log('\t| Request Type:', req.method);
    next();
});

app.get('/', function(req, res) {
    res.render('index.html' );
});
app.get('/projects', function(req, res) {
    res.render( 'projects.html', viewData );
});
app.get('/users/:id', function(req, res, next) {
    console.log('\t| ID:', req.params.id);
    next();
}, function(req, res) {
    res.render('user.html');
});
app.get('/users/:id/projects', function(req, res, next) {
    console.log('\t| ID:', req.params.id);
    next();
}, function(req, res) {
    res.render('usersProjects.html');
});
app.get('/users/:id/config', function(req, res, next) {
    console.log('\t| ID:', req.params.id);
    next();
}, function(req, res) {
    res.render('config.html');
});
app.get('/users/:id/comments', function(req, res, next) {
    console.log('\t| ID:', req.params.id);
    next();
}, function(req, res) {
    res.render('comments.html');
});

/****** Settings  ******/
app.set('views', './views');
app.engine('html', require('ejs').renderFile);

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
